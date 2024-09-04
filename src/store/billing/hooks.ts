/* eslint-disable no-nested-ternary */
import { useBrokersMap, useCustomersMap, useUsersMap } from '@/store/hash_maps/hooks';
import { useMemo, useRef } from 'react';

import { GetLoadsReply, LoadData_Load } from '@proto/loads';
import TableTypes from '@/@core/components/table/types';
import moment from 'moment-timezone';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import { PageModel_Page } from '@proto/models/model_page';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import createMap from '@/utils/create-map';
import { useAppSelector } from '../hooks';
import useInvoicesPageData from '../storage/orders/hooks/useInvoicesPageData';
import { BillingStoreKey } from './slice';
import { useOrdersTotals } from '../storage/orders/hooks/useOrdersTotals';
import { useTrucksMap } from '../storage/trucks/hooks/common';
import { useDriversMap } from '../storage/drivers/hooks/common';

export const defaultInvoicesFilters = PAGES_FILTERS_CONFIG.BILLING.ALL.defaultFilters;

type InvoiceStats = {
    page: string;
};

export function useInvoicesStatsQuery({ page }: InvoiceStats) {
    const {
        filter_id: filterId,
        selected_filters: selectedFilters
    } = useSelectedFilters(
        page,
        defaultInvoicesFilters
    );

    return {
        filterId,
        selectedFilters
    };
}

export type ConvertedGrpcInvoiceType = LoadData_Load &
    TableTypes.Row & {
        load_reference_id: string;
        client: string;
        broker_amount: string;
        settlement_id: string;
        last_stop_appointment_start_at: string;
        gross_amount: string;
        first_stop_start_at_date: string;
        first_stop_appointment_start_at: string;
        driver_net: string;
        customer_short_name: string;
        customer_name: string;
        commodity: string;
        broker: string;
        appointment_start_at: string;
        from: string;
        to: string;
        last_stop_start_at_date: string;
        driver: string;
        dispatcher: string;
        truck: string;
    };

export const useConvertedInvoices = (invoicesData?: GetLoadsReply) => {
    const stableArray = useRef<ConvertedGrpcInvoiceType[]>([]).current;
    const { t } = useAppTranslation('common');

    const brokersMap = useBrokersMap();

    const customersMap = useCustomersMap();

    const trucksMap = useTrucksMap();

    const dispatchersMap = useUsersMap();

    const driversMap = useDriversMap();

    const invoices: ConvertedGrpcInvoiceType[] = useMemo(() => {
        if (!invoicesData) {
            return stableArray;
        }

        return invoicesData.loads.map((load) => {
            const broker = brokersMap[load.brokerId];
            const customer = customersMap[load.customerId];

            const activeManifest = load.manifests?.find(
                (manifest) => manifest.manifestId === load.activeManifestId
            );

            const truckId = activeManifest?.truckId || '';
            const driverId = activeManifest?.primaryDriverId || '';

            const truck = trucksMap[truckId];
            const dispatcher = dispatchersMap[load.dispatcherId ?? ''];
            const driver = driversMap[driverId];

            const client = load.brokerId
                ? broker?.shortName || broker?.name
                : customer?.shortName || customer?.name;

            const client_name = load.brokerId ? broker?.name : customer?.name;

            const client_short_name = load.brokerId ? broker?.shortName : customer?.shortName;

            const stops = load.manifests?.flatMap((manifest) => manifest.stops || []);
            const firstStop = stops?.[0];
            const lastStop = stops?.[stops.length - 1];

            return {
                ...load,
                load_reference_id             : load.referenceId,
                client                        : client || t('not_provided'),
                client_name                   : client_name || t('not_provided'),
                client_short_name             : client_short_name || t('not_provided'),
                broker_amount                 : load.invoiceAmount,
                client_amount                 : load.invoiceAmount,
                settlement_id                 : '',
                last_stop_appointment_start_at: lastStop?.appointmentStartAtLocal || '',
                gross_amount                  : load.grossAmountFormatted,
                first_stop_start_at_date      : firstStop
                    ? moment(firstStop?.appointmentStartAtLocal).format('YYYY-MM-DD')
                    : '',
                first_stop_appointment_start_at: firstStop?.appointmentStartAtLocal || '',
                driver_net                     : load.driverNet,
                customer_short_name            : customer?.shortName ?? '',
                customer_name                  : customer?.name ?? '',
                commodity                      : load.commodity,
                broker                         : broker?.name || '',
                appointment_start_at           : firstStop?.appointmentStartAtLocal || '',
                entityId                       : load.loadId,
                from                           : `${firstStop?.location?.city} ${
                    firstStop?.location?.state ? `${firstStop?.location?.state},` : ''
                }`,
                to: `${lastStop?.location?.city} ${
                    lastStop?.location?.state ? `${lastStop?.location?.state},` : ''
                }`,

                last_stop_start_at_date: lastStop
                    ? moment(lastStop?.appointmentStartAtLocal).format('YYYY-MM-DD')
                    : '',
                driver    : `${driver?.firstName || ''} ${driver?.lastName || ''}` || '',
                dispatcher: `${dispatcher?.firstName ?? ''} ${dispatcher?.lastName ?? ''}`,
                truck     : truck?.referenceId || '',
                unique_key: load.loadId,
                entities  : {
                    load: load.loadId
                }
            };
        });
    }, [
        t,
        invoicesData,
        stableArray,
        brokersMap,
        customersMap,
        trucksMap,
        dispatchersMap,
        driversMap
    ]);

    return invoices;
};

