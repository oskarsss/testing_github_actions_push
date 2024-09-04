import VectorIcons from '@/@core/icons/vector_icons';
import Button from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/Button';
import React from 'react';
import { createLoadViewAction } from '@/store/dispatch/loads/actions';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { LOADS_VIEW_TYPES } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    brokerId: string;
    customerId: string;
    customerName?: string;
    brokerName?: string;
    brokerMc?: number;
};

export default function FilterButton({
    brokerId,
    customerId,
    customerName,
    brokerName,
    brokerMc
}: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        views,
        selectView
    } = useOrdersPageFilters();

    const client = brokerId ? LOADS_VIEW_TYPES.BROKER : LOADS_VIEW_TYPES.CUSTOMER;
    const id = brokerId || customerId;
    const view_id = `${client}_${id}`;
    const { t } = useAppTranslation('common');

    const is_not_load_detail = router.pathname !== APP_ROUTES_CONFIG.dispatch.orders.path;

    const openTruckScheduling = () => {
        const view = views.find((view) => view.view_id === view_id);

        if (view) {
            selectView(view.view_id);
        } else {
            // TODO: after adding customer filter,
            //  change 'search: load.customer_id' to customer_ids: [load.customer_id]

            const filters: Record<string, string | (string | number)[]> = brokerId
                ? { broker: [brokerId] }
                : { search: customerName || t('not_provided') };
            dispatch(
                createLoadViewAction({
                    type: client,
                    view_id,
                    name: `${
                        (brokerId ? brokerName : customerName) ||
                        `${client}: ${t('not_provided')}${brokerMc ? ` (${brokerMc})` : ''}`
                    }`,
                    filters
                })
            );
            selectView(view_id);
        }

        if (is_not_load_detail) {
            window.open(APP_ROUTES_CONFIG.dispatch.orders.path, '_blank');
        }
    };

    if (!id) return null;

    return (
        <Button
            onClick={openTruckScheduling}
            tooltipProps={{
                title: is_not_load_detail
                    ? 'loads:details.overview.tooltips.filter_by_client_new_tab'
                    : 'loads:details.overview.tooltips.filter_by_client'
            }}
        >
            <VectorIcons.Filter style={{ fill: '' }} />
        </Button>
    );
}
