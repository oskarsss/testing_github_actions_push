import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { renderError } from '@/utils/render-error';
import { AUTHORIZED_USER } from '@/store/auth/api';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    code: string;
    state: string;
};

export default function QuickbooksDisconnectByCode({
    code,
    state
}: Props) {
    const { t } = useAppTranslation('settings');
    const [disconnectQuickbooks, {
        isLoading,
        isError,
        isSuccess,
        error
    }] =
        IntegrationQuickbooksGrpcService.useQuickbooksDisconnectByCodeMutation();

    useEffect(() => {
        disconnectQuickbooks({
            code,
            state,
            development: false
        })
            .unwrap()
            .then((res) => {
                localStorage.setItem(AUTHORIZED_USER.ID_TOKEN, res.token);
                localStorage.setItem(AUTHORIZED_USER.COMPANY_ID, res.companyId);
                window.location.href = `${window.location.origin}/settings/integrations/`;
            });
    }, [code, state]);

    if (isLoading) {
        return <CircularProgress />;
    }
    if (isError) {
        return (
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center'
                }}
            >
                {t('integrations.disconnect.quickbooks.by_code.error')}
                {error && (
                    <Typography
                        fontSize="12px"
                        color="secondary"
                    >
                        {renderError(error)}
                    </Typography>
                )}
            </Typography>
        );
    }

    if (isSuccess) {
        return (
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="10px"
            >
                {t('integrations.disconnect.quickbooks.by_code.success')}
            </Stack>
        );
    }

    return null;
}
