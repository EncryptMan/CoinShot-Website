"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import authOptions from "@/auth.options";
import axios, { AxiosError } from "axios";
import { DataSource, Guild, NewsCategory, NewsMessageStyle, PaymentGateway } from "@prisma/client";
import { redirect } from "next/navigation";
import { authorizeUser } from "../actions";

export async function fetchGuildUsers(guildId: string) {
    try {
        await authorizeUser(guildId)

        const guildUsers = await prisma.guildUser.findMany({
            where: {
                guildId,
            },
            include: {
                user: true,
            },
        });

        return guildUsers.map((guildUser) => guildUser.user);
    }
    catch (error) {
        console.error(error);
    }

    return [];
}

export interface RoleSummary {
    id: string;
    name: string;
    color: number;
  }

export async function fetchGuildRoles(guildId: string): Promise<RoleSummary[]> {
    try {
        await authorizeUser(guildId);

        const response = await fetch(`https://discord.com/api/guilds/${guildId}/roles`, {
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`, // Corrected header format
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching guild roles: ${response.statusText}`);
        }

        const guildRoles = (await response.json()).map((role: any) => ({
            id: role.id,
            name: role.name,
            color: role.color,
        }));

        return guildRoles;
    } catch (error) {
        console.error(error);
    }

    return [];
}

export async function fetchPaymentGateways(guildId: string) {
    try {
        await authorizeUser(guildId)

        const paymentGateways = await prisma.paymentGateway.findMany({
            where: {
                guildId,
            },
        });

        return paymentGateways;
    }
    catch (error) {
        console.error(error);
    }

    return [];
}

export async function createPaymentGateway(guildId: string, name: string, paymentReceiverId: string) {
    try {
        await authorizeUser(guildId)
    }
    catch (error) {
        console.error(error);
        return { error: "Unauthorized" };
    }

    if(!await doesUserHasConnection(paymentReceiverId)) {
        const session = await getServerSession();

        if (session?.user?.id === paymentReceiverId) {
            return { error: "No cryptocurrency exchange has been linked to your account." };
        } else {
            return { error: "No cryptocurrency exchange has been linked to the user's account." };
        }
    }

    if (name.length > 100 || name.length < 3) {
        return { error: "Name must be between 3 and 100 characters" };
    }

    let paymentGateway: PaymentGateway | null = null;

    try {
        paymentGateway = await prisma.paymentGateway.create({
            data: {
                guildId,
                name,
                paymentReceiverId,
            },
        });
    } catch (error) {
        console.error(error);
        paymentGateway = null;
    }

    if (paymentGateway) {
        revalidatePath(`/dashboard/${guildId}/payments`);
        revalidatePath(`/dashboard/${guildId}/payments?id=${paymentGateway.id}`);
        redirect(`/dashboard/${guildId}/payments?id=${paymentGateway.id}`);
    } else {
        return { error: "Failed to create payment gateway" };
    }
}

export async function deletePaymentGateway(guildId: string, id: string) {
    try {
        await authorizeUser(guildId);
        if (!channelBelongsToGuild(id, guildId)) {
            throw new Error("Channel does not belong to the guild");
        }
    } catch (error) {
        console.error(error);
        return { error: "Unauthorized" };
    }

    try {
        // Attempt to delete the payment gateway only if it belongs to the specified guildId
        const deleteResult = await prisma.paymentGateway.deleteMany({
            where: {
                id,
                guildId, // Ensure the gateway belongs to the correct guild
            },
        });

        if (deleteResult.count === 0) {
            console.error("No matching payment gateway found or it belongs to another guild.");
            return; // Exit if no gateway was deleted
        }
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete payment gateway" };
    }

    revalidatePath(`/dashboard/${guildId}/payments`);
    redirect(`/dashboard/${guildId}/payments`);
}

export type EditError = {
    nameError?: string,
    messageTextContentError?: string,
    embedTitleError?: string,
    embedDescriptionError?: string,
    embedColorError?: string,
    embedFooterError?: string,
    embedImageURLError?: string,
    embedThumbnailURLError?: string,
    embedAuthorError?: string,
    buttonLabelError?: string,
    buttonStyleError?: string,
    paymentReceiverIdError?: string,
    loggingChannelIdError?: string,
}

