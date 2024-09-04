import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Typography } from '@mui/material';

const LoadIdCell = ({ friendlyId }: { friendlyId: string }) => {
    const { t } = useAppTranslation();
    return (
        <div
            style={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                flex          : 1,
                height        : '100%',
                paddingLeft   : '6px',
                paddingRight  : '4px'
            }}
        >
            <Typography
                fontWeight={400}
                fontSize="14px"
                sx={{
                    color: (theme) => theme.palette.semantic.text.brand.primary
                }}
            >
                {t('common:loads.friendlyId', { friendlyId })}
            </Typography>
        </div>
    );
};

export default LoadIdCell;
