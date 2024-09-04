import DefaultPalette from '@/@core/theme/palette';

export type Color = keyof ReturnType<typeof DefaultPalette>['utility']['foreground'];

export const colorConfig: Color[] = [
    'success',
    'blue_dark',
    'purple',
    'violet',
    'indigo',
    'pink',
    'gray',
    'error',
    'yellow',
    'warning'
];

export function getColor(index: number): Color {
    let newIndex = index;
    if (index >= colorConfig.length) {
        newIndex = colorConfig.length - index;
    }
    if (newIndex >= colorConfig.length) {
        return colorConfig[newIndex % colorConfig.length];
    }
    return colorConfig[newIndex];
}
