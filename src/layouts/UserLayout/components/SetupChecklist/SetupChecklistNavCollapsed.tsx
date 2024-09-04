import { Fade, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    percentage: number;
};

export default function SetupChecklistNavCollapsed({ percentage }: Props) {
    const { t } = useAppTranslation();
    return (
        <Fade in>
            <Stack
                gap="4px"
                overflow="hidden"
                width="100%"
            >
                <Typography
                    color="inherit"
                    fontSize="14px"
                    fontWeight={600}
                    lineHeight={1.42}
                    noWrap
                >
                    {t('navigation:widgets.onboarding.title')}
                </Typography>
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="6px"
                    width="100%"
                >
                    <LinearProgress
                        value={percentage}
                        variant="determinate"
                        sx={{
                            width          : '100%',
                            borderRadius   : '3px',
                            height         : '6px',
                            backgroundColor: (theme) =>
                                theme.palette.semantic.foreground.brand.tertiary,

                            '.MuiLinearProgress-bar': {
                                borderRadius   : 'inherit',
                                backgroundColor: (theme) =>
                                    theme.palette.semantic.text.brand.primary
                            }
                        }}
                    />
                    <Typography
                        color="inherit"
                        fontSize="12px"
                        fontWeight={500}
                        lineHeight={1.4}
                    >
                        {`${percentage}%`}
                    </Typography>
                </Stack>
            </Stack>
        </Fade>
    );
}
