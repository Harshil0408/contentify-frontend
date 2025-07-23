import type { AppDispatch, RootState } from "@/store/store";
import { getLikedVideosOfUser } from "@/store/thunks/videoThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatViews, timeAgo } from "@/constants/function";
import { useNavigate } from "react-router-dom";

const LikedVideos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { likedVideos } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    dispatch(getLikedVideosOfUser());
  }, []);

  const firstVideo = likedVideos[0];

  return (
    <div className="p-4 md:p-6 lg:p-10 h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        <div className="w-full lg:w-1/3 h-[70vh] bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md sticky top-20 self-start">
          {firstVideo ? (
            <div className="flex flex-col items-center text-center">
              <img
                src={firstVideo.thumbnail}
                alt="First liked video"
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">Liked Videos</h2>
              <p className="text-sm text-muted-foreground">
                {likedVideos.length} video{likedVideos.length !== 1 && "s"}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No liked videos</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 h-[70vh] space-y-6">
          {likedVideos.map((video) => (
            <div
              key={video._id}
              className="flex gap-4 cursor-pointer"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <div className="relative min-w-[180px] h-[100px]">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>

              <div className="flex flex-col justify-between">
                <h3 className="text-base font-medium line-clamp-2">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.owner.username}</p>
                <p className="text-sm text-muted-foreground">
                  {formatViews(video.views)} • {timeAgo(video.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedVideos;
