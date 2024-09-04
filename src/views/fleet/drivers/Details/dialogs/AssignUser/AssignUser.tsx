import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DispatcherSelect from '@/@core/fields/select/dispatcher-select/DispatcherSelect';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import DriversTypes from '@/store/fleet/drivers/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { GetUsersReply_User } from '@proto/users';

type Data = {
    user_id: string;
};

const schema: yup.ObjectSchema<Data> = yup.object().shape({
    user_id: yup.string().required()
});

const default_values: Data = {
    user_id: ''
};

type Props = {
    id: string;
    data: GetUsersReply_User[];
    isDriverEntity: boolean;
    userTestId?: string;
    confirmTestId?: string;
};

export const useAssignUsersDialog = hookFabric(AssignUser, DialogComponents.DialogWrapper);

export default function AssignUser({
    id,
    data,
    userTestId,
    confirmTestId,
    isDriverEntity
}: Props) {
    const { t } = useAppTranslation();
    const userAssignDialog = useAssignUsersDialog();
    const [assignUserToTruck] = TrucksGrpcService.useAssignUserToTruckMutation();
    const [assignUserToDriver] = DriversGrpcService.useAssignUserToDriverMutation();

    const {
        reset,
        handleSubmit,
        control,
        formState: {
            isDirty,
            isSubmitSuccessful
        }
    } = useForm<Data>({
        defaultValues: default_values,
        resolver     : yupResolver(schema)
    });

    const handleClose = () => {
        reset();
        userAssignDialog.close();
    };

    const create: SubmitHandler<Data> = (data) => {
        if (isDriverEntity) {
            assignUserToDriver({
                driverId: id,
                userId  : data.user_id
            }).unwrap();
            handleClose();
            return;
        }
        assignUserToTruck({
            truckId: id,
            userId : data.user_id
        }).unwrap();
        handleClose();
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(create)}>
            <DialogComponents.Header
                textVariant="h5"
                title="common:profile.right.assigned_users.dialog.assign.header.title"
            />

            <DialogComponents.Field xs={12}>
                <DispatcherSelect
                    control={control}
                    name="user_id"
                    label="common:profile.right.assigned_users.dialog.assign.fields.user_id.label"
                    assigned_user={data}
                    autoFocus
                    testID={userTestId}
                />
            </DialogComponents.Field>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.SubmitButton
                    loading={isSubmitSuccessful}
                    text="common:button.confirm"
                    disabled={!isDirty}
                    testID={confirmTestId}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
