import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store/store"
import { getSubscribedChannelVideos } from "@/store/thunks/videoThunk"
import { useNavigate } from "react-router-dom"
import type { VideoDocument } from "@/types/types";
import { formatDuration, formatViews } from "@/constants/function"

const Subscriptions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { subscribedChannelVideos } = useSelector((state: RootState) => state.video)

  useEffect(() => {
    dispatch(getSubscribedChannelVideos())
  }, [])

  const handleClick = (videoId: string) => {
    navigate(`/video/${videoId}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Subscribed Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subscribedChannelVideos && subscribedChannelVideos.docs.length > 0 ? (
          subscribedChannelVideos.docs.map((video: VideoDocument) => (
            <div
              key={video._id}
              className="cursor-pointer"
              onClick={() => handleClick(video._id)}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-80 px-1.5 py-0.5 rounded">
                  {formatDuration(video.duration)}
                </span>
              </div>

              <div className="mt-2">
                <h2 className="text-sm font-medium line-clamp-2">{video.title}</h2>
                <p className="text-xs text-gray-500">{formatViews(video.views)} views</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No videos found</p>
        )}
      </div>
    </div>
  )
}

export default Subscriptions