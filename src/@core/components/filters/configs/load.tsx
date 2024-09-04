import {
    LOAD_INVOICE_STATUS_COLORS,
    LOAD_INVOICE_STATUS_ICONS
} from '@/@core/theme/entities/load/invoice_status';
import { LOAD_STATUS_COLORS, loads_icons_with_width } from '@/@core/theme/entities/load/status';
import { LoadInvoiceStatus, LoadStatus } from '@/models/loads/load';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useRouter } from 'next/router';
import Icon from '../filter-button/Icon';
import { $Filter } from '../utils';

const statusOrder: LoadStatus[] = [
    'assigned',
    'pending',
    'in_progress',
    'delivered',
    'tonu',
    'canceled',
    'deleted'
];

export const LOAD_STATUS_FILTER_CONFIG = $Filter.configure<LoadStatus>((counts) => {
    const { t } = useAppTranslation();

    const router = useRouter();
    const filteredStatusOrder = useMemo(() => {
        if (router.pathname.includes('/billing')) {
            return ['delivered', 'tonu'] as LoadStatus[];
        }
        if (router.pathname.includes('dispatch/scheduling')) {
            return statusOrder.filter((status) => status !== 'canceled');
        }
        return statusOrder;
    }, [router.pathname]);
    const filterItems = useMemo(
        () =>
            filteredStatusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={LOAD_STATUS_COLORS[status]}
                        icon={loads_icons_with_width(24)[status]}
                    />,
                    t(`state_info:loads.status.${status}`)
                ),
                searchValue: t(`state_info:loads.status.${status}`),
                value      : status,
                count      : counts?.[status]
            })),
        [counts, filteredStatusOrder, t]
    );

    const customTotalCount = useMemo(() => $Filter.excludeDelete(statusOrder, counts), [counts]);

    return { filterItems, label: 'common:status' as const, customTotalCount };
});

const invoiceStatusOrder: LoadInvoiceStatus[] = [
    'not_invoiced',
    'invoiced',
    'paid',
    'need_review',
    'rejected',
    'detention_requested'
];

export const LOAD_INVOICE_STATUS_FILTER_CONFIG = $Filter.configure<LoadInvoiceStatus>((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            invoiceStatusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={LOAD_INVOICE_STATUS_COLORS[status]}
                        icon={LOAD_INVOICE_STATUS_ICONS[status]}
                    />,
                    t(`state_info:loads.invoice_status.${status}`)
                ),
                searchValue: t(`state_info:loads.invoice_status.${status}`),
                value      : status,
                count      : counts?.[status]
            })),
        [counts, t]
    );

    return { filterItems, label: 'core:filters.labels.invoice_status' as const };
});
