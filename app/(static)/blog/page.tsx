// Blogs home page

import BlogCard from "@/app/components/BlogCard"
import { anton } from "@/app/lib/fonts"
import { cn } from "@/lib/utils"


export default function Page() {
    return (
        <main className="w-full max-w-5xl pt-10 max-sm:pt-5 px-5 mt-16 mx-auto flex-grow">
            <h1 className={cn("text-5xl font-semibold  text-neutral-200 w-full max-md:text-center", anton.className)}>Blogs 📝</h1>
            <div className="flex flex-col gap-5 w-full mt-16">
                <BlogCard 
                    category={"TOP PICKS"} 
                    title={"Top Cryptocurrency Discord Servers to Join in 2024 📈"} 
                    date={"16 Feb"} 
                    description={"Dive into the forefront of cryptocurrency communities in 2024! Discover the top Discord servers driving innovation and insight in the digital finance landscape."} 
                    image={"/blog/image.png"} 
                    href={"/blog/top-cryptocurrency-servers"} />
            </div>
        </main>
    )
}