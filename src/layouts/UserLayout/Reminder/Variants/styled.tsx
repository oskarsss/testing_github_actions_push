import { Typography, styled } from '@mui/material';

const InfoParagraph = styled(Typography)(({
    theme,
    color
}) => ({
    fontSize: 14,
    color:
        color === 'primary'
            ? theme.palette.utility.foreground.blue_dark.primary
            : theme.palette.utility.foreground.error.primary
}));

const LinkParagraph = styled('span')({
    cursor    : 'pointer',
    fontSize  : 14,
    fontWeight: 700,
    '&:hover' : {
        textDecoration: 'underline'
    }
});

const ReminderStyled = {
    LinkParagraph,
    InfoParagraph
};

export default ReminderStyled;
