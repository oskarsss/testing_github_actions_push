import { CircularProgress, Stack, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = { status: 'pending' | 'success' | 'failed'; errorText?: string };

export default function StatusCell({
    status,
    errorText
}: Props) {
    const { t } = useAppTranslation();
    if (status === 'success') {
        return (
            <Stack
                direction="row"
                width="max-content"
                alignItems="center"
                borderRadius={1}
                gap={2}
                sx={{
                    backgroundColor: (theme) => theme.palette.utility.foreground.success.tertiary,
                    padding        : '2px 6px',
                    svg            : {
                        fill  : (theme) => theme.palette.utility.foreground.success.primary,
                        width : '20px',
                        height: '20px'
                    }
                }}
            >
                <CheckCircleIcon />
                <Typography
                    textTransform="capitalize"
                    fontWeight={600}
                    sx={{
                        color: (theme) => theme.palette.utility.foreground.success.primary
                    }}
                >
                    {t('common:state.success')}
                </Typography>
            </Stack>
        );
    }
    if (status === 'failed') {
        return (
            <Tooltip
                title={errorText}
                placement="top"
                disableInteractive
            >
                <Stack
                    direction="row"
                    width="max-content"
                    alignItems="center"
                    gap={2}
                    borderRadius={1}
                    sx={{
                        backgroundColor: (theme) => theme.palette.utility.foreground.error.tertiary,
                        padding        : '2px 6px',
                        svg            : {
                            fill  : (theme) => theme.palette.utility.foreground.error.primary,
                            width : '20px',
                            height: '20px'
                        }
                    }}
                >
                    <ErrorIcon />
                    <Typography
                        textTransform="capitalize"
                        fontWeight={600}
                        sx={{
                            color: (theme) => theme.palette.utility.foreground.error.primary
                        }}
                    >
                        {t('common:state.failed')}
                    </Typography>
                </Stack>
            </Tooltip>
        );
    }
    return (
        <Stack
            direction="row"
            width="max-content"
            alignItems="center"
            gap={2}
            borderRadius={1}
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.foreground.brand.tertiary,
                padding        : '2px 6px',
                svg            : {
                    fill: (theme) => theme.palette.semantic.foreground.brand.primary
                }
            }}
        >
            <CircularProgress
                size="12px"
                sx={{
                    width : '12px',
                    height: '12px',
                    color : (theme) => theme.palette.semantic.foreground.brand.primary
                }}
            />
            <Typography
                textTransform="capitalize"
                fontWeight={600}
                sx={{
                    color: (theme) => theme.palette.semantic.foreground.brand.primary
                }}
            >
                {t('common:state.pending')}
            </Typography>
        </Stack>
    );
}
