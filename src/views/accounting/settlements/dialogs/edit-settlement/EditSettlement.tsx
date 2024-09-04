/* eslint-disable react/jsx-props-no-spreading */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import themeConfig from '@/configs/themeConfig';
import { Dialog as MUIDialog } from '@mui/material';
import { Transition } from '@/@core/components/Transition';
import SettlementsTypes from '@/store/accounting/settlements/types';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { Settlements_Cycle_Period_Settlement_Status } from '@proto/models/model_settlement';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import { useAppDispatch } from '@/store/hooks';
import { api } from '@/store/api';
import { PayoutModel } from '@proto/models/model_payout';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import IntegrationQuickbooksGrpcService from '@/@grpcServices/services/intergrations-quickbooks.service';
import {
    IP_Quickbooks_Bill_GetReply_Bill,
    IP_Quickbooks_BillPayment_GetReply_BillPayment
} from '@proto/integration_provider_quickbooks';
import { VendorModel_Vendor } from '@proto/models/model_vendor';
import type { DriverModel_Driver } from '@proto/models/model_driver';

import { TruckModel_Truck } from '@proto/models/model_truck';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import EditSettlementForm from './EditSettlementForm';

export const useEditSettlementDialog = hookFabric(
    EditSettlementDialog,
    ({
        onClose,
        onExited,
        name,
        open,
        children
    }) => (
        <MUIDialog
            keepMounted
            open={open}
            TransitionComponent={Transition}
            TransitionProps={{
                timeout: themeConfig.dialogTransitionTimeout,
                onExited
            }}
            id={name}
            onClose={onClose}
            sx={{
                '& .MuiDialog-container': {
                    position      : 'relative',
                    display       : 'flex',
                    justifyContent: 'flex-end',
                    alignItems    : 'center'
                },
                '.MuiDialog-paper': {
                    maxWidth      : 'min(1900px, 95vw)',
                    maxHeight     : '100%',
                    height        : '100%',
                    margin        : 0,
                    display       : 'flex',
                    justifyContent: 'flex-end',
                    alignItems    : 'center',
                    flexShrink    : 1,
                    flexGrow      : 1
                }
            }}
        >
            {children}
        </MUIDialog>
    )
);

type Props = {
    settlement_id: string;
    cycle_id: string;
    period_id: string;
};

export type EditSettlementContextProps = {
    settlement: SettlementsTypes.CycleSettlementDetails.Settlement;
    refetch: () => void;
    selectedSettlementParams: {
        settlement_id: string;
        cycle_id: string;
        period_id: string;
    };
    setSelectedSettlementParams: ({
        settlement_id,
        cycle_id,
        period_id
    }: {
        settlement_id: string;
        cycle_id: string;
        period_id: string;
    }) => void;
    isDisabledEdit: boolean;
    driver: DriverModel_Driver | null;
    truck: TruckModel_Truck | null;
    trailer: TrailerModel_Trailer | null;
    vendor: VendorModel_Vendor | null;
    payouts: PayoutModel[] | null;
    quickBooksBill: IP_Quickbooks_Bill_GetReply_Bill | null;
    quickBooksBillPayments: IP_Quickbooks_BillPayment_GetReply_BillPayment[] | null;
};

const EditSettlementContext = createContext<EditSettlementContextProps>({
    settlement              : {} as SettlementsTypes.CycleSettlementDetails.Settlement,
    refetch                 : () => {},
    selectedSettlementParams: {
        settlement_id: '',
        cycle_id     : '',
        period_id    : ''
    },
    setSelectedSettlementParams: () => {},
    isDisabledEdit             : true,
    driver                     : null,
    truck                      : null,
    trailer                    : null,
    vendor                     : null,
    payouts                    : null,
    quickBooksBill             : null,
    quickBooksBillPayments     : null
});

export const useEditSettlementContext = () => useContext(EditSettlementContext);

