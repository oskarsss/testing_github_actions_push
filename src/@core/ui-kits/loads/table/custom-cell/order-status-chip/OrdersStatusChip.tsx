import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import { LoadStatusEnumMap } from '@/@core/theme/entities/load/status';
import { LoadModel_Status } from '@proto/models/model_load';
import React, { memo } from 'react';
import styles from './VUKIOrdersStatusChip.module.scss';

type Props = {
    status: LoadModel_Status;
    orderId: string;
};

export const OrdersTableStatusChipCell = memo(({
    orderId,
    status
}: Props) => (
    <div className={styles.wrapper}>
        <div className={styles.icon}>{ENTITY_CHIP_ICONS[LoadStatusEnumMap[status]]}</div>
        <LoadStatusChipSelect
            show_icon={false}
            load_status={LoadStatusEnumMap[status]}
            load_id={orderId}
            styles={{
                minWidth  : 100,
                marginLeft: '10px',
                boxShadow : '0px 4px 16px 0px rgba(0, 0, 0, 0.04)'
            }}
        />
    </div>
));
