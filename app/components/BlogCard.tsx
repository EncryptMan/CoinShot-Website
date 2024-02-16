import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ category, title, date, description, image, href }: { category: string, title: string, date: string, description: string, image: string, href: string }) {
    return (
        <Card className="w-full p-3 bg-slate-600">
            <Link href={href}>
                <div className="flex gap-5 max-md:flex-col">
                    <Image width={200} height={200} src={image} alt={`${title} blog icon`} className="rounded-lg overflow-hidden max-md:mx-auto" />
                    <div className="flex-grow">
                        <span className="capitalize text-blue-400">{category}</span>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold">{title}</h2>
                        </div>
                        <p className="text-neutral-200">{description}</p>
                            <p className="text-neutral-400">{`EncryptMan • ${date}`}</p>
                    </div>
                </div>
            </Link>
        </Card>
    );
}