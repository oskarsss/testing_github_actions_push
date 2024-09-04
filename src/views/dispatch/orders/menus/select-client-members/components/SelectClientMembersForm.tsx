import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import compareStates from '@/utils/compareArrayStates';
import MenuComponents from '@/@core/ui-kits/menus';
import SelectClientMembersHeader from '@/views/dispatch/orders/menus/select-client-members/components/SelectClientMembersHeader';
import { Stack } from '@mui/material';
import ClientMembersSelect, {
    Option
} from '@/@core/fields/select/client-members-select/ClientMembersSelect';

type DefaultValues = {
    members: string[];
};

type Props = {
    assignedMembers?: string[];
    assignedMembersLoading?: boolean;
    clientName: string;
    orderFriendlyId: string;
    onCloseMenu: () => void;
    onAddNewMember: (searchValue: string) => void;
    assignUsersToOrder: (userIds: string[]) => Promise<void>;
    removeUsersFromOrder: (userIds: string[]) => Promise<void>;
    loading: boolean;
    users: Option[];
};

export default function SelectClientMembersForm({
    assignedMembers,
    assignedMembersLoading,
    orderFriendlyId,
    clientName,
    onCloseMenu,
    onAddNewMember,
    assignUsersToOrder,
    removeUsersFromOrder,
    loading,
    users
}: Props) {
    const { t } = useAppTranslation();

    const {
        control,
        formState: {
            errors,
            isDirty
        },
        handleSubmit
    } = useForm<DefaultValues>({
        defaultValues: {
            members: []
        },
        values: assignedMembers
            ? {
                members: assignedMembers
            }
            : undefined
    });

    const onSubmit = async (data: DefaultValues) => {
        if (!assignedMembers) return;
        const toastLoadingId = toast.loading(t('modals:loads.client_members.toast.loading'), {
            position: 'top-right'
        });
        const {
            add,
            remove
        } = compareStates(assignedMembers, data.members);

        try {
            if (add.length) {
                await assignUsersToOrder(add);
            }

            if (remove.length) {
                await removeUsersFromOrder(remove);
            }

            toast.success(t('modals:loads.client_members.toast.success'), {
                position: 'top-right'
            });
            onCloseMenu();
        } catch (error: any) {
            toast.error(error?.error || '', { position: 'top-right' });
        }

        toast.dismiss(toastLoadingId);
    };

    return (
        <MenuComponents.Form
            width="620px"
            onSubmit={handleSubmit(onSubmit)}
        >
            <SelectClientMembersHeader
                clientName={clientName}
                orderFriendlyId={orderFriendlyId}
            />
            <Stack marginY="16px">
                <ClientMembersSelect
                    control={control}
                    errors={errors}
                    name="members"
                    label="entity:members"
                    options={users}
                    onAddNewUser={onAddNewMember}
                    loading={assignedMembersLoading}
                />
            </Stack>
            <MenuComponents.ActionsWrapper>
                <MenuComponents.CancelButton onCancel={onCloseMenu} />
                <MenuComponents.SubmitButton
                    type="update"
                    loading={loading}
                    disabled={!isDirty}
                />
            </MenuComponents.ActionsWrapper>
        </MenuComponents.Form>
    );
}
