import { redirect } from "next/navigation";


export default function Page({ params }: { params: { source: string } }) {
    redirect('/invite');
}