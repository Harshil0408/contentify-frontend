
const VideoCardSkeleton = () => {
    return (
            <div className="w-full max-w-[360px] rounded-2xl bg-[#1f1f1f] animate-pulse">
                <div className="h-48 bg-gray-800 rounded-t-2xl" />
                <div className="p-3 flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-800" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 w-4/5 bg-gray-700 rounded" />
                        <div className="h-3 w-3/5 bg-gray-700 rounded" />
                    </div>
                </div>
            </div>
    )
}

export default VideoCardSkeleton
