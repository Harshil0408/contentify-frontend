import { createSlice } from "@reduxjs/toolkit";

type Notification = {
    message: string;
};

interface NotificationState {
    notification: Notification[];
    showPopup: boolean;
}

const initialState: NotificationState = {
    notification: [],
    showPopup: false,
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotifications: (state, action) => {
            state.notification.unshift(action.payload);
            state.showPopup = true;
        },
        hidePopup: (state) => {
            state.showPopup = false;
        },
    },
});

export const { addNotifications, hidePopup } = notificationSlice.actions
export default notificationSlice.reducer