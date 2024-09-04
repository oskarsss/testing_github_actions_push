import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
    fontWeight  : 600,
    fontSize    : '18px',
    lineHeight  : '23px',
    marginBottom: '5px',
    color       : theme.palette.semantic.text.primary
}));

const SubTitle = styled(Typography)(({ theme }) => ({
    fontWeight  : 500,
    fontSize    : '14px',
    lineHeight  : '20px',
    marginBottom: '15px',
    color       : theme.palette.semantic.text.secondary
}));

const ShareLinkStyled = {
    Title,
    SubTitle
};
export default ShareLinkStyled;
