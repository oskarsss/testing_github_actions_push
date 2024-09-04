import type { CommodityModel } from '@proto/models/model_commodity';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { memo } from 'react';
import { COMMODITY_MEASUREMENT_SHORT_NAME } from '../config';

type Props = {
    row: CommodityModel;
};

function Dimensions({ row }: Props) {
    const { t } = useAppTranslation();

    const commodityMeasurementShortName = t(COMMODITY_MEASUREMENT_SHORT_NAME[row.measurementUnit]);
    const width = row.width
        ? `${row.width}${commodityMeasurementShortName} ${t('common:dimensions.short_name.width')}`
        : '-';

    const height = row.height
        ? `${row.height}${commodityMeasurementShortName} ${t(
            'common:dimensions.short_name.height'
        )}`
        : '-';

    const length = row.length
        ? `${row.length}${commodityMeasurementShortName} ${t(
            'common:dimensions.short_name.length'
        )}`
        : '-';
    return (
        <>
            {width} x {height} x {length}
        </>
    );
}

export default memo(Dimensions);
