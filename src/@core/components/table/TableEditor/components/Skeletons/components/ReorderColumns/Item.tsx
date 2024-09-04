import { Box, Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

type Props = {
    value: number;
};

export default function Item({ value }: Props) {
    const theme = useTheme();
    return (
        <Grid
            item
            xs={value}
        >
            <Box
                sx={{
                    display       : 'flex',
                    justifyContent: 'center',
                    alignItems    : 'center',
                    border        : `1px solid ${theme.palette.semantic.border.secondary}`,
                    borderRadius  : '4px',
                    height        : '36px',
                    width         : '100%'
                }}
            >
                {value === 1 && (
                    <Skeleton
                        variant="rectangular"
                        width="30px"
                        height="20px"
                        sx={{ marginX: 'auto' }}
                    />
                )}
                {value !== 1 && (
                    <Skeleton
                        variant="text"
                        width="70%"
                        sx={{
                            fontSize: '18px',
                            marginX : 'auto'
                        }}
                    />
                )}
            </Box>
        </Grid>
    );
}
