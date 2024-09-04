import React from 'react';
import { Button } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useMainUsers } from '@/@grpcServices/services/users-service/hooks';
import { useAddUserDialog } from '@/views/settings/tabs/Members/dialogs/UserDialog/AddUserDialog';
import SearchField from '@/@core/components/search/search-field/SearchField';
import Header from '@/views/settings/components/Header/SettingsHeader';
import SettingIcons from '@/views/settings/icons/icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useInviteUserDialog } from '../../dialogs/InviteUserDialog';

export default function MembersHeader() {
    const { t } = useAppTranslation();
    const userAddDialog = useAddUserDialog();

    const inviteUserDialog = useInviteUserDialog();

    const {
        filter_id,
        isLoading
    } = useMainUsers();

    const openAddUserDialog = () => {
        userAddDialog.open({});
    };

    const openInviteDialog = () => {
        inviteUserDialog.open({});
    };

    return (
        <Header
            title="settings:navigation.organization.members"
            icon={<SettingIcons.Members />}
            onClick={openAddUserDialog}
            children_left_side={(
                <SearchField
                    filter_id={filter_id}
                    isLoading={isLoading}
                    format_query_parameters={false}
                    highlight_text_in_table={false}
                />
            )}
        >
            <Button
                variant="contained"
                color="primary"
                startIcon={<AccountCircleOutlinedIcon />}
                onClick={openInviteDialog}
            >
                {t('common:button.invite')}
            </Button>
        </Header>
    );
}
