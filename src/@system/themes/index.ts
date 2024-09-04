import vektor from './configs/vektor.json';
import route_mate from './configs/route-mate.json';
import test from './configs/test-brand.json';

const SYSTEM_THEMES_TOKENS = {
    VEKTOR    : vektor,
    ROUTE_MATE: route_mate,
    TEST      : test
} as const;

export type SystemThemeTokens = typeof SYSTEM_THEMES_TOKENS;

export default SYSTEM_THEMES_TOKENS;
