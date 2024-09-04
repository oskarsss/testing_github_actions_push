/* eslint-disable no-param-reassign */
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import NotificationsGrpcService from '@/@grpcServices/services/notifications/notifications.service';
import type { NotificationModel_Notification } from '@proto/models/model_notification';
import { api } from '../api';

type InitialState = {
    notifications: NotificationModel_Notification[];
    selectedNotification: NotificationModel_Notification | null;
};

const initialState: InitialState = {
    notifications       : [],
    selectedNotification: null
};

const notifications = createSlice({
    name     : 'notifications',
    initialState,
    selectors: {
        getNotifications       : (state) => state.notifications,
        getSelectedNotification: (state) => state.selectedNotification
    },
    reducers: {
        SelectNotification(state, action: PayloadAction<NotificationModel_Notification | null>) {
            state.selectedNotification = action.payload;
        },
        AddNewNotification(state, action: PayloadAction<NotificationModel_Notification>) {
            const notification = state.notifications.find(
                (notification) => notification.notificationId === action.payload.notificationId
            );

            if (notification) {
                const filteredNotifications = state.notifications.filter(
                    (notification) => notification.notificationId !== action.payload.notificationId
                );

                state.notifications = [action.payload, ...filteredNotifications];
            } else {
                state.notifications.unshift(action.payload);
            }
        },
        MarkAsReadNotification(state, action: PayloadAction<string[]>) {
            state.notifications = state.notifications.map((notification) => {
                if (action.payload.includes(notification.notificationId)) {
                    notification.isRead = true;
                }

                return notification;
            });
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
        builder.addMatcher(
            NotificationsGrpcService.endpoints.getNotifications.matchFulfilled,
            (state, action) => {
                state.notifications = action.payload.notifications;
            }
        );
    }
});
export const NotificationsActions = notifications.actions;
export const NotificationsSelectors = notifications.selectors;
export const NotificationsReducer = notifications.reducer;
