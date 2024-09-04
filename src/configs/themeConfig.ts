// ** Icon Import
import SYSTEM from '@/@system';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import CircleOutline from 'mdi-material-ui/CircleOutline';

export interface ThemeConfigType {
    templateName: string;
    layout: 'vertical' | 'horizontal';
    mode: 'light' | 'dark';
    direction: 'ltr' | 'rtl';
    skin: 'default' | 'bordered' | 'semi-dark';
    contentWidth: 'full' | 'boxed';
    footer: 'fixed' | 'static' | 'hidden';
    routingLoader: boolean;
    navHidden: boolean;
    menuTextTruncate: boolean;
    navSubItemIcon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string;
    };
    verticalNavToggleType: 'accordion' | 'collapse';
    navCollapsed: boolean;
    navigationSize: number;
    collapsedNavigationSize: number;
    horizontalMenuToggle: 'click' | 'hover';
    horizontalMenuAnimation: boolean;
    appBar: 'fixed' | 'static' | 'hidden';
    appBarBlur: boolean;
    responsiveFontSizes: boolean;
    disableRipple: boolean;
    disableCustomizer: boolean;
    toastPosition:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right';
    dialogTransitionTimeout: number;
}

const themeConfig: ThemeConfigType = {
    // ** Layout Configs
    templateName    : SYSTEM.TITLE /* App Name */,
    layout          : 'vertical' /* vertical | horizodisableCustomizerntal */,
    mode            : 'light' /* light | dark */,
    direction       : 'ltr' /* ltr | rtl */,
    skin            : 'default' /* default | bordered | semi-dark /*! Activity: semi-dark value will only work for Vertical Layout */,
    contentWidth    : 'full' /* full | boxed */,
    footer          : 'static' /* fixed | static | hidden */,
    // ** Routing Configs
    routingLoader   : true /* true | false */,
    // ** Navigation (Menu) Configs
    navHidden       : false /* true | false */,
    menuTextTruncate: true /* true | false */,
    navSubItemIcon  : CircleOutline /* Icon Element */,
    verticalNavToggleType:
        'accordion' /* accordion | collapse /*! Activity: This is for Vertical navigation menu only */,
    // eslint-disable-next-line max-len
    navCollapsed           : false /* true | false /*! Activity: This is for Vertical navigation menu only */,
    // eslint-disable-next-line max-len
    navigationSize         : 260 /* Number in PX(Pixels) /*! Activity: This is for Vertical navigation menu only */,
    // eslint-disable-next-line max-len
    collapsedNavigationSize: 68 /* Number in PX(Pixels) /*! Activity: This is for Vertical navigation menu only */,
    horizontalMenuToggle:
        'hover' /* click | hover /*! Activity: This is for Horizontal navigation menu only */,
    horizontalMenuAnimation: true /* true | false */,
    // ** AppBar Configs
    appBar                 : 'hidden' /* fixed | static | hidden /*! Activity: hidden value will only work for Vertical Layout */,
    appBarBlur             : true /* true | false */,
    // ** Other Configs
    responsiveFontSizes    : true /* true | false */,
    disableRipple          : false /* true | false */,
    disableCustomizer      : true /* true | false */,
    toastPosition:
        'top-right' /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */,
    dialogTransitionTimeout: 150 /* Number in milliseconds */
};

export default themeConfig;
