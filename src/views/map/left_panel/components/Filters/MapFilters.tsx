import React from 'react';
import { useMapSelectedView } from '@/store/map/hooks';
import TruckFilters from './TruckFilters';
import LoadsFilters from './LoadsFilters';
import TrailersFilters from './TrailersFilters';
import DriversFilters from './DriversFilters';

const MapFilters = () => {
    const type = useMapSelectedView().selected_view_id;

    if (!type) {
        return null;
    }

    if (type === 'trucks') {
        return <TruckFilters />;
    }

    if (type === 'loads') {
        return <LoadsFilters />;
    }

    if (type === 'trailers') {
        return <TrailersFilters />;
    }

    if (type === 'drivers') {
        return <DriversFilters />;
    }

    return null;
};

export default MapFilters;
