import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { getUsersVideo } from "@/store/thunks/videoThunk";
import { useNavigate } from "react-router-dom";
import { formatDuration, formatViews, timeAgo } from "@/constants/function";
import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const YourVideos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userVideos, isLoading } = useSelector((state: RootState) => state.video);

  useEffect(() => {
    dispatch(getUsersVideo());
  }, [dispatch]);

  return (
    <div className="p-6 w-full text-gray-900 bg-white">
      <h1 className="text-2xl font-semibold mb-6">Your Videos</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading videos...</p>
      ) : userVideos?.docs.length === 0 ? (
        <p className="text-gray-500">You haven't uploaded any videos yet.</p>
      ) : (
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Video</TableHead>
                <TableHead className="hidden md:table-cell">Views</TableHead>
                <TableHead className="hidden md:table-cell">Likes</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Visibility</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userVideos?.docs.map((video) => (
                <TableRow
                  key={video._id}
                  className="hover:bg-gray-50 transition"
                >
                  {/* Thumbnail + Info */}
                  <TableCell
                    className="flex items-center gap-4 py-4 cursor-pointer"
                    onClick={() => navigate(`/video/${video._id}`)}
                  >
                    <div className="relative w-32 h-20 rounded overflow-hidden bg-gray-200">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white px-1 rounded">
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-sm md:text-base line-clamp-2">{video.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{video.description}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm hidden md:table-cell">
                    {formatViews(video.views)}
                  </TableCell>

                  <TableCell className="text-sm hidden md:table-cell">
                    {video.likesCount} likes
                  </TableCell>

                  <TableCell className="text-sm hidden md:table-cell">
                    {timeAgo(video.createdAt)}
                  </TableCell>

                  <TableCell className="text-sm hidden md:table-cell capitalize">
                    {video.isPublished ?? "public"}
                  </TableCell>

                  <TableCell className="text-right">
                    <button>
                      <EllipsisVertical className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default YourVideos;
