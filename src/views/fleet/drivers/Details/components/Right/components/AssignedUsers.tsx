import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Fade } from '@mui/material';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import AddIcon from '@mui/icons-material/Add';
import { memo } from 'react';
import { useAssignUsersDialog } from '@/views/fleet/drivers/Details/dialogs/AssignUser/AssignUser';
import DriversTypes from '@/store/fleet/drivers/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { applyTestId } from '@/configs/tests';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { GetUsersReply_User } from '@proto/users';
import User from './User/User';

type Props = {
    id: string;
    type?: string;
    users: GetUsersReply_User[];
    disabledAssign?: boolean;
    onRemove: (config: { id: string; user_id: string }) => Promise<unknown>;
    testOptions?: Record<string, string | undefined>;
};

const AssignedUser = ({
    type,
    id,
    users,
    onRemove,
    disabledAssign,
    testOptions = {
        assignTestId : '',
        confirmTestId: '',
        userTestId   : ''
    }
}: Props) => {
    const { t } = useAppTranslation();
    const userAssignDialog = useAssignUsersDialog();

    const openAssignUserDialog = () =>
        userAssignDialog.open({
            id,
            data          : users,
            confirmTestId : testOptions.confirmTestId,
            userTestId    : testOptions.userTestId,
            isDriverEntity: type === 'driver'
        });

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('common:profile.right.assigned_users.title')}</Typography>

                <Button
                    onClick={openAssignUserDialog}
                    startIcon={<AddIcon />}
                    disabled={disabledAssign}
                    {...applyTestId(testOptions.assignTestId)}
                >
                    {t('common:button.assign')}
                </Button>
            </Box>

            {users && users.length > 0 ? (
                users.map((user) => (
                    <Fade
                        in
                        key={user.userId}
                    >
                        <div>
                            <User
                                type={type}
                                id={id}
                                user_id={user.userId}
                                onRemove={onRemove}
                            />
                        </div>
                    </Fade>
                ))
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('common:profile.right.assigned_users.no_users')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(AssignedUser);
