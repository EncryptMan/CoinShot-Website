export default async function DashboardPage({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-grow items-center flex flex-col p-10 max-md:p-5 overflow-y-auto">
            {children}
        </div>
    );
}