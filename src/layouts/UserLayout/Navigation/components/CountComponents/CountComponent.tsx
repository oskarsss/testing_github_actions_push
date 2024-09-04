import { Stack } from '@mui/material';

const CountComponent = ({ count = 0 }) => (
    <Stack
        borderRadius="50%"
        padding={count > 0 ? '2px 6px' : 0}
        lineHeight="1.6"
        fontSize="12px"
        minWidth="24px"
        alignItems="center"
        justifyContent="center"
        fontWeight={600}
        flexShrink={0}
        sx={{
            backgroundColor: (theme) => theme.palette.semantic.foreground.secondary,
            color          : (theme) => theme.palette.semantic.text.secondary
        }}
    >
        {count > 0 ? count : ''}
    </Stack>
);

export default CountComponent;
