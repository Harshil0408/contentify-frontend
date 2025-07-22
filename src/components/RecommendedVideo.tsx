import { formatDuration, formatViews, timeAgo } from "@/constants/function"
import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const RecommendedVideo = () => {
    const { recommendedVideos } = useSelector((state: RootState) => state.video)
    const navigate = useNavigate();

    if (!recommendedVideos || recommendedVideos.length === 0) {
        return <div className="text-gray-500">No related videos yet.</div>
    }

    return (
        <div className="flex flex-col gap-4">
            {recommendedVideos.map((video) => (
                <div
                    key={video._id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate(`/video/${video._id}`)}
                >
                    <div className="relative min-w-[168px] max-w-[168px]">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-[168px] h-[94px] object-cover rounded-lg bg-gray-200 group-hover:brightness-90 transition"
                        />
                        <span className="absolute right-2 bottom-2 bg-black/80 text-white text-xs rounded px-2 py-0.5">
                            {formatDuration(video.duration)}
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="font-medium text-sm leading-tight line-clamp-2 group-hover:underline">
                            {video.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                            <span className="block">{video.owner.username}</span>
                            <span>
                                {formatViews(video.views)} views • {timeAgo(video.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecommendedVideo
