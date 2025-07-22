// src/components/NotificationPopup.tsx
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { hidePopup } from "@/store/slices/notificationSlice"
import type { RootState } from "@/store/store"

const NotificationPopup = () => {
    const { notification, showPopup } = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                dispatch(hidePopup())
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [showPopup, dispatch])

    if (!showPopup || notification.length === 0) return null

    return (
        <div
            style={{
                position: "fixed",
                top: 20,
                right: 20,
                background: "#323232",
                color: "#fff",
                padding: "1rem 1.5rem",
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                zIndex: 9999,
            }}
        >
            {notification[0].message}
        </div>
    )
}

export default NotificationPopup
