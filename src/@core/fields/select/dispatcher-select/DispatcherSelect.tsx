import { useMemo } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';
import DriversTypes from '@/store/fleet/drivers/types';
import CustomAutocomplete, { Option } from '@/@core/fields/select/components/CustomAutocomplete';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import createMap from '@/utils/create-map';
import { UserModel_Status } from '@proto/models/model_user';
import DispatcherAvatar from '@/@core/fields/select/dispatcher-select/DispatcherAvatar';
import { IntlMessageKey } from '@/@types/next-intl';
import { GetUsersReply_User } from '@proto/users';

interface Props<TFieldsValues extends FieldValues = FieldValues> {
    control: Control<TFieldsValues>;
    assigned_user?: GetUsersReply_User[];
    required?: boolean;
    name: Path<TFieldsValues>;
    label: IntlMessageKey;
    autoFocus?: boolean;
    testID?: string;
    optionTestId?: string;
}

export default function DispatcherSelect<TFieldsValues extends FieldValues = FieldValues>({
    control,
    assigned_user = [],
    required = false,
    name,
    label,
    autoFocus = false,
    testID = '',
    optionTestId = ''
}: Props<TFieldsValues>) {
    const { t } = useAppTranslation();
    const { users } = useAllUsers();

    const users_options = useMemo(
        () =>
            users
                .filter((user) => user.status === UserModel_Status.ACTIVE)
                .reduce((acc: Option[], user) => {
                    if (!assigned_user?.some((select_user) => user.userId === select_user.userId)) {
                        acc.push({
                            id    : user.userId,
                            name  : `${user.firstName} ${user.lastName}`,
                            marker: <DispatcherAvatar user={user} />
                        });
                    }

                    return acc;
                }, []),
        [users, assigned_user]
    );

    const users_by_id = useMemo(() => createMap(users_options, 'id'), [users_options]);

    return (
        <CustomAutocomplete
            autoFocus={autoFocus}
            required={required}
            control={control}
            name={name}
            label={label}
            options={users_options}
            entities_by_id={users_by_id}
            testOptions={{
                inputTestID: testID,
                optionTestId
            }}
        />
    );
}
