import { ROUTER } from "@/routes"
import { setTokens } from "@/store/slices/authSlice"
import type { AppDispatch } from "@/store/store"
import { getMeThunk } from "@/store/thunks/authThunk"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const spinnerStyle: React.CSSProperties = {
    width: "40px",
    height: "40px",
    border: "4px solid #e0e7ef",
    borderTop: "4px solid #4f8cff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto"
};

const spinnerKeyframes = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;

const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: "40px 32px 32px 32px",
    maxWidth: 360,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const bannerStyle: React.CSSProperties = {
    width: "100%",
    height: 80,
    background: "linear-gradient(90deg, #4f8cff 0%, #38e6c5 100%)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "-40px -32px 24px -32px"
};

const OAuthSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");

        const handleLogin = async () => {
            if (accessToken) {
                dispatch(setTokens(accessToken));
                await dispatch(getMeThunk());
                navigate(ROUTER.HOME);
            } else {
                navigate(ROUTER.SIGN_IN);
            }
        };

        handleLogin();
    }, []);
    return (
        <div style={{ minHeight: "100vh", background: "#f6f8fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <style>{spinnerKeyframes}</style>
            <div style={cardStyle}>
                <div style={bannerStyle}>
                    {/* SVG illustration: shield with checkmark */}
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="24" fill="#fff" fillOpacity="0.15" />
                        <path d="M24 10L36 14V22C36 31.5 24 38 24 38C24 38 12 31.5 12 22V14L24 10Z" fill="#4f8cff" />
                        <path d="M20.5 24.5L23 27L28 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div style={{ marginTop: 8, fontWeight: 600, fontSize: 20, color: "#222", textAlign: "center" }}>
                    Verifying your account
                </div>
                <div style={{ marginTop: 8, fontSize: 15, color: "#666", textAlign: "center" }}>
                    Please wait while we verify your credentials and redirect you.
                </div>
                <div style={{ marginTop: 32 }}>
                    <div style={spinnerStyle}></div>
                </div>
            </div>
        </div>
    )
}

export default OAuthSuccess 
