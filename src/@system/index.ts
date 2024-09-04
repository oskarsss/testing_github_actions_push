import SYSTEM_ASSETS from './assets';
import SYSTEM_THEMES_TOKENS from './themes';

// staging route mate parthner id: 30969707-bfae-4e03-a0b3-abfe754c5b16

const ROUTE_MATE_PARTNER_ID =
    process.env.NEXT_PUBLIC_APP_ENV !== 'production'
        ? '30969707-bfae-4e03-a0b3-abfe754c5b16'
        : '6d56754a-a1c9-4a45-b366-af73857e9acd';

const APPS_CONFIG = Object.freeze({
    VEKTOR: {
        TOKEN   : 'VEKTOR',
        TITLE   : 'Vektor',
        KEYWORDS: 'Vektor, Fleet Management',
        FAVICONS: {
            LARGE      : '/images/favicon/vektor/favicon-32x32.png',
            SMALL      : '/images/favicon/vektor/favicon-16x16.png',
            APPLE_TOUCH: '/images/favicon/vektor/apple-touch-icon.png'
        },
        AI_NAME              : 'Vektor AI Doc',
        BOT_NAME             : 'Vektor bot',
        ASSETS               : SYSTEM_ASSETS.VEKTOR,
        THEME                : SYSTEM_THEMES_TOKENS.VEKTOR,
        SUPPORT_EMAIL        : 'support@vektortms.com',
        PLACEHOLDER_EMAIL    : 'demo@vektortms.com',
        FEEDBACK_EMAIL       : 'feedback@vektortms.com',
        TMS_FRIENDLY_NAME    : 'Vektor',
        DRIVER_APP_LINK      : 'https://driver.vektortms.com',
        PRIVACY_LINK         : 'https://vektortms.com/legal/privacy',
        TERMS_LINK           : 'https://vektortms.com/legal/terms',
        PRESENT_LINK         : 'https://vektortms.com/',
        PRESENT_LINK_TITLE   : 'vektortms.com',
        TMS_LINK             : 'https://app.vektortms.com',
        SCHEDULE_SESSION_LINK: '',
        SCHEDULE_CALL_LINK   : 'https://calendly.com/vektortms/vektor-carrier-demo',
        PARTNER_ID           : '',
        HELP_LINK            : 'https://help.vektortms.com/en/',
        CHANGE_LOG_LINK      : 'https://vektortms.com/updates',
        SOCIAL_LINKS         : {
            FACEBOOK : 'https://www.facebook.com/vektortms',
            INSTAGRAM: 'https://www.instagram.com/vektortms',
            LINKEDIN : 'https://www.linkedin.com/company/vektortms'
        },
        ONBOARDING: {
            VIDEO_LINKS: {
                FULL_WATCH          : 'https://www.youtube.com/embed/ad7RS02sZVc?si=rDGAo8j_1V8F4E9Q',
                SETUP_PROFILE       : '',
                SETUP_FLEET         : '',
                SETUP_INTEGRATIONS  : '',
                SETUP_PAYROLL       : '',
                SETUP_CONFIGURATIONS: ''
            },
            ANY_QUESTION_LINKS: {
                SETUP_PROFILE       : '',
                SETUP_FLEET         : '',
                SETUP_INTEGRATIONS  : '',
                SETUP_PAYROLL       : '',
                SETUP_CONFIGURATIONS: ''
            }
        }
    },
    ROUTE_MATE: {
        TOKEN   : 'ROUTE_MATE',
        TITLE   : 'RouteMate TMS',
        KEYWORDS: 'RouteMate TMS, Fleet Management',
        FAVICONS: {
            LARGE      : '/images/favicon/route-mate/icon.png',
            SMALL      : '/images/favicon/route-mate/icon.png',
            APPLE_TOUCH: '/images/favicon/route-mate/icon.png'
        },
        BOT_NAME             : 'RouteMate bot',
        AI_NAME              : 'RouteMate AI Doc',
        ASSETS               : SYSTEM_ASSETS.ROUTE_MATE,
        THEME                : SYSTEM_THEMES_TOKENS.ROUTE_MATE,
        SUPPORT_EMAIL        : 'support@routemate.us',
        PLACEHOLDER_EMAIL    : 'demo@routemate.com',
        FEEDBACK_EMAIL       : '',
        TMS_FRIENDLY_NAME    : 'RouteMate',
        DRIVER_APP_LINK      : 'https://driver.routemate.us/',
        PRIVACY_LINK         : 'https://routemate.us/privacy.html',
        TERMS_LINK           : 'https://routemate.us/terms.html',
        PRESENT_LINK         : 'https://routemate.us/',
        PRESENT_LINK_TITLE   : 'routemate.us',
        TMS_LINK             : 'https://tms.routemate.us/',
        SCHEDULE_SESSION_LINK: '',
        SCHEDULE_CALL_LINK   : '',
        PARTNER_ID           : ROUTE_MATE_PARTNER_ID,
        CHANGE_LOG_LINK      : '',
        HELP_LINK            : '',
        SOCIAL_LINKS         : {
            FACEBOOK : '',
            INSTAGRAM: '',
            LINKEDIN : ''
        },
        ONBOARDING: {
            VIDEO_LINKS: {
                FULL_WATCH          : '',
                SETUP_PROFILE       : '',
                SETUP_FLEET         : '',
                SETUP_INTEGRATIONS  : '',
                SETUP_PAYROLL       : '',
                SETUP_CONFIGURATIONS: ''
            },
            ANY_QUESTION_LINKS: {
                SETUP_PROFILE       : '',
                SETUP_FLEET         : '',
                SETUP_INTEGRATIONS  : '',
                SETUP_PAYROLL       : '',
                SETUP_CONFIGURATIONS: ''
            }
        }
    },
    TEST: {
        TOKEN   : 'ROUTE_MATE',
        TITLE   : 'Route Mate TMS',
        KEYWORDS: 'Route Mate TMS, Fleet Management',
        FAVICONS: {
            LARGE      : '/images/favicon/route-mate/icon.png',
            SMALL      : '/images/favicon/route-mate/icon.png',
            APPLE_TOUCH: '/images/favicon/route-mate/icon.png'
        },
        AI_NAME              : 'Route Mate AI Doc',
        BOT_NAME             : 'Route Mate bot',
        ASSETS               : SYSTEM_ASSETS.ROUTE_MATE,
        THEME                : SYSTEM_THEMES_TOKENS.ROUTE_MATE,
        SUPPORT_EMAIL        : 'support@routemate.us',
        PLACEHOLDER_EMAIL    : 'demo@routemate.com',
        FEEDBACK_EMAIL       : '',
        TMS_FRIENDLY_NAME    : 'Route Mate',
        DRIVER_APP_LINK      : 'https://driver.routemate.us/',
        PRIVACY_LINK         : 'https://routemate.us/privacy.html',
        TERMS_LINK           : 'https://routemate.us/terms.html',
        PRESENT_LINK         : 'https://routemate.us/',
        PRESENT_LINK_TITLE   : 'routemate.us',
        TMS_LINK             : 'https://tms.routemate.us/',
        SCHEDULE_SESSION_LINK: '',
        SCHEDULE_CALL_LINK   : '',
        PARTNER_ID           : '',
        CHANGE_LOG_LINK      : '',
        HELP_LINK            : '',
        SOCIAL_LINKS         : {
            FACEBOOK : '',
            INSTAGRAM: '',
            LINKEDIN : ''
        },
        ONBOARDING: {
            VIDEO_LINKS: {
                FULL_WATCH          : '',
                SETUP_PROFILE       : '',
                SETUP_FLEET         : '',
                SETUP_INTEGRATIONS  : '',
                SETUP_PAYROLL       : '',
                SETUP_CONFIGURATIONS: ''
            },
            ANY_QUESTION_LINKS: {
                SETUP_PROFILE       : '',
                SETUP_FLEET         : '',
                SETUP_INTEGRATIONS  : '',
                SETUP_PAYROLL       : '',
                SETUP_CONFIGURATIONS: ''
            }
        }
    }
});

const SYSTEM = APPS_CONFIG[process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN || 'VEKTOR'];

export default SYSTEM;
