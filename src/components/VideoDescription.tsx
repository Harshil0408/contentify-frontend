import { useState } from "react";

const VideoDescription = ({ description }: { description: string }) => {
  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
      <div
        style={{
          whiteSpace: descExpanded ? "normal" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </div>
      <button
        style={{ color: "#065fd4", background: "none", border: "none", cursor: "pointer", marginTop: 8 }}
        onClick={() => setDescExpanded(!descExpanded)}
      >
        {descExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default VideoDescription;
