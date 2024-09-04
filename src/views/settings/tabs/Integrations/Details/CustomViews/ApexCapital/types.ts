import LoadsTypes from '@/store/dispatch/loads/types';
import { EquipmentTypeModel } from '@proto/models/model_equipment_type';

export interface InvoiceTabData extends LoadsTypes.InvoiceItemCategory {
    apex_capital_id: string;
    apex_capital_name: string;
}

export interface EquipmentTabData extends EquipmentTypeModel {
    apex_capital_id: string;
    apex_capital_name: string;
}
