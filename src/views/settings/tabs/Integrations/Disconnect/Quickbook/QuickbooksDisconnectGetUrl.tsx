import { CircularProgress, Stack, Typography } from '@mui/material';
import { renderError } from '@/utils/render-error';
import React, { useEffect } from 'react';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    realmId: string;
};

export default function QuickbooksDisconnectGetUrl({ realmId }: Props) {
    const { t } = useAppTranslation();
    const router = useRouter();
    const [getDisconnectOAuthURL, {
        isLoading,
        isError,
        isSuccess,
        error
    }] =
        IntegrationQuickbooksGrpcService.useQuickbooksGetDisconnectOAuthURLMutation();

    useEffect(() => {
        getDisconnectOAuthURL({
            development: false,
            realmId
        })
            .unwrap()
            .then((res) => {
                router.push(res.url);
            });
    }, [realmId]);

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
                {t('settings:integrations.disconnect.quickbooks.get_url.error')}
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
                {t('settings:integrations.disconnect.quickbooks.get_url.success')}
            </Stack>
        );
    }

    return null;
}
