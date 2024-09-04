import { Stack, Button } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { InviteRetrieveReply } from '@proto/auth';
import SYSTEM from '@/@system';
import { authGrpcApi } from '@/@grpcServices/services/auth.service';
import NewPasswordPageStyled from '../../forgot-password/NewPasswordPage/styled';

type Props = {
    data: InviteRetrieveReply;
    token: string;
};

export default function RegisteredUserJoin({
    data,
    token
}: Props) {
    const [accept, acceptState] = authGrpcApi.useInviteAcceptMutation();
    const [decline, declineState] = authGrpcApi.useInviteAcceptMutation();

    const acceptHandler = async () => {
        // const response = await accept({ }).unwrap();
        // if (!response) return;
        // window.localStorage.setItem(AUTHORIZED_USER.COMPANY_ID, response.companyId);
        // window.localStorage.setItem(AUTHORIZED_USER.ID_TOKEN, response.token);
        // setCookie(AUTHORIZED_USER.ID_TOKEN, response.companyId);
        // window.location.replace('/');
    };

    // const declineHandler = async () => {
    //     await decline({ token }).unwrap();
    // };

    const { t } = useAppTranslation();
    return (
        <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="space-between"
            flex="1 1 100%"
        >
            <Stack
                direction="column"
                width="100%"
            >
                <NewPasswordPageStyled.Title>
                    <span>{data.companyName}</span>{' '}
                    {t('auth:join.header.title', { name: SYSTEM.TMS_FRIENDLY_NAME })}
                </NewPasswordPageStyled.Title>
            </Stack>
            <Stack
                direction="row"
                width="100%"
                gap={10}
            >
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                >
                    {t('auth:join.buttons.decline')}
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    {t('auth:join.buttons.accept')}
                </Button>
            </Stack>
        </Stack>
    );
}
