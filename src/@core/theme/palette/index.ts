import SYSTEM from '@/@system';
import { PaletteMode } from '@mui/material';

const system = SYSTEM.THEME;

type CSSColor = string;

export type Color = {
    10: CSSColor;
    25: CSSColor;
    50: CSSColor;
    100: CSSColor;
    200: CSSColor;
    300: CSSColor;
    400: CSSColor;
    500: CSSColor;
    600: CSSColor;
    700: CSSColor;
    800: CSSColor;
    900: CSSColor;
    950: CSSColor;
};

type SemanticTree = {
    primary: string;
    secondary: string;
    tertiary: string;
};

// type ColorsUtilityTree = {
//     primary: string;
//     secondary: string;
// };

type ColorsUtilityTree2 = {
    primary: string;
    secondary: string;
    tertiary: string;
};

type IconColorTree = {
    primary: string;
    secondary: string;
};

type ColorsUtility = {
    text: {
        yellow: string;
        blue_dark: string;
        pink: string;
        warning: string;
        error: string;
        gray: string;
        success: string;
        violet: string;
        purple: string;
        indigo: string;
    };
    foreground: {
        yellow: ColorsUtilityTree2;
        blue_dark: ColorsUtilityTree2;
        pink: ColorsUtilityTree2;
        warning: ColorsUtilityTree2;
        error: ColorsUtilityTree2;
        success: ColorsUtilityTree2;
        gray: ColorsUtilityTree2;
        violet: ColorsUtilityTree2;
        indigo: ColorsUtilityTree2;
        purple: ColorsUtilityTree2;
    };
    border: {
        dark_blue: string;
        violet: string;
        indigo: string;
        purple: string;
    };
    icon: {
        blue_dark: IconColorTree;
        violet: IconColorTree;
        ocean: IconColorTree;
        pink: IconColorTree;
        error: IconColorTree;
        warning: IconColorTree;
    };
};

export type ForegroundUtilityType = keyof ColorsUtility['foreground'];

//
// customColors: {
// DO NOT ADD NEW COLORS
//     dark         : darkColor,
//     main         : mainColor,
//     light        : lightColor,
//     darkBg       : dark_bg,
//     icon         : mode === 'light' ? '#667085' : '#EAECF0',
//     borderGrey   : mode === 'light' ? '#EAECF0' : '#38383AFF',
//     lightBg      : '#F4F5FA',
//     bodyBg       : mode === 'light' ? '#F4F5FA' : dark_bg,
//     tableHeaderBg: mode === 'light' ? '#F9FAFC' : dark_bg
// },

type ColorsSemantic = {
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        white: string;
        error: string;
        success: string;
        warning: string;
        brand: SemanticTree;
        disabled: string;
    };
    foreground: {
        white: SemanticTree;
        primary: string;
        brand: SemanticTree;

        // & {
        //     quarterary: string;
        // };
        secondary: string;
        tertiary: string;
        quarterary: string;
        chinquary: string;

        // error: SemanticTree;
        // success: SemanticTree;
        // warning: SemanticTree;
        // pink: {
        //     primary: string;
        // };
        disabled: string;
        six: string;

        // seven: string;
    };
    background: {
        white: string;
        brand: string;
        primary: string;
        secondary: string;
    };
    border: {
        brand: SemanticTree;
        primary: string;
        secondary: string;
        tertiary: string;
        error: {
            primary: string;
            secondary: string;
        };
        success: {
            primary: string;
            secondary: string;
        };
    };
    actions: {
        foreground: {
            primary: string;
            secondary: string;
            red: string;
            success: string;
            gray: {
                primary: string;
                secondary: string;
            };
            tertiary: string;
        };
        utility: {
            yellow: string;
            blue_dark: string;
            pink: string;
            warning: string;
            error: string;
            success: string;
            violet: string;
            indigo: string;
        };
    };
};

