import { useDriversTypes } from '@/store/fleet/drivers/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';

type DriverTypeProps = {
    driver_types_arr: string[];
};

export default function RenderDriverType({ driver_types_arr }: DriverTypeProps) {
    const { driverTypes } = useDriversTypes();
    const { t } = useAppTranslation();

    const driversMap = useDriverTypesMap();

    const printDriverTypes = () => {
        if (!driverTypes.length) return '';
        const updatedArr = driver_types_arr.map((type) => driversMap[type]?.name).filter(Boolean);
        const isAll = driverTypes.every((type) => driver_types_arr.includes(type.driverTypeId));

        if (isAll) {
            return t('common:all');
        }
        if (updatedArr.length > 0) {
            return updatedArr.join(', ');
        }
        return '';
    };

    return <div>{printDriverTypes()}</div>;
}
