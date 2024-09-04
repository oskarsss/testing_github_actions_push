import { SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { useStopsPeriod, useTrucksPeriod } from '@/store/ifta/hooks';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Buttons from './Buttons';
import Search from './Search';
import Select from './Select/Select';
import { IftaViewIdType } from '../../Details';

type View = {
    id: string;
    name: IntlMessageKey;
};

type Props = {
    periodId: string;
    views: View[];
    selectedViewId: IftaViewIdType;
    setSelectedViewId: (view_id: IftaViewIdType) => void;
};

export default function IftaHeader({
    periodId,
    views,
    selectedViewId,
    setSelectedViewId
}: Props) {
    const { t } = useAppTranslation();

    const handleChange = (_: SyntheticEvent<Element, Event>, newValue: IftaViewIdType) => {
        setSelectedViewId(newValue);
    };

    const trucks = useTrucksPeriod(periodId);

    const stops = useStopsPeriod(periodId);

    const FiltersMap: Record<IftaViewIdType, { filters: any; filter_id: string }> = {
        trucks: {
            filters  : trucks.filters,
            filter_id: trucks.filter_id
        },
        stops: {
            filters  : stops.filters,
            filter_id: stops.filter_id
        },
        totals: {
            filters  : {},
            filter_id: ''
        }
    };

    const {
        filters,
        filter_id
    } = FiltersMap[selectedViewId];

    return (
        <PageHeadersKit.Header
            sx={{
                backgroundColor: ({ palette }) => palette.semantic.foreground.white.tertiary
            }}
            topLeft={(
                <>
                    <Select id={periodId} />

                    <Search
                        viewId={selectedViewId}
                        periodId={periodId}
                        type={selectedViewId}
                    />

                    <Tabs
                        value={selectedViewId}
                        onChange={handleChange}
                    >
                        {views.map((view) => (
                            <Tab
                                key={view.id}
                                label={t(view.name)}
                                value={view.id}
                                style={{ fontWeight: 800, justifyContent: 'space-between' }}
                            />
                        ))}
                    </Tabs>
                    {selectedViewId !== 'totals' && (
                        <FiltersContainer>
                            <Filters
                                updateType="redux"
                                default_filters={PAGES_FILTERS_CONFIG.REPORTS.IFTA.defaultFilters}
                                filter_id={filter_id}
                                filters={filters}
                            />
                        </FiltersContainer>
                    )}
                </>
            )}
            topRight={(
                <Buttons
                    id={periodId}
                    value={selectedViewId}
                />
            )}
            style={{
                marginBottom: 0,
                height      : 'fit-content',
                position    : 'relative',
                zIndex      : 1
            }}
        />
    );
}
