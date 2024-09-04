import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRevenueTypes } from '@/store/accounting/settlements/hooks/revenue_type';
import MyContext from '@/views/settings/context';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import NoTypes from './components/Type/NoTypes/NoTypes';
import Type from './components/Type/Type';
import Header from './components/Header/Header';
import Skeleton from './components/Skeletons/Skeletons';

export enum VIEW_NAME {
    ACTIVE = 'active',
    DEACTIVATED = 'deactivated'
}

const VIEWS = [
    {
        viewId: '0',
        active: true,
        name  : VIEW_NAME.ACTIVE
    },
    {
        viewId: '1',
        active: false,
        name  : VIEW_NAME.DEACTIVATED
    }
];

export default function RevenueTypes() {
    const { t } = useAppTranslation();
    const myContext = React.useContext(MyContext);
    const defaultViewTypes = useRef([]);
    const [selectedView, setSelectedView] = useState('0');
    const {
        revenue_types,
        isLoading
    } = useRevenueTypes();

    const viewTypes = useMemo(() => {
        if (!revenue_types) return defaultViewTypes.current;
        return revenue_types.filter((type) => type.active === VIEWS[Number(selectedView)].active);
    }, [revenue_types, selectedView]);

    useEffect(() => {
        if (myContext.updateScroll) myContext.updateScroll();
    }, [viewTypes, revenue_types]);

    if (isLoading) {
        return <Skeleton />;
    }

    const translateViews = VIEWS.map((view) => ({
        ...view,
        name: t(`settings:settlements.revenue_types.header.tabs.${view.name}`)
    }));

    return (
        <>
            <Header
                setSelectedView={(id: string) => setSelectedView(id)}
                selectedView={selectedView}
                views={translateViews}
            />
            {viewTypes.length > 0 ? (
                viewTypes.map((type) => (
                    <Type
                        type={type}
                        key={type.revenueTypeId}
                    />
                ))
            ) : (
                <NoTypes view_name={VIEWS[Number(selectedView)].name} />
            )}
        </>
    );
}
