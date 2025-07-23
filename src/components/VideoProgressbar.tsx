// components/VideoProgressBar.tsx
import React from "react";

interface VideoProgressBarProps {
  progressPercentage: number;
}

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ progressPercentage }) => {
  if (!progressPercentage || progressPercentage <= 0) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
      <div
        className="h-full bg-red-500"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default VideoProgressBar;
