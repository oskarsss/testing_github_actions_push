import React, { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { formatMiles } from '@/utils/formatting';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { selectManifestRows } from '@/store/dispatch/manifests/selectors';
import { OrdersTableFooter, OrdersTableHeaderCell } from '@/@core/ui-kits/loads/table';
import styles from './ManifestsTable.module.scss';
import manifestsColumns from './columns';

type Props = {
    idxList: number[];
};

function Footer({ idxList }: Props) {
    const showTotals = useAppSelector((state) => state.manifests.settings.showTotals);

    const manifests = useAppSelector(selectManifestRows);

    const totals = useMemo(() => {
        const totalLoads = idxList.reduce<string[]>((acc, idx) => {
            manifests[idx].stops.forEach((stop) => {
                if (stop.loadId) {
                    acc.push(stop.loadId);
                }
            });
            return acc;
        }, []);
        const totalLoadsCount = new Set(totalLoads).size;
        const totalGrossAmount = idxList.reduce(
            (acc, idx) => acc + (manifests[idx].gross?.amount ?? 0),
            0
        );
        const totalGrossAmountString = getFormattedAmountOfMoney(totalGrossAmount);
        const totalDistance = idxList.reduce(
            (acc, idx) => acc + (manifests[idx].totalDistance?.miles ?? 0),
            0
        );

        const ratePerMileTotal = idxList.reduce(
            (acc, idx) => acc + (manifests[idx].rpm?.amount ?? 0),
            0
        );
        const averageRatePerMile = ratePerMileTotal / idxList.length;
        const averageRatePerMileFormatted = `$${averageRatePerMile.toFixed(2)}`;
        const totalDistanceFormatted = formatMiles(totalDistance);

        return {
            totalDistance      : totalDistanceFormatted,
            totalEmptyDistance : '',
            totalGrossAmount   : totalGrossAmountString,
            totalLoadedDistance: '',
            totalLoadsCount,
            averageRatePerMileFormatted
        };
    }, [idxList, manifests]);

    return (
        <OrdersTableFooter
            className={styles.row}
            showTotals={showTotals}
        >
            {manifestsColumns.map((column) => (
                <OrdersTableHeaderCell
                    key={`footer_${column.field_name}`}
                    style={{
                        ...column.headerStyle,
                        paddingTop   : 0,
                        paddingBottom: 0
                    }}
                >
                    <span>{column?.renderTotalCell?.(totals) || ''}</span>
                </OrdersTableHeaderCell>
            ))}
        </OrdersTableFooter>
    );
}

export default memo(Footer);
