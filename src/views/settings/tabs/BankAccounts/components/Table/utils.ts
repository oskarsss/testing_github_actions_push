export const getHiddenCardNumber = (lastFourDigits: string) =>
    `${Array.from({ length: 3 }, () => '****').join('')} ${lastFourDigits}`;
