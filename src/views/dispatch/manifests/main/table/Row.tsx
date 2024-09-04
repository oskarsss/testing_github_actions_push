import React, { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import {
    selectIsSelectedManifest,
    selectManifestByIdx
} from '@/store/dispatch/manifests/selectors';
import { ManifestGetRequest_SortType } from '@proto/manifests';
import { OrdersTableCell, OrdersTableDaysLine, OrdersTableRow } from '@/@core/ui-kits/loads/table';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { OrdersRowColor } from '@/@core/ui-kits/loads/table/OrdersTableRow';
import manifestsColumns from './columns';
import styles from './ManifestsTable.module.scss';

type Props = {
    manifestIdx: number;
    onClick: (manifest: number) => void;
    startsIndexes: Record<string, string[]>;
    sortBy: ManifestGetRequest_SortType;
};

const acceptedSort = [
    ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_ASC,
    ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_DESC
];

const ColorsMap: Record<ManifestModel_Status, OrdersRowColor> = {
    [ManifestModel_Status.CANCELED]   : 'error',
    [ManifestModel_Status.PLANNING]   : 'yellow',
    [ManifestModel_Status.DELIVERED]  : 'success',
    [ManifestModel_Status.IN_PROGRESS]: 'blueDark',
    [ManifestModel_Status.DELETED]    : 'gray',
    [ManifestModel_Status.TONU]       : 'pink',
    [ManifestModel_Status.ASSIGNED]   : 'warning',
    [ManifestModel_Status.UNSPECIFIED]: null
};

function ManifestTableRow({
    manifestIdx,
    onClick,
    startsIndexes,
    sortBy
}: Props) {
    const manifest = useAppSelector(selectManifestByIdx(manifestIdx));
    const isSelected = useAppSelector(selectIsSelectedManifest(manifestIdx));
    const isFocused = useAppSelector((state) => state.manifests.table.focusedRow === manifestIdx);
    const showDaysLines = useAppSelector((state) => state.manifests.settings.showDaysLines);

    const isFirstOfPeriod = useMemo(() => {
        if (!manifest || !acceptedSort.includes(sortBy)) return false;
        const firstStopAppointmentStartAt = manifest.stops[0]?.appointmentStartAtLocal;
        if (!firstStopAppointmentStartAt) return false;
        const arr = startsIndexes[firstStopAppointmentStartAt?.split(' ')[0]];
        if (!arr) return false;
        return arr.findIndex((id) => manifest.manifestId === id) === 0;
    }, [manifest, sortBy, startsIndexes]);

    const countItems =
        startsIndexes[manifest.stops[0]?.appointmentStartAtLocal.split(' ')[0]]?.length || 0;

    if (!manifest) return null;

    return (
        <>
            {isFirstOfPeriod && showDaysLines && (
                <OrdersTableDaysLine
                    type="manifests"
                    isFirstOfPeriod={Boolean(isFirstOfPeriod)}
                    countItems={countItems}
                    appointmentStartAt={manifest.stops[0]?.appointmentStartAtLocal}
                />
            )}
            <OrdersTableRow
                focused={isFocused}
                selected={isSelected}
                onClick={() => onClick(manifestIdx)}
                className={styles.row}
                color={ColorsMap[manifest.status]}
            >
                {manifestsColumns.map((column) => (
                    <OrdersTableCell key={column.field_name}>
                        {column.renderCell(manifest, isSelected)}
                    </OrdersTableCell>
                ))}
            </OrdersTableRow>
        </>
    );
}

export default memo(ManifestTableRow);
