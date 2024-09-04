import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ENTITY_CHIP_COLORS } from '@/@core/theme/entities';
import { StatusChip } from '@/@core/theme/chip';

import { DRIVER_STATUS_COLORS } from '@/@core/theme/entities/driver/status';
import { IntlMessageKey } from '@/@types/next-intl';
import { DriverModel_Status } from '@proto/models/model_driver';

type Props = {
    status: string | DriverModel_Status;
    type: 'driver' | 'trailer';
    tKey: IntlMessageKey;
};

function ChipItem({
    type,
    status,
    tKey
}: Props) {
    const { t } = useAppTranslation();

    const color =
        type === 'driver'
            ? DRIVER_STATUS_COLORS[status as DriverModel_Status]
            : ENTITY_CHIP_COLORS[status as keyof typeof ENTITY_CHIP_COLORS];

    return (
        <StatusChip
            color={color}
            status={t(tKey)}
        />
    );
}

export default ChipItem;
