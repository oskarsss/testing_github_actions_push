import { memo, type CSSProperties } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ERROR_SCREEN_CONFIG, {
    type ErrorScreenType
} from '@/@core/ui-kits/error-screen/error-screen-config';
import ERROR_SCREEN_ICONS from '@/@core/ui-kits/error-screen/error-screen-icons';

type Props = {
    configType: ErrorScreenType;
    onClick?: () => void;
    styles?: CSSProperties;
    withoutBorder?: boolean;
    withoutBackground?: boolean;
};

function ErrorScreen({
    configType,
    onClick,
    styles = {},
    withoutBorder = false,
    withoutBackground = false
}: Props) {
    const { t } = useAppTranslation();

    const config = ERROR_SCREEN_CONFIG[configType];

    const defaultBorderStyles = withoutBorder
        ? {}
        : {
            border     : '1px solid',
            borderColor: 'semantic.border.secondary'
        };

    return (
        <Stack
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            bgcolor={withoutBackground ? undefined : 'semantic.background.secondary'}
        >
            <Stack
                borderRadius="12px"
                bgcolor={withoutBackground ? undefined : 'semantic.foreground.white.tertiary'}
                gap="32px"
                width="630px"
                position="relative"
                padding="60px"
                sx={{ ...defaultBorderStyles, ...styles }}
            >
                <Stack
                    gap="24px"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                >
                    <ERROR_SCREEN_ICONS.SquaresBackgroundIcon />

                    {config.Icon}

                    <Stack
                        gap="8px"
                        textAlign="center"
                        width="440px"
                        margin="0 auto"
                        zIndex={1}
                        alignItems="center"
                    >
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize="20px"
                        >
                            {t(config.header)}
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={500}
                            color="semantic.text.secondary"
                            width="400px"
                        >
                            {t(config.title)}
                        </Typography>
                    </Stack>
                </Stack>

                {onClick && (
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={config.buttonIcon}
                        onClick={onClick}
                        sx={{
                            height                : '54px',
                            fontSize              : '18px',
                            width                 : 'fit-content',
                            margin                : '0 auto',
                            borderRadius          : '12px',
                            '.MuiButton-startIcon': {
                                marginRight: '4px'
                            }
                        }}
                        aria-label="Error Button"
                    >
                        {t(config.subTitle)}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}

export default memo(ErrorScreen);
