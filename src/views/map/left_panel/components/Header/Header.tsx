import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { MapIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useMapSelectedView } from '@/store/map/hooks';
import { ChangeEvent } from 'react';
import Search from '../Search';
import MapViews from '../Views';
import MapFilters from '../Filters/MapFilters';

const MapPageHeader = () => {
    const dispatch = useAppDispatch();
    const { selected_view_id } = useMapSelectedView();

    const searchValue = useAppSelector((state) => state.map.search[selected_view_id]);

    const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(MapActions.changeSearch({ type: selected_view_id, value: e.target.value }));
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<MapIcon isActive={false} />}
                        title="pages:map"
                    />
                    <Search
                        searchValue={searchValue}
                        handleChange={changeSearch}
                    />
                    <MapViews />
                </>
            )}
            topRight={<PageHeadersKit.AvatarGroup />}
            bottomLeft={<MapFilters />}
        />
    );
};

export default MapPageHeader;