export default function EditSettlementDialog({
    settlement_id,
    cycle_id,
    period_id
}: Props) {
    const dispatch = useAppDispatch();
    const dialog = useEditSettlementDialog(true);
    const [selectedSettlementParams, setSelectedSettlementParams] = useState({
        settlement_id,
        cycle_id,
        period_id
    });

    const driversMap = useDriversMap();
    const trucksMap = useTrucksMap();
    const trailersMap = useTrailersMap();
    const vendorsMap = useVendorsMap();

    const {
        data,
        isSuccess,
        isError,
        isLoading,
        refetch
    } =
        SettlementsGrpcService.useRetrieveSettlementQuery(
            {
                cycleId     : selectedSettlementParams.cycle_id,
                periodId    : selectedSettlementParams.period_id,
                settlementId: selectedSettlementParams.settlement_id
            },
            { refetchOnMountOrArgChange: true }
        );

    const { data: payoutData } = PayoutsGrpcService.useGetPayoutsQuery({});
    const { data: billData } = IntegrationQuickbooksGrpcService.useGetBillQuickbooksQuery({
        settlements: [
            {
                cycleId     : selectedSettlementParams.cycle_id,
                periodId    : selectedSettlementParams.period_id,
                settlementId: selectedSettlementParams.settlement_id
            }
        ]
    });

    const payouts = useMemo(() => {
        if (!payoutData?.payouts) return null;
        const settlementPayouts = payoutData.payouts.filter(
            (payout) => payout.settlementId === selectedSettlementParams.settlement_id
        );
        if (settlementPayouts.length === 0) return null;
        if (settlementPayouts.length === 1) return settlementPayouts;
        return [...settlementPayouts].sort(
            (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
    }, [payoutData?.payouts, selectedSettlementParams.settlement_id]);

    const { data: quickBooksBillPayments } =
        IntegrationQuickbooksGrpcService.useGetBillPaymentQuickbooksQuery(
            {
                payoutIds: payouts?.map((payout) => payout.payoutId) || []
            },
            { skip: !payouts }
        );

    useEffect(
        () => () => {
            if (data?.settlement?.driverId) {
                dispatch(
                    api.util.invalidateTags([
                        {
                            type: 'driver',
                            id  : data?.settlement?.driverId
                        }
                    ])
                );
            }
        },
        [data?.settlement?.driverId]
    );

    const quickBooksBill = useMemo(() => {
        if (!billData?.bills) return null;
        return billData.bills[0] || null;
    }, [billData?.bills]);

    const driver = useMemo(() => {
        if (!data?.settlement) return null;
        return driversMap[data?.settlement.driverId || ''] || null;
    }, [data?.settlement, driversMap]);

    const vendor = useMemo(() => {
        if (!data?.settlement) return null;
        return vendorsMap[data?.settlement.vendorId || ''] || null;
    }, [data?.settlement, vendorsMap]);

    const truck = useMemo(() => {
        if (!data?.settlement) return null;
        return trucksMap[data?.settlement.truckId || ''] || null;
    }, [data?.settlement, trucksMap]);

    const trailer = useMemo(() => {
        if (!data?.settlement) return null;
        return trailersMap[data?.settlement.trailerId || ''] || null;
    }, [data?.settlement, trailersMap]);

    const contextValue = useMemo(
        () => ({
            settlement: data?.settlement
                ? data.settlement
                : ({} as SettlementsTypes.CycleSettlementDetails.Settlement),
            refetch,
            selectedSettlementParams,
            setSelectedSettlementParams,
            isDisabledEdit: isSuccess
                ? data?.settlement?.status !==
                      Settlements_Cycle_Period_Settlement_Status.SETTLEMENT_STATUS_OPEN &&
                  data?.settlement?.status !==
                      Settlements_Cycle_Period_Settlement_Status.SETTLEMENT_STATUS_IN_REVIEW
                : true,
            driver,
            truck,
            trailer,
            vendor,
            payouts,
            quickBooksBill,
            quickBooksBillPayments: quickBooksBillPayments?.billPayments || null
        }),
        [
            data?.settlement,
            refetch,
            selectedSettlementParams,
            setSelectedSettlementParams,
            driver,
            truck,
            trailer,
            vendor,
            payouts,
            quickBooksBill,
            quickBooksBillPayments,
            isSuccess
        ]
    );

    return (
        <EditSettlementContext.Provider value={contextValue}>
            {isError && (
                <FullDialog.FailedFetching
                    onClose={dialog.close}
                    onRetry={refetch}
                />
            )}
            {isLoading && <FullDialog.FetchingProcess />}
            {!isLoading && !isError && <EditSettlementForm />}
        </EditSettlementContext.Provider>
    );
}
