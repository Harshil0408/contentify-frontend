import type { AppDispatch, RootState } from "@/store/store"
import { getUserWatchHistory } from "@/store/thunks/videoThunk"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function formatViews(views: number) {
  if (views < 1000) return `${views} views`;
  if (views < 1_000_000) return `${(views / 1000).toFixed(0)}K views`;
  return `${(views / 1_000_000).toFixed(1)}M views`;
}

function formatDuration(duration: string) {
  const sec = parseInt(duration, 10);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const History = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { watchHistory } = useSelector((state: RootState) => state.video)

  useEffect(() => {
    dispatch(getUserWatchHistory())
  }, [dispatch])

  const historyArray = Array.isArray(watchHistory) ? watchHistory : watchHistory.data ?? [];

  if (historyArray.length === 0) {
    return <div className="p-8 text-center text-gray-500">No watch history yet.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen w-full">
      <div className="flex-1 w-full max-w-4xl mx-auto">
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">Watch History</h2>
        <div className="flex flex-col gap-6">
          {historyArray.map(video => (
            <div
              onClick={() => navigate(`/video/${video._id}`)}
              key={video._id}
              className="flex gap-6 bg-white rounded-xl shadow-sm p-4 items-start cursor-pointer hover:bg-gray-100 transition group"
            >
              <div className="relative min-w-[180px] max-w-[180px]">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-[180px] h-[100px] object-cover rounded-lg bg-gray-200 group-hover:brightness-90 transition"
                />
                <span className="absolute right-2 bottom-2 bg-black/80 text-white text-xs rounded px-2 py-0.5">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg mb-1 hover:underline line-clamp-2">
                  {video.title}
                </div>
                <div className="text-gray-600 text-sm mb-1 flex flex-wrap gap-x-2 gap-y-1 items-center">
                  <span className="hover:underline">{video.owner.username}</span>
                  <span>• {formatViews(video.views)}</span>
                  <span>• {new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div
                onClick={e => e.stopPropagation()}
                className="self-start ml-auto text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-200 transition"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 hidden md:block"></div>
    </div>
  )
}

export default History
