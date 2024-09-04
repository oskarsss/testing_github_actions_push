import { useAppSelector } from '@/store/hooks';
import React from 'react';
import PageHeadersKit from '@/@core/ui-kits/page-headers';

type Props = {
    filter_id: string;
    default_filters: Record<string, any>;
};

const ClearAllFiltersButton = ({
    filter_id,
    default_filters = {}
}: Props) => {
    const filters = useAppSelector((state) => state.filters[filter_id]) || {};
    return (
        <PageHeadersKit.Buttons.ClearFilter
            filter_id={filter_id}
            default_filters={default_filters}
            selected_filters={{ ...default_filters, ...filters }}
            updateType="redux"
        />
    );
};

export default ClearAllFiltersButton;
