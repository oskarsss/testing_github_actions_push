import { Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onRevoke: () => void;
};

export default function ShareLinkRevoke({ onRevoke }: Props) {
    const { t } = useAppTranslation('common');

    return (
        <Typography
            variant="body1"
            color="text.secondary"
            fontSize="14px"
            fontWeight={500}
            lineHeight="20px"
            onClick={onRevoke}
            sx={{
                cursor    : 'pointer',
                width     : 'fit-content',
                transition: 'color 0.2s',

                '&:hover': {
                    color: (theme) => theme.palette.semantic.foreground.brand.primary
                }
            }}
        >
            {t('button.revoke_link')}
        </Typography>
    );
}
