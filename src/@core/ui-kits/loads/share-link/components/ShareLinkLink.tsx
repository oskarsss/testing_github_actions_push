import { Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    link: string;
};

export default function ShareLinkLink({ link }: Props) {
    const [isCopied, setIsCopied] = useState(false);
    const { t } = useAppTranslation('common');
    const clickHandler = () => {
        try {
            navigator.clipboard.writeText(link).then(() => {
                setIsCopied(true);
            });
        } catch (e) {
            console.debug(e);
        }
    };

    return (
        <Tooltip
            title={t(isCopied ? 'copy.copied' : 'copy.tooltip')}
            disableInteractive
            placement="top"
        >
            <Stack
                onMouseLeave={() => setTimeout(() => setIsCopied(false), 200)}
                onClick={clickHandler}
                flexDirection="row"
                justifyContent="space-between"
                gap="10px"
                marginBottom="10px"
                borderRadius="10px"
                padding="9px 14px"
                sx={{
                    cursor   : 'pointer',
                    border   : (theme) => `1px solid ${theme.palette.semantic.border.secondary}`,
                    '&:hover': {
                        '.MuiTypography-root': {
                            background: 'rgba(150, 198, 255, 0.5)'
                        }
                    }
                }}
            >
                <Typography
                    variant="body1"
                    color="text.secondary"
                    noWrap
                >
                    {link}
                </Typography>
            </Stack>
        </Tooltip>
    );
}
