import { useAllMainRoles } from '@/store/settings/roles/hooks';

type Props = {
    role_id: string;
};

export default function MembersRoleCell({ role_id }: Props) {
    const { roles } = useAllMainRoles(false);

    const selected_role = roles.find((role) => role.roleId === role_id);
    return selected_role?.name || '';
}