type InvoiceQueryParams = {
    page: 'billing.all' | 'billing.direct' | 'billing.factoring' | 'billing.amazon';
    pageView: keyof typeof PageModel_Page;
    invoiceType: BillingStoreKey;
};

export const useInvoicesQuery = ({
    invoiceType,
    page,
    pageView
}: InvoiceQueryParams) => {
    const orders = useAppSelector((state) => state.ordersData.rows);
    const {
        filterId,
        selectedFilters,
        ...statsRest
    } = useInvoicesStatsQuery({
        page
    });

    const data = useInvoicesPageData({
        selectedFilters,
        invoiceType
    });

    const invoicesList = useMemo(() => {
        if (!data?.rows) {
            return [];
        }

        return data.rows.map((idx) => orders[idx]);
    }, [orders, data.rows]);
    const views_and_headers = useTablePageData(pageView);

    const totals = useOrdersTotals(data.rows);

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: defaultInvoicesFilters,
        views         : views_and_headers.views
    });

    const tableTotals = useMemo(() => {
        const columnsMap = createMap(view?.columns || [], 'columnId');
        const showGrossAmount = columnsMap.gross_amount?.footerTotal;
        const showClientAmount = columnsMap.client_amount?.footerTotal;
        const showDriverNet = columnsMap.driver_net?.footerTotal;

        return {
            driver_net   : showDriverNet ? totals.totalDriverNetFormatted : '',
            gross_amount : showGrossAmount ? totals.totalGrossAmountFormatted : '',
            client_amount: showClientAmount ? totals.totalInvoiceAmountFormatted : ''
        };
    }, [
        totals.totalDriverNetFormatted,
        totals.totalGrossAmountFormatted,
        totals.totalInvoiceAmountFormatted,
        view?.columns
    ]);

    const formatted_invoices = useConvertedInvoices({ loads: invoicesList });

    return {
        invoices: formatted_invoices,
        invoicesList,
        view,
        selectedFilters,
        filterId,
        selectView,
        defaultViewId,
        selectedViewId,
        tableTotals,
        ...views_and_headers,
        ...statsRest,
        ...data
    };
};

export const useAllInvoices = () =>
    useInvoicesQuery({
        invoiceType: 'all',
        page       : 'billing.all',
        pageView   : 'BILLING_ALL'
    });

export const useDirectInvoices = () =>
    useInvoicesQuery({
        invoiceType: 'direct',
        page       : 'billing.direct',
        pageView   : 'BILLING_DIRECT'
    });

export const useFactoringInvoices = () =>
    useInvoicesQuery({
        invoiceType: 'factoring',
        page       : 'billing.factoring',
        pageView   : 'BILLING_FACTORING'
    });

export const useAmazonInvoices = () =>
    useInvoicesQuery({
        invoiceType: 'amazon',
        page       : 'billing.amazon',
        pageView   : 'BILLING_AMAZON'
    });
