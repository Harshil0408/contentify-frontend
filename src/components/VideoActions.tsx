import { MdThumbUp, MdThumbDown, MdShare, MdDownload, MdPlaylistAdd } from "react-icons/md";

interface Props {
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
  isLiking: boolean;
}

const VideoActions = ({ isLiked, likeCount, onLike, isLiking }: Props) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="flex items-center bg-white/20 backdrop-blur-md border border-gray-200 shadow-md rounded-full overflow-hidden transition-all">
        <button
          disabled={isLiking}
          title="Like"
          onClick={onLike}
          className={`flex cursor-pointer items-center gap-1 px-4 py-2 font-medium transition-all duration-300 ${
            isLiked
              ? "bg-red-600 text-white hover:bg-red-700"
              : "hover:bg-gray-100 text-gray-800"
          }`}
        >
          <MdThumbUp size={20} className={`transition-transform duration-300 ${isLiked ? "scale-110" : ""}`} />
          <span className="ml-1 font-semibold">{likeCount}</span>
        </button>

        {/* Dislike Button */}
        <button
          title="Dislike"
          className="px-4 py-2 hover:bg-gray-100 text-gray-800 transition-colors"
        >
          <MdThumbDown size={20} />
        </button>
      </div>

      {/* Separator */}
      <div className="w-px h-8 bg-gray-300" />

      {/* Other Actions */}
      <button title="Share" className="icon-btn hover:text-blue-600 transition-all">
        <MdShare size={22} />
      </button>
      <button title="Download" className="icon-btn hover:text-green-600 transition-all">
        <MdDownload size={22} />
      </button>
      <button title="Save" className="icon-btn hover:text-yellow-600 transition-all">
        <MdPlaylistAdd size={22} />
      </button>
    </div>
  );
};

export default VideoActions;
