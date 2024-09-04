import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import { DriverTypeCreateRequest_DriverType } from '@proto/driver_type';
import DriverTypeFields from './Fields';
import { schema } from './config';

export const useEditDriverType = hookFabric(EditDriverType, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="750px"
        {...props}
    />
));

type Props = {
    driverType: DriverTypeModel;
};

export default function EditDriverType({ driverType }: Props) {
    const [editDriverType, { isLoading }] = DriverTypesGrpcService.useUpdateDriverTypeMutation();
    const dialog = useEditDriverType(true);

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<DriverTypeCreateRequest_DriverType>({
        defaultValues: {
            icon                          : driverType.icon,
            isDefault                     : driverType.isDefault,
            name                          : driverType.name,
            permissionBankAccounts        : driverType.permissions?.bank?.bankAccounts,
            permissionCompletedLoads      : driverType.permissions?.loads?.completedLoads,
            permissionLoadsDistance       : driverType.permissions?.loads?.distance,
            permissionLoadsDriverPayAmount: driverType.permissions?.loads?.driverPayAmount,
            permissionLoadsTotalAmount    : driverType.permissions?.loads?.totalAmount,
            permissionSettlements         : driverType.permissions?.settlements?.settlements,
            permissionSettlementViewLoads : driverType.permissions?.settlements?.viewLoads,
            permissionSettlementViewLoadTotalAmount:
                driverType.permissions?.settlements?.viewLoadTotalAmount,
            permissionSettlementViewLoadsPayAmount:
                driverType.permissions?.settlements?.viewLoadsPayAmount,
            permissionSettlementViewLoadsDistance:
                driverType.permissions?.settlements?.viewLoadsDistance,
            permissionSettlementViewFuel      : driverType.permissions?.settlements?.viewFuel,
            permissionSettlementViewTolls     : driverType.permissions?.settlements?.viewTolls,
            permissionSettlementViewCompanyFee: driverType.permissions?.settlements?.viewCompanyFee,
            permissionSettlementViewDebits    : driverType.permissions?.settlements?.viewDebits,
            permissionSettlementViewCredits   : driverType.permissions?.settlements?.viewCredits,
            permissionAppTakeScreenshots      : driverType.permissions?.app?.takeScreenshots,
            permissionOrderCommodityUpdate    : driverType.permissions?.app?.updateOrderCommodity,
            permissionTruckSelfAssign         : driverType.permissions?.app?.truckSelfAssign,
            permissionTrailerSelfAssign       : driverType.permissions?.app?.trailerSelfAssign
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (body: DriverTypeCreateRequest_DriverType) => {
        editDriverType({
            driverType: {
                driverTypeId: driverType.driverTypeId,
                name        : body.name,
                icon        : body.icon,
                isDefault   : body.isDefault,
                permissions : {
                    settlements: {
                        settlements        : body.permissionSettlements,
                        viewLoads          : body.permissionSettlementViewLoads,
                        viewLoadTotalAmount: body.permissionSettlementViewLoadTotalAmount,
                        viewLoadsPayAmount : body.permissionSettlementViewLoadsPayAmount,
                        viewLoadsDistance  : body.permissionSettlementViewLoadsDistance,
                        viewFuel           : body.permissionSettlementViewFuel,
                        viewTolls          : body.permissionSettlementViewTolls,
                        viewCompanyFee     : body.permissionSettlementViewCompanyFee,
                        viewDebits         : body.permissionSettlementViewDebits,
                        viewCredits        : body.permissionSettlementViewCredits
                    },
                    loads: {
                        completedLoads : body.permissionCompletedLoads,
                        totalAmount    : body.permissionLoadsTotalAmount,
                        driverPayAmount: body.permissionLoadsDriverPayAmount,
                        distance       : body.permissionLoadsDistance
                    },
                    bank: {
                        bankAccounts: body.permissionBankAccounts
                    },
                    app: {
                        takeScreenshots     : body.permissionAppTakeScreenshots,
                        updateOrderCommodity: body.permissionOrderCommodityUpdate,
                        truckSelfAssign     : body.permissionTruckSelfAssign,
                        trailerSelfAssign   : body.permissionTrailerSelfAssign
                    }
                }
            }
        }).unwrap();
        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(onSubmit)}>
            <DriverTypeFields
                control={control}
                errors={errors}
                title="modals:settings.driver_types.update.header.title"
            />
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    type="update"
                    disabled={isLoading || !isDirty}
                    loading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}
