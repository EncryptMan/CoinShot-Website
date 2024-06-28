import { LoadingSpinner } from "../components/LoadingSpinner"

export default function Page() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <LoadingSpinner size={50} />
        </div>
    );
}