import * as yup from 'yup';
import { DriverTypeCreateRequest_DriverType } from '@proto/driver_type';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';

export const schema: yup.ObjectSchema<DriverTypeCreateRequest_DriverType> = yup.object().shape({
    name                                   : yup.string().required('Name is required'),
    icon                                   : yup.number<DriverTypeModel_Icon>().required('Icon is required'),
    isDefault                              : yup.boolean().required(),
    permissionSettlements                  : yup.boolean().required(),
    permissionBankAccounts                 : yup.boolean().required(),
    permissionCompletedLoads               : yup.boolean().required(),
    permissionLoadsTotalAmount             : yup.boolean().required(),
    permissionLoadsDriverPayAmount         : yup.boolean().required(),
    permissionLoadsDistance                : yup.boolean().required(),
    permissionSettlementViewLoads          : yup.boolean().required(),
    permissionSettlementViewLoadTotalAmount: yup.boolean().required(),
    permissionSettlementViewLoadsPayAmount : yup.boolean().required(),
    permissionSettlementViewLoadsDistance  : yup.boolean().required(),
    permissionSettlementViewFuel           : yup.boolean().required(),
    permissionSettlementViewTolls          : yup.boolean().required(),
    permissionSettlementViewCompanyFee     : yup.boolean().required(),
    permissionSettlementViewDebits         : yup.boolean().required(),
    permissionSettlementViewCredits        : yup.boolean().required(),
    permissionAppTakeScreenshots           : yup.boolean().required(),
    permissionOrderCommodityUpdate         : yup.boolean().required(),
    permissionTruckSelfAssign              : yup.boolean().required(),
    permissionTrailerSelfAssign            : yup.boolean().required()
});