export type AppPalette = {
    mode: PaletteMode;
    isLight: boolean;
    isDark: boolean;
    colors: {
        base: {
            white: string;
            dark: string;
        };
        blue_dark: Color;
        gray: Color;
        error: Color;
        success: Color;
        warning: Color;
        yellow: Color;
        violet: Color;
        indigo: Color;
        pink: Color;
        dark: Color;
        brand: Color;
        iron: Color;
        ocean: Color;
    };
    semantic: ColorsSemantic;
    utility: ColorsUtility;
};

const DefaultPalette = (mode: 'light' | 'dark'): AppPalette => {
    const isLight = mode === 'light';
    const isDark = mode === 'dark';

    const colors_semantic = isLight ? system.light.colors_semantic : system.dark.colors_semantic;
    const colors_utility = isLight ? system.light.colors_utility : system.dark.colors_utility;

    return {
        mode,
        isDark,
        isLight,
        colors: {
            base: {
                white: system.colors.base.white,
                dark : system.colors.base.dark
            },
            brand: {
                10 : system.colors.brand[10],
                25 : system.colors.brand[25],
                50 : system.colors.brand[50],
                100: system.colors.brand[100],
                200: system.colors.brand[200],
                300: system.colors.brand[300],
                400: system.colors.brand[400],
                500: system.colors.brand[500],
                600: system.colors.brand[600],
                700: system.colors.brand[700],
                800: system.colors.brand[800],
                900: system.colors.brand[900],
                950: system.colors.brand[950]
            },
            error: {
                10 : system.colors.error[10],
                25 : system.colors.error[25],
                50 : system.colors.error[50],
                100: system.colors.error[100],
                200: system.colors.error[200],
                300: system.colors.error[300],
                400: system.colors.error[400],
                500: system.colors.error[500],
                600: system.colors.error[600],
                700: system.colors.error[700],
                800: system.colors.error[800],
                900: system.colors.error[900],
                950: system.colors.error[950]
            },
            success: {
                10 : system.colors.success[10],
                25 : system.colors.success[25],
                50 : system.colors.success[50],
                100: system.colors.success[100],
                200: system.colors.success[200],
                300: system.colors.success[300],
                400: system.colors.success[400],
                500: system.colors.success[500],
                600: system.colors.success[600],
                700: system.colors.success[700],
                800: system.colors.success[800],
                900: system.colors.success[900],
                950: system.colors.success[950]
            },
            blue_dark: {
                10 : system.colors['blue-dark'][10],
                25 : system.colors['blue-dark'][25],
                50 : system.colors['blue-dark'][50],
                100: system.colors['blue-dark'][100],
                200: system.colors['blue-dark'][200],
                300: system.colors['blue-dark'][300],
                400: system.colors['blue-dark'][400],
                500: system.colors['blue-dark'][500],
                600: system.colors['blue-dark'][600],
                700: system.colors['blue-dark'][700],
                800: system.colors['blue-dark'][800],
                900: system.colors['blue-dark'][900],
                950: system.colors['blue-dark'][950]
            },
            dark: {
                10 : system.colors.dark[10],
                25 : system.colors.dark[25],
                50 : system.colors.dark[50],
                100: system.colors.dark[100],
                200: system.colors.dark[200],
                300: system.colors.dark[300],
                400: system.colors.dark[400],
                500: system.colors.dark[500],
                600: system.colors.dark[600],
                700: system.colors.dark[700],
                800: system.colors.dark[800],
                900: system.colors.dark[900],
                950: system.colors.dark[950]
            },
            gray: {
                10 : system.colors.gray[10],
                25 : system.colors.gray[25],
                50 : system.colors.gray[50],
                100: system.colors.gray[100],
                200: system.colors.gray[200],
                300: system.colors.gray[300],
                400: system.colors.gray[400],
                500: system.colors.gray[500],
                600: system.colors.gray[600],
                700: system.colors.gray[700],
                800: system.colors.gray[800],
                900: system.colors.gray[900],
                950: system.colors.gray[950]
            },
            indigo: {
                10 : system.colors.indigo[10],
                25 : system.colors.indigo[25],
                50 : system.colors.indigo[50],
                100: system.colors.indigo[100],
                200: system.colors.indigo[200],
                300: system.colors.indigo[300],
                400: system.colors.indigo[400],
                500: system.colors.indigo[500],
                600: system.colors.indigo[600],
                700: system.colors.indigo[700],
                800: system.colors.indigo[800],
                900: system.colors.indigo[900],
                950: system.colors.indigo[950]
            },
            pink: {
                10 : system.colors.pink[10],
                25 : system.colors.pink[25],
                50 : system.colors.pink[50],
                100: system.colors.pink[100],
                200: system.colors.pink[200],
                300: system.colors.pink[300],
                400: system.colors.pink[400],
                500: system.colors.pink[500],
                600: system.colors.pink[600],
                700: system.colors.pink[700],
                800: system.colors.pink[800],
                900: system.colors.pink[900],
                950: system.colors.pink[950]
            },
            iron: {
                10 : system.colors.iron[10],
                25 : system.colors.iron[25],
                50 : system.colors.iron[50],
                100: system.colors.iron[100],
                200: system.colors.iron[200],
                300: system.colors.iron[300],
                400: system.colors.iron[400],
                500: system.colors.iron[500],
                600: system.colors.iron[600],
                700: system.colors.iron[700],
                800: system.colors.iron[800],
                900: system.colors.iron[900],
                950: system.colors.iron[950]
            },
            ocean: {
                10 : system.colors.ocean[10],
                25 : system.colors.ocean[25],
                50 : system.colors.ocean[50],
                100: system.colors.ocean[100],
                200: system.colors.ocean[200],
                300: system.colors.ocean[300],
                400: system.colors.ocean[400],
                500: system.colors.ocean[500],
                600: system.colors.ocean[600],
                700: system.colors.ocean[700],
                800: system.colors.ocean[800],
                900: system.colors.ocean[900],
                950: system.colors.ocean[950]
            },
            violet: {
                10 : system.colors.violet[10],
                25 : system.colors.violet[25],
                50 : system.colors.violet[50],
                100: system.colors.violet[100],
                200: system.colors.violet[200],
                300: system.colors.violet[300],
                400: system.colors.violet[400],
                500: system.colors.violet[500],
                600: system.colors.violet[600],
                700: system.colors.violet[700],
                800: system.colors.violet[800],
                900: system.colors.violet[900],
                950: system.colors.violet[950]
            },
            warning: {
                10 : system.colors.warning[10],
                25 : system.colors.warning[25],
                50 : system.colors.warning[50],
                100: system.colors.warning[100],
                200: system.colors.warning[200],
                300: system.colors.warning[300],
                400: system.colors.warning[400],
                500: system.colors.warning[500],
                600: system.colors.warning[600],
                700: system.colors.warning[700],
                800: system.colors.warning[800],
                900: system.colors.warning[900],
                950: system.colors.warning[950]
            },
            yellow: {
                10 : system.colors.yellow[10],
                25 : system.colors.yellow[25],
                50 : system.colors.yellow[50],
                100: system.colors.yellow[100],
                200: system.colors.yellow[200],
                300: system.colors.yellow[300],
                400: system.colors.yellow[400],
                500: system.colors.yellow[500],
                600: system.colors.yellow[600],
                700: system.colors.yellow[700],
                800: system.colors.yellow[800],
                900: system.colors.yellow[900],
                950: system.colors.yellow[950]
            }
        },
        semantic: {
            ...colors_semantic,
            text: {
                ...colors_semantic.text,
                success: colors_utility.text.success,
                warning: colors_utility.text.warning,
                error  : colors_utility.text.error
            },
            actions: {
                ...colors_semantic.actions,
                utility: {
                    ...colors_semantic.actions.utility,
                    blue_dark: colors_semantic.actions.utility['blue-dark']
                }
            }
        },
        utility: {
            ...colors_utility,
            border: {
                ...colors_utility.border,
                dark_blue: colors_utility.border['dark blue']
            },
            text: {
                ...colors_utility.text,
                blue_dark: colors_utility.text['blue dark']
            },
            foreground: {
                ...colors_utility.foreground,
                blue_dark: colors_utility.foreground['blue dark']
            },
            icon: {
                ...colors_utility.icon,
                blue_dark: colors_utility.icon['blue dark']
            }
        }
    };
};

export default DefaultPalette;
