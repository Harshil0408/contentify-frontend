// -------------------- External Libraries --------------------
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// -------------------- Redux & Store --------------------
import type { AppDispatch, RootState } from "./store/store";
import { addNotifications } from "./store/slices/notificationSlice";

// -------------------- Utils & Constants --------------------
import { setAuthToken } from "./constants/function";
import { ROUTER } from "./routes";
import { socket } from "./utils/socket";

// -------------------- Layout & Wrappers --------------------
import AuthWrapper from "./components/AuthWrapper";
import Layout from "./components/Layout";

// -------------------- Pages --------------------

import PageNotFound from "./components/PageNotFound";
import OAuthSuccess from "./components/OAuthSuccess ";

import {
  Dashboard,
  Downloads,
  History,
  Home,
  LikedVideos,
  Onboarding,
  Playlist,
  ReportHistory,
  Settings,
  SignIn,
  SignUp,
  Subscriptions,
  Video,
  WatchLater,
  YourVideos,

} from './utils/export'


const App = () => {

  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    socket.on("notify-channel-owner", (data) => {
      console.log("Received notification from socket:", data);
      dispatch(addNotifications({
        message: data.message
      }))
    })

    return () => {
      socket.off("notify-channel-owner")
    }
  }, [dispatch])

  useEffect(() => {
    if (token) {
      setAuthToken(token)
    }
  }, [token])

  return (
    <Routes>
      <Route path={ROUTER.HOME} element={<AuthWrapper isPrivate><Layout> <Home /></Layout></AuthWrapper>} />
      <Route path={`${ROUTER.VIDEO}/:videoId`} element={<AuthWrapper isPrivate><Layout> <Video /></Layout></AuthWrapper>} />
      <Route path={ROUTER.SUBSCRIPTIONS} element={<AuthWrapper isPrivate><Layout> <Subscriptions /></Layout></AuthWrapper>} />
      <Route path={ROUTER.HISTORY} element={<AuthWrapper isPrivate><Layout> <History /></Layout></AuthWrapper>} />
      <Route path={ROUTER.PLAYLIST} element={<AuthWrapper isPrivate><Layout> <Playlist /></Layout></AuthWrapper>} />
      <Route path={ROUTER.YOUR_VIDEOS} element={<AuthWrapper isPrivate><Layout> <YourVideos /></Layout></AuthWrapper>} />
      <Route path={ROUTER.LIKED} element={<AuthWrapper isPrivate><Layout> <LikedVideos /></Layout></AuthWrapper>} />
      <Route path={ROUTER.DOWNLOADS} element={<AuthWrapper isPrivate><Layout> <Downloads /></Layout></AuthWrapper>} />
      <Route path={ROUTER.SETTINGS} element={<AuthWrapper isPrivate><Layout> <Settings /></Layout></AuthWrapper>} />
      <Route path={ROUTER.REPORT_HISTORY} element={<AuthWrapper isPrivate><Layout> <ReportHistory /></Layout></AuthWrapper>} />
      <Route path={ROUTER.DASHBOARD} element={<AuthWrapper isPrivate> <Dashboard /></AuthWrapper>} />
      <Route path={ROUTER.ONBOARDING} element={<AuthWrapper isPrivate><Onboarding /></AuthWrapper>} />
      <Route path={ROUTER.WATCH_LATER} element={<AuthWrapper isPrivate><Layout><WatchLater /></Layout></AuthWrapper>} />
      <Route path={ROUTER.OAUTH_SUCCESS} element={<AuthWrapper ><OAuthSuccess /></AuthWrapper>} />
      <Route path={ROUTER.SIGN_IN} element={<AuthWrapper><SignIn /></AuthWrapper>} />
      <Route path={ROUTER.SIGN_UP} element={<AuthWrapper><SignUp /></AuthWrapper>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
