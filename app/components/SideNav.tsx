import Link from "next/link"

function NavItem({ name, active}: { name: string, active: boolean }) {
    return (
    <Link 
        href={'/dashboard'} 
        className={`p-2 rounded-md  hover:bg-slate-400 w-full flex items-center justify-center
        ${active ? 'bg-slate-800': 'bg-slate-700'}
        `}
    >
        <p className="text-xl text-slate-500 hover:text-slate-700">{name}</p>
    </Link>
    )
}

export default function SideNav() {
    return (
        <div className="h-96 bg-slate-600 rounded-xl flex flex-col m-2 items-center overflow-hidden ">
            <NavItem name="Home" active={true} />
            <NavItem name="Home" active={false} />
            <NavItem name="Settings" active={false} />
        </div>
    )
}