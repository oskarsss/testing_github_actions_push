import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack, Typography, Button } from '@mui/material';
import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { GetCustomerUsersReply_User } from '@proto/customers';
import { useAddCustomerMemberDialog } from './modals/AddCustomerMember';
import MembersTable from './table';
import { useInviteCustomerMemberDialog } from './modals/InviteCustomerMember';

type Props = {
    customerId: string;
    members: GetCustomerUsersReply_User[];
};

export default function Members({
    customerId,
    members
}: Props) {
    const { t } = useAppTranslation();

    const addDialog = useAddCustomerMemberDialog();

    const inviteUserDialog = useInviteCustomerMemberDialog();

    const handleOpenAddDialog = () => {
        addDialog.open({
            customerId
        });
    };

    const handleOpenInviteDialog = () => {
        inviteUserDialog.open({
            customerId
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
                customerId={customerId}
                members={members}
            />
        </Stack>
    );
}
