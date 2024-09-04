// ** Returns initials from string
const getInitials = (str: string) =>
    str ? str.split(/\s/).reduce((accumulator, word) => accumulator + word.slice(0, 1), '') : '';

export default getInitials;
