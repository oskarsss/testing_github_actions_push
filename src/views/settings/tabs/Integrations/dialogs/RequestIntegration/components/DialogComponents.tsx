import { styled, Typography } from '@mui/material';
import MuiDivider from '@mui/material/Divider';

const title = (text: string) => (
    <Typography
        fontSize="20px"
        fontWeight={600}
        lineHeight="120%"
    >
        {text}
    </Typography>
);

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize  : '14px',
    color     : theme.palette.semantic.text.primary,
    margin    : '16px 0 8px 0',
    fontWeight: 500
}));

const Description = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    color   : theme.palette.semantic.text.secondary
}));

const Divider = styled(MuiDivider)({
    margin: '0 0 16px -16px',
    width : 'calc(100% + 32px)'
});

const RequestIntegrationDialogComponents = {
    title,
    SubTitle,
    Description,
    Divider
};

export default RequestIntegrationDialogComponents;
