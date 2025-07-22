// src/components/Layout.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdSubscriptions,
  MdHistory,
  MdPlaylistPlay,
  MdThumbUp,
  MdFileDownload,
  MdSettings,
  MdFlag,
  MdVideoCameraBack,
  MdMenu,
  MdExplore,
  MdSearch,
  MdAddCircleOutline,
  MdNotificationsNone,
  MdPerson,
  MdLogout,
  MdMic,
  MdAccessTime,
} from "react-icons/md";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "@/constants/constants";
import UploadVideo from "./UploadVideo";
import NotificationPopup from "./Notification";
import { useDispatch } from "react-redux";
import { addNotifications } from "@/store/slices/notificationSlice";

const sidebarSections = [
  {
    items: [
      { label: "Home", path: "/", icon: <MdHome size={24} /> },
      { label: "Subscriptions", path: "/subscriptions", icon: <MdSubscriptions size={24} /> },
    ],
  },
  {
    items: [
      { label: "History", path: "/history", icon: <MdHistory size={24} /> },
      { label: "Playlist", path: "/playlist", icon: <MdPlaylistPlay size={24} /> },
      { label: "Your Videos", path: "/your-videos", icon: <MdVideoCameraBack size={24} /> },
      { label: "Liked Videos", path: "/liked", icon: <MdThumbUp size={24} /> },
      { label: "Watch Later", path: "/watch-later", icon: <MdAccessTime size={24} /> },
      { label: "Downloads", path: "/downloads", icon: <MdFileDownload size={24} /> },
    ],
  },
  {
    items: [
      { label: "Settings", path: "/settings", icon: <MdSettings size={24} /> },
      { label: "Report History", path: "/report-history", icon: <MdFlag size={24} /> },
    ],
  },
];


const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const dispatch = useDispatch();

  const allSidebarItems = sidebarSections.flatMap((section) => section.items);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9f9f9" }}>
      <aside
        style={{
          width: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          background: "#fff",
          borderRight: "1px solid #e5e5e5",
          padding: "1rem 0",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s cubic-bezier(.4,0,.2,1)",
          alignItems: sidebarOpen ? "flex-start" : "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: sidebarOpen ? "flex-start" : "center",
            marginBottom: 16,
            gap: sidebarOpen ? 12 : 0,
            paddingLeft: sidebarOpen ? 16 : 0,
            paddingRight: sidebarOpen ? 16 : 0,
          }}
        >
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              outline: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <MdMenu size={28} />
          </button>
          {sidebarOpen && <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MdExplore size={sidebarOpen ? 32 : 28} color="#0077ff" />
            {sidebarOpen && (
              <span style={{ fontWeight: 700, fontSize: 18, color: "#0077ff", letterSpacing: 1 }}>
                Explorer
              </span>
            )}
          </div>}
        </div>
        {allSidebarItems.map((item, idx) => (
          <React.Fragment key={item.path}>
            <Link
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: sidebarOpen ? 20 : 0,
                padding: sidebarOpen ? "10px 24px" : "10px 0",
                color: location.pathname === item.path ? "#f00" : "#222",
                background: location.pathname === item.path ? "#f5f5f5" : "transparent",
                textDecoration: "none",
                borderRadius: 8,
                fontWeight: location.pathname === item.path ? 600 : 400,
                transition: "background 0.2s, color 0.2s, padding 0.2s, gap 0.2s",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                width: "100%",
              }}
            >
              {item.icon}
              {sidebarOpen && <span style={{ fontSize: 16 }}>{item.label}</span>}
            </Link>
            {(idx === 0 || idx === 1 || idx === 2) && (
              <div
                style={{
                  borderBottom: "1px solid #eee",
                  margin: sidebarOpen ? "12px 0" : "12px auto",
                  width: sidebarOpen ? "90%" : 32,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </aside>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <header
          style={{
            width: "100%",
            height: 64,
            background: "#fff",
            borderBottom: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem 0 2rem",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 180 }}>

          </div>
          <form style={{ display: "flex", alignItems: "center", flex: 1, maxWidth: 480, margin: "0 auto" }}>
            <input
              type="text"
              placeholder="Search"
              style={{
                width: "100%",
                padding: "8px 16px",
                border: "1px solid #e5e5e5",
                borderRadius: 24,
                fontSize: 16,
                outline: "none",
                background: "#f5f5f5",
              }}
            />
            <button
              type="submit"
              style={{
                background: "none",
                border: "none",
                marginLeft: -40,
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
              }}
            >
              <MdSearch size={24} color="#222" />
            </button>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                marginLeft: 8,
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
              }}
              aria-label="Voice Search"
            >
              <MdMic size={24} color="#222" />
            </button>
          </form>
          <div style={{ display: "flex", alignItems: "center", gap: 24, minWidth: 180, justifyContent: "flex-end" }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
              }}
              aria-label="Create"
              onClick={() => setUploadOpen(true)}
            >
              <MdAddCircleOutline size={28} color="#222" />
            </button>
            <button
              onClick={() => dispatch(addNotifications({ message: "This is a notification!" }))}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
              }}
              aria-label="Notifications"
            >
              <MdNotificationsNone size={28} color="#222" />
            </button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((open) => !open)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                }}
                aria-label="Profile"
              >
                <MdPerson size={28} color="#0077ff" />
              </button>
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 48,
                    background: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    minWidth: 180,
                    zIndex: 100,
                    padding: "8px 0",
                  }}
                >
                  <Link
                    to="/profile"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 20px",
                      color: "#222",
                      textDecoration: "none",
                      fontSize: 16,
                      transition: "background 0.2s",
                    }}
                    onClick={() => setProfileOpen(false)}
                  >
                    <MdPerson size={22} /> Your Profile
                  </Link>
                  <div style={{ borderBottom: "1px solid #eee", margin: "4px 0" }} />
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 20px",
                      color: "#f00",
                      background: "none",
                      border: "none",
                      width: "100%",
                      fontSize: 16,
                      cursor: "pointer",
                    }}
                    onClick={() => setProfileOpen(false)}
                  >
                    <MdLogout size={22} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main style={{ flex: 1, padding: "2rem 2rem 2rem 2.5rem" }}>{children}</main>
      </div>
      <UploadVideo open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <NotificationPopup />
    </div>
  );
};

export default Layout;