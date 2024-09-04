import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useGetPayoutsQuery } from '@/@grpcServices/services/payouts/payouts-service-hooks';
import React from 'react';
import { PayoutsIcon } from '@/@core/icons/custom-nav-icons/icons';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import Search from './Search';

function PayoutsHeader() {
    const {
        filter_id,
        selected_filters,
        filters
    } = useGetPayoutsQuery();
    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<PayoutsIcon />}
                        title="pages:payouts"
                    />
                    <Search />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Divider />
                    {/* <PageHeadersKit.Buttons.Primary
                        title="Add Payout"
                        onClick={() => {}}
                        icon={<AddIcon fontSize="medium" />}
                    /> */}
                </>
            )}
            bottomLeft={(
                <FiltersContainer>
                    <Filters
                        default_filters={PAGES_FILTERS_CONFIG.ACCOUNTING.PAYOUTS.defaultFilters}
                        filter_id={filter_id}
                        filters={filters}
                    />
                </FiltersContainer>
            )}
            bottomRight={(
                <PageHeadersKit.Buttons.ClearFilter
                    updateType="redux"
                    filter_id={filter_id}
                    selected_filters={selected_filters}
                    default_filters={PAGES_FILTERS_CONFIG.ACCOUNTING.PAYOUTS.defaultFilters}
                />
            )}
        />
    );
}

export default PayoutsHeader;
