import * as yup from 'yup';

import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { UpdateUserRequest } from '@proto/users';
import { UserModel_Invite_Status, UserModel_Status } from '@proto/models/model_user';
import { UserInviteStatus, UserStatus } from '@/models/users/users';
import type { TFunction } from '@/@types/next-intl';

export const UserInviteStatusGrpcEnumMap: Record<UserModel_Invite_Status, UserInviteStatus> = {
    [UserModel_Invite_Status.UNSPECIFIED]: 'accepted',
    [UserModel_Invite_Status.ACTIVE]     : 'active',
    [UserModel_Invite_Status.ACCEPTED]   : 'accepted',
    [UserModel_Invite_Status.DELETED]    : 'deleted'
};

export const UserStatusGrpcEnumMap: Record<UserModel_Status, UserStatus> = {
    [UserModel_Status.UNSPECIFIED]: 'disabled',
    [UserModel_Status.INVITED]    : 'invited',
    [UserModel_Status.ACTIVE]     : 'active',
    [UserModel_Status.DISABLED]   : 'disabled',
    [UserModel_Status.DELETED]    : 'deleted'
} as const;

export const schema: yup.ObjectSchema<UpdateUserRequest> = yup.object().shape({
    userId                : yup.string().defined(),
    firstName             : yup.string().required('First Name is required'),
    lastName              : yup.string().defined(),
    title                 : yup.string().defined(),
    phone                 : PhoneNumberValidation(true),
    email                 : EmailValidation(true),
    roleId                : yup.string().required('Role is required'),
    password              : yup.string().defined(),
    status                : yup.number<UserModel_Status>().required('Status is required'),
    passwordChangeRequired: yup.boolean().defined(),
    secondStepAuthEnabled : yup.boolean().defined()
});
export const defaultValues: UpdateUserRequest = {
    userId                : '',
    firstName             : '',
    lastName              : '',
    phone                 : '',
    email                 : '',
    password              : '',
    roleId                : '',
    status                : 2,
    passwordChangeRequired: false,
    secondStepAuthEnabled : false,
    title                 : ''
};
export const statuses = (t: TFunction): { label: string; value: UserModel_Status }[] => [
    {
        label: t('state_info:user.status.invited'),
        value: 1
    },
    {
        label: t('state_info:user.status.active'),
        value: 2
    },
    {
        label: t('state_info:user.status.disabled'),
        value: 3
    }
];

export const valuesFormation = (user: UpdateUserRequest) => ({
    userId                : user.userId,
    email                 : user.email,
    firstName             : user.firstName,
    lastName              : user.lastName,
    passwordChangeRequired: user.passwordChangeRequired,
    phone                 : user.phone,
    roleId                : user.roleId,
    secondStepAuthEnabled : user.secondStepAuthEnabled,
    status                : user.status,
    title                 : user.title || '',
    password              : user.password || ''
});
