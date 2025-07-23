import React, { useState } from "react";

interface Props {
  owner: {
    avatar: string;
    username: string;
    _id: string;
  };
  isSubscribed: boolean;
  onSubscribe: () => void;
}

const ChannelInfo = ({ owner, isSubscribed, onSubscribe }: Props) => {
  const [hovered, setHovered] = useState(false);

  const buttonText = isSubscribed
    ? hovered
      ? "Unsubscribe"
      : "Subscribed"
    : "Subscribe";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "1.5rem 0 1rem",
      }}
    >
      <img
        src={owner.avatar}
        alt={owner.username}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          marginRight: 16,
        }}
      />
      <div>
        <div style={{ fontWeight: 500 }}>{owner.username}</div>
        <div style={{ color: "#606060", fontSize: 14 }}>567K subscribers</div>
      </div>
      <button
        onClick={onSubscribe}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          marginLeft: 24,
          background: isSubscribed ? "#f1f1f1" : "#cc0000",
          color: isSubscribed ? "#0f0f0f" : "#fff",
          border: isSubscribed ? "1px solid #aaa" : "none",
          borderRadius: "18px",
          padding: "8px 16px",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ChannelInfo;