export async function updatePaymentGateway(guildId: string, data: PaymentGateway) {
    let errors: EditError = {};

    // Use discord's max length limit
    if (data.name.length > 100 || data.name.length < 3) {
        errors.nameError = "Name must be between 3 and 100 characters";
    }
    if (data.messageTextContent.length > 2000) {
        errors.messageTextContentError = "Message text content must be less than 2000 characters";
    }
    if (data.embedTitle.length > 256) {
        errors.embedTitleError = "Embed title must be less than 256 characters";
    }
    if (data.embedDescription.length > 2048) {
        errors.embedDescriptionError = "Embed description must be less than 2048 characters";
    }
    if (data.embedColor.length > 7) {
        errors.embedColorError = "Embed color must be less than 7 characters";
    }
    if (data.embedFooter.length > 2048) {
        errors.embedFooterError = "Embed footer must be less than 2048 characters";
    }
    if (data.embedImageURL.length > 2048) {
        errors.embedImageURLError = "Embed image URL must be less than 2048 characters";
    }
    if (data.embedThumbnailURL.length > 2048) {
        errors.embedThumbnailURLError = "Embed thumbnail URL must be less than 2048 characters";
    }
    if (data.embedAuthor.length > 256) {
        errors.embedAuthorError = "Embed author must be less than 256 characters";
    }
    if (data.buttonLabel.length > 80) {
        errors.buttonLabelError = "Button label must be less than 80 characters";
    }


    if (!["PRIMARY", "SECONDARY", "SUCCESS", "DANGER"].includes(data.buttonStyle)) {
        errors.buttonStyleError = "Button style must be one of LINK, PRIMARY, SECONDARY, SUCCESS, DANGER";
    }
    if (!isValidURL(data.embedImageURL)) {
        errors.embedImageURLError = "Embed image URL must be a valid URL";
    }
    if (!isValidURL(data.embedThumbnailURL)) {
        errors.embedThumbnailURLError = "Embed thumbnail URL must be a valid URL";
    }

    if(!await doesUserHasConnection(data.paymentReceiverId)) {
        errors.paymentReceiverIdError = "No cryptocurrency exchange has been linked to the user's account.";
    }
    if(data.loggingChannelId && !await channelBelongsToGuild(data.loggingChannelId, guildId)) {
        errors.loggingChannelIdError = "Channel does not belong to the guild";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    try {
        await authorizeUser(guildId)
    }
    catch (error) {
        console.error(error);
        return errors;
    }

    let success = true;
    try {
        const { id, ...updateData } = data;
        const paymentGateway = await prisma.paymentGateway.update({
            where: {
                id: data.id,
                guildId, // Ensure the gateway belongs to the correct guild
            },
            data: updateData,
        });
    } catch (error) {
        console.error(error);
        success = false;
    }


    if (success) {
        revalidatePath(`/dashboard/${guildId}/payments`);
        revalidatePath(`/dashboard/${guildId}/payments?id=${data.id}`);
        redirect(`/dashboard/${guildId}/payments?id=${data.id}`);
    }

    return errors;
}

function isValidURL(url: string): boolean {
    // Return true if the URL is empty string
    if (url.replace(/\s/g, '') === '') {
        return true;
    }

    const pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}

export async function sendGateway(gateway: PaymentGateway, channelId: string) {

    try {
        await authorizeUser(gateway.guildId)

        // Verify if the channelId belongs to the guildId
        const isChannelInGuild = await channelBelongsToGuild(channelId, gateway.guildId);
        if (!isChannelInGuild) {
            throw new Error("Channel does not belong to the guild");
        }
    } catch (error) {
        console.error(error);
        return { error: "Unauthorized" };
    }


    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

    if (!BOT_TOKEN) {
        console.error("No bot token found");
        return { error: "Server error" };
    }

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bot ${BOT_TOKEN}`,
    };

    const embed = {
        title: gateway.embedTitle,
        description: gateway.embedDescription,
        color: parseInt(gateway.embedColor.split("#")[1], 16),
        footer: {
            text: gateway.embedFooter,
        },
        image: {
            url: gateway.embedImageURL,
        },
        thumbnail: {
            url: gateway.embedThumbnailURL,
        },
        author: {
            name: gateway.embedAuthor,
        },
    };

    let style = 1;
    if (gateway.buttonStyle.toUpperCase() === 'LINK') {
        style = 5;
    } else if (gateway.buttonStyle.toUpperCase() === 'PRIMARY') {
        style = 1;
    } else if (gateway.buttonStyle.toUpperCase() === 'SECONDARY') {
        style = 2;
    } else if (gateway.buttonStyle.toUpperCase() === 'SUCCESS') {
        style = 3;
    } else if (gateway.buttonStyle.toUpperCase() === 'DANGER') {
        style = 4;
    } else {
        console.error("Invalid button style");
        return { error: "Invalid button style" };
    }

    const body = {
        content: gateway.messageTextContent,
        embeds: [embed],
        components: [{
            type: 1, // ActionRow
            components: [{
                type: 2, // Button
                label: gateway.buttonLabel,
                style: style,
                custom_id: `gatewayId:${gateway.id}`, // Updated to match the regex format
            }],
        }],
    };

    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.error(`Failed to send message: ${response.statusText}`);
            return { error: "Failed to send message" };
        }

        const responseData = await response.json();
        return {};
    } catch (error) {
        console.error(`Error sending message: ${error}`);
        return { error: "Error sending message" };
    }
}

// This is a mock function. You'll need to implement the logic based on your data source or platform API.
async function channelBelongsToGuild(channelId: string, guildId: string): Promise<boolean> {
    return true;
}

async function doesUserHasConnection(userId: string): Promise<boolean> {
    try {
        const connections = await prisma.connection.findMany({
            where: {
                userId,
            },
        });

        return connections.length > 0;
    } catch (error) {
        console.error(error);
        return false; 
    }
}