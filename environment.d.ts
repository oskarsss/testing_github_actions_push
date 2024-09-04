export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_APP_ENV: string;
            NEXT_PUBLIC_API_URL: string;
            NEXT_PUBLIC_SENTRY_DSN: string;
            NEXT_PUBLIC_STORAGE_BASE_URL: string;
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
            NEXT_PUBLIC_MAPBOX_TOKEN: string;
            NEXT_PUBLIC_TOMORROW_KEY: string;
            NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
            NEXT_PUBLIC_LIGHTBOX_JS_KEY: string;
            NEXT_PUBLIC_MAPBOX_PLACES_API_URL: string;
            NEXT_PUBLIC_MAPBOX_PLACES_TOKEN: string;
            NEXT_PUBLIC_BUCKET_URL: string;
            NEXT_PUBLIC_GRPC_URL: string;
            NEXT_PUBLIC_DATA_BACKEND_URL: string;
            NEXT_PUBLIC_DISABLE_SOURCE_MAPS: string;
            NEXT_PUBLIC_TRACKING_LINK: string;
            NEXT_PUBLIC_SYSTEM_THEME_TOKEN?: 'VEKTOR' | 'ROUTE_MATE';
        }
    }
}
