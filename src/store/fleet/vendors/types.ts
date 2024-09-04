import type TableTypes from '@/@core/components/table/types';
import { VendorModel_Vendor } from '@proto/models/model_vendor';

/** Vendors */
namespace VendorsTypes {
    export type VendorType = 'company' | 'individual' | '';
    export interface VendorRow extends TableTypes.Row, Omit<VendorModel_Vendor, 'type'> {
        type: VendorType;
    }
}

export default VendorsTypes;
