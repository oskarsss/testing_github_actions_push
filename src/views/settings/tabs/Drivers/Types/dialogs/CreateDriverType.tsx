import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import { DriverTypeCreateRequest_DriverType } from '@proto/driver_type';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import DriverTypeFields from './Fields';
import { schema } from './config';

export const useCreateDriverType = hookFabric(CreateDriverType, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="750px"
        {...props}
    />
));

type Props = {
    onSuccessCreate?: (driverTypeId: string) => void;
};

export default function CreateDriverType({ onSuccessCreate }: Props) {
    const [createDriverType, { isLoading }] = DriverTypesGrpcService.useCreateDriverTypeMutation();
    const dialog = useCreateDriverType(true);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        },
        watch
    } = useForm<DriverTypeCreateRequest_DriverType>({
        defaultValues: {
            name                                   : '',
            icon                                   : DriverTypeModel_Icon.DEFAULT,
            isDefault                              : false,
            permissionSettlements                  : false,
            permissionBankAccounts                 : false,
            permissionCompletedLoads               : false,
            permissionLoadsTotalAmount             : false,
            permissionLoadsDriverPayAmount         : false,
            permissionLoadsDistance                : false,
            permissionSettlementViewLoads          : false,
            permissionSettlementViewLoadTotalAmount: false,
            permissionSettlementViewLoadsPayAmount : false,
            permissionSettlementViewLoadsDistance  : false,
            permissionSettlementViewFuel           : false,
            permissionSettlementViewTolls          : false,
            permissionSettlementViewCompanyFee     : false,
            permissionSettlementViewDebits         : false,
            permissionSettlementViewCredits        : false,
            permissionAppTakeScreenshots           : false,
            permissionOrderCommodityUpdate         : false,
            permissionTruckSelfAssign              : false,
            permissionTrailerSelfAssign            : false
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (body: DriverTypeCreateRequest_DriverType) => {
        createDriverType({ driverType: body })
            .unwrap()
            .then((res) => {
                onSuccessCreate?.(res.driverTypeId);
                dialog.close();
            });
    };

    const isRequiredFieldsEmpty = watch(['name', 'icon']).some((value) => !value);

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DriverTypeFields
                control={control}
                errors={errors}
                title="modals:settings.driver_types.create.header.title"
            />

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    type="create"
                    loading={isLoading}
                    disabled={!isDirty || isLoading || isRequiredFieldsEmpty}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
