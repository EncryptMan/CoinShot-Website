import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Varela_Round } from "next/font/google"
import Link from "next/link"

const verala = Varela_Round({
    subsets: ['latin', 'latin-ext'],
    weight: ['400'],
})

export default function NavItems({ className }: { className?: string}) {
    return (
        <div className={cn("flex items-center gap-3", verala.className, className)}>
            <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                <Link href="/#features">
                    Features
                </Link>
            </Button>
            <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                <Link href="/#pricing">
                    Pricing
                </Link>
            </Button>
            <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                <Link href="/#support">
                    Support
                </Link>
            </Button>
            <Button asChild variant={'ghost'} className="hover:bg-gray-700/50 text-neutral-400 text-lg hover:text-neutral-200">
                <Link href="/blog">
                    Blogs
                </Link>
            </Button>
        </div>
    )
}