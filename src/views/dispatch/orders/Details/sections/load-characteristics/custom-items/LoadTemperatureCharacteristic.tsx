import React, { useMemo } from 'react';
import { useActiveEquipmentTypes } from '@/store/equipments/hooks';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import LoadCharacteristicsStyled from '../LoadCharacteristics.styled';

type Props = {
    equipmentId: string;
    temperatureFormatted: string;
};

export default function LoadTemperatureCharacteristic({
    equipmentId,
    temperatureFormatted
}: Props) {
    const { equipment_types } = useActiveEquipmentTypes();
    const { t } = useAppTranslation();

    const disabledTemperature = useMemo(() => {
        const reeferEquipmentType = equipment_types.find(
            (eqType) => eqType.code === 'R',
            [equipment_types]
        )?.equipmentTypeId;
        return equipmentId !== reeferEquipmentType;
    }, [equipmentId, equipment_types]);

    if (disabledTemperature) return null;

    return (
        <>
            <LoadCharacteristicsStyled.LoadInfoIconWrapper>
                <VectorIcons.LoadIcons.Temperature />
            </LoadCharacteristicsStyled.LoadInfoIconWrapper>
            <LoadCharacteristicsStyled.LoadInfoRow>
                <LoadCharacteristicsStyled.LoadInfoItemTitle>
                    {t('loads:details.characteristics.titles.temperature')}
                </LoadCharacteristicsStyled.LoadInfoItemTitle>
                <LoadCharacteristicsStyled.LoadInfoItemValue>
                    <LoadCharacteristicsStyled.LoadInfoItemBadge>
                        <VectorIcons.CircleExclamation />
                        <span>{temperatureFormatted || '-'}</span>
                    </LoadCharacteristicsStyled.LoadInfoItemBadge>
                </LoadCharacteristicsStyled.LoadInfoItemValue>
            </LoadCharacteristicsStyled.LoadInfoRow>
        </>
    );
}
