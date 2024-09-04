import { Box } from '@mui/material';

type Props = {
    title: string;
};

const NoItems = ({ title }: Props) => (
    <Box
        sx={{
            display       : 'flex',
            alignItems    : 'center',
            justifyContent: 'center',
            height        : 66,
            border        : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,
            borderRadius  : 1,
            marginTop     : 7
        }}
    >
        {title}
    </Box>
);
export default NoItems;
