import VektorSystemAssets from './vektor';
import RouteMateSystemAssets from './route-mate';
import HeroSystemAssets from './hero';

const SYSTEM_ASSETS = {
    VEKTOR    : VektorSystemAssets,
    ROUTE_MATE: RouteMateSystemAssets,
    HERO      : HeroSystemAssets
} as const;

export default SYSTEM_ASSETS;
