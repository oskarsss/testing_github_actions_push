import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useStableArray } from '@/hooks/useStable';
import { Stack, Typography, Button } from '@mui/material';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { GetBrokerUsersReply_User } from '@proto/brokers';
import { useAddBrokerMemberDialog } from './modals/AddBrokerMember';
import MembersTable from './table';
import { useInviteBrokerMemberDialog } from './modals/InviteBrokerMember';

type Props = {
    brokerId: string;
    members: GetBrokerUsersReply_User[];
};

export default function Members({
    brokerId,
    members
}: Props) {
    const { t } = useAppTranslation();

    // const members = useStableArray(data?.users);

    const addDialog = useAddBrokerMemberDialog();

    const inviteUserDialog = useInviteBrokerMemberDialog();

    const handleOpenAddDialog = () => {
        addDialog.open({
            brokerId
        });
    };

    const handleOpenInviteDialog = () => {
        inviteUserDialog.open({
            brokerId
        });
    };

    return (
        <Stack
            sx={{
                padding: '20px',
                gap    : '20px'
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    gap="5px"
                    alignItems="center"
                >
                    <PeopleIcon color="primary" />

                    <Typography
                        fontSize="18px"
                        fontWeight={700}
                        color="semantic.text.primary"
                    >
                        {t('common:profile.center.title.members')}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    gap={2}
                >
                    <Button
                        startIcon={<AccountCircleOutlinedIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenInviteDialog}
                    >
                        Invite
                    </Button>
                    <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenAddDialog}
                    >
                        Add
                    </Button>
                </Stack>
            </Stack>
            <MembersTable
                brokerId={brokerId}
                members={members}
            />
        </Stack>
    );
}
