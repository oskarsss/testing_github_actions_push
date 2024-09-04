import trucksAvailabilityService from '@/@grpcServices/services/trucks-availability.service';
import { Typography } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCapListDialog } from '.';

type Props = {
    token: string;
};

export default function RevokeLink({ token }: Props) {
    const [revokeTrigger] = trucksAvailabilityService.useRevokeCapListShareLinkMutation();
    const dialog = useCapListDialog(true);
    const { t } = useAppTranslation('common');
    const revoke = () => {
        revokeTrigger({ token }).then(dialog.close);
    };
    return (
        <Typography
            variant="body1"
            color="text.secondary"
            fontSize="14px"
            fontWeight={500}
            lineHeight="20px"
            onClick={revoke}
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
