import type { TFunction } from '@/@types/next-intl';
import { VendorModel_Type } from '@proto/models/model_vendor';

export default function vendor_type_options(
    t: TFunction
): { value: VendorModel_Type; label: string }[] {
    return [
        {
            value: VendorModel_Type.COMPANY,
            label: t('state_info:vendors.type.company')
        },
        {
            value: VendorModel_Type.INDIVIDUAL,
            label: t('state_info:vendors.type.individual')
        }
    ];
}
