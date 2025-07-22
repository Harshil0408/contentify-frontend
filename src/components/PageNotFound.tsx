import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="flex flex-col items-center gap-6 bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
                <div className="flex flex-col items-center">
                    <span className="text-7xl font-extrabold text-blue-600 mb-2">404</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Page Not Found</h1>
                <p className="text-base text-gray-500 text-center max-w-md">Sorry, the page you are looking for doesn't exist or has been moved.<br />Let's get you back on track!</p>
                <Button onClick={() => navigate("/")} className="mt-2 px-8 py-2 text-base rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors">
                    Go Home
                </Button>
            </div>
        </div>
    )
}

export default PageNotFound
