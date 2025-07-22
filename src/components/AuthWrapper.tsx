// src/components/AuthWrapper.tsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "@/store/store";
import { ROUTER } from "@/routes";

interface AuthWrapperProps {
    children: React.ReactNode;
    isPrivate?: boolean;
}

const AuthWrapper = ({ children, isPrivate = false }: AuthWrapperProps) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedInUser = useSelector((state: RootState) => state.auth.loggedInUser);
    const location = useLocation();

    if (isPrivate && !token) {
        return <Navigate to={ROUTER.SIGN_IN} replace />;
    }

    if (
        token &&
        loggedInUser &&
        !loggedInUser.isOnboarded &&
        location.pathname !== ROUTER.ONBOARDING
    ) {
        return <Navigate to={ROUTER.ONBOARDING} replace />;
    }

    if (
        token &&
        loggedInUser?.isOnboarded &&
        [ROUTER.SIGN_IN, ROUTER.SIGN_UP, ROUTER.OAUTH_SUCCESS].includes(location.pathname)
    ) {
        return <Navigate to={ROUTER.HOME} replace />;
    }

    return <>{children}</>;
};

export default AuthWrapper;
