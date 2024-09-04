/**
 * Configuration object for application routes.
 * This object defines the structure and paths for various routes in the application.
 * Note: Paths should start with '/' and end without '/'.
 */
const APP_ROUTES_CONFIG = Object.freeze({
    dispatch: {
        orders: {
            path   : '/dispatch/orders',
            details: (loadId: string) => `/dispatch/orders/${loadId}`
        },
        manifests: {
            path   : '/dispatch/manifests',
            details: (manifestId: string) => `/dispatch/manifests/${manifestId}`
        }
    }
});

export default APP_ROUTES_CONFIG;
