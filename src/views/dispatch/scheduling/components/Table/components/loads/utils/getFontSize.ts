export default function getFontSize(
    width: number,
    firstStop: number,
    lastStop: number,
    minFontSize = 10,
    maxFontSize = 14
) {
    const moreLetters = firstStop > lastStop ? firstStop : lastStop;

    const IS_TWO_ROW = width <= 200;
    const GAP = 16; // between 2 first and last stop
    const LETTERS = IS_TWO_ROW ? moreLetters + 10 : firstStop + lastStop; // sum letters in 1 row
    const SIZE = 1.5; // taken from figma = 12px(font-size) / 8px(width)

    const fontSize = Math.round(((width - GAP) / LETTERS) * SIZE);

    if (fontSize >= maxFontSize) return maxFontSize;
    if (fontSize <= minFontSize) return minFontSize;

    return fontSize || minFontSize;
}
