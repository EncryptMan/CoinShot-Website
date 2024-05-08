import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Varela_Round } from "next/font/google"
import Link from "next/link"

const verala = Varela_Round({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
})

export default function NavItems({ className, rowClassName, buttonClassName }: { className?: string, rowClassName?: string, buttonClassName?: string}) {
    return (
        <div className={cn("flex items-center", verala.className, rowClassName)}>
            <Button asChild variant={'ghost'} className={cn("hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200", buttonClassName)}>
                <Link href="/commands">
                    Commands
                </Link>
            </Button>
            <Button asChild variant={'ghost'} className={cn("hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200", buttonClassName)}>
                <Link href="/#features">
                    Features
                </Link>
            </Button>
            <Button asChild variant={'ghost'} className={cn("hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200", buttonClassName)}>
                <Link href="/#support">
                    Support
                </Link>
            </Button>
            <Button asChild variant={'ghost'} className={cn("hover:bg-gray-700/50 text-neutral-400 hover:text-neutral-200", buttonClassName)}>
                <Link href="/blog">
                    Blogs
                </Link>
            </Button>
        </div>
    )
}