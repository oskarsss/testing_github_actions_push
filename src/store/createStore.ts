import { Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { createLogger } from 'redux-logger';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LicenseInfo } from '@mui/x-license-pro';
import { BroadcastUpdates } from '@/utils/broadcast';
import { WindowFocus } from '@/utils/windowFocus';
import { api } from './api';
import getRootReducer from './reducers';
import { ProvideTagsType } from './api_tags';
import { createQueryTagListener } from './middlewares';

LicenseInfo.setLicenseKey(
    '66881c1a359c1eb55e36da3d3a14f5bdTz03MTcwMCxFPTE3MjIyMDc1NjQwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
    // const logger = createLogger({ collapsed: true });
    // middlewares.push(logger);
}

export const BroadcastTagInvalidation = new BroadcastUpdates<{ tag: ProvideTagsType }>(
    'tagInvalidation'
);

const broadcastTagInvalidationMiddleware = createQueryTagListener<
    ProvideTagsType,
    ReturnType<ReturnType<typeof getRootReducer>>
>(
    (state) => state.api.provided,
    (tag) => (WindowFocus.focused ? BroadcastTagInvalidation.postUpdate({ tag }) : null)
);

// eslint-disable-next-line import/prefer-default-export
export const createStore = () =>
    configureStore({
        reducer   : getRootReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            })
                .concat(middlewares)
                .concat(api.middleware)
                .concat(broadcastTagInvalidationMiddleware)
    });
