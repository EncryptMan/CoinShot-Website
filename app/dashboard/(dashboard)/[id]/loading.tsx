import { LoadingSpinner } from "../../../components/LoadingSpinner"

export default function Page() {
    return (
        <div className="flex flex-grow items-center justify-center p-5">
            <LoadingSpinner size={50} />
        </div>
    );
}