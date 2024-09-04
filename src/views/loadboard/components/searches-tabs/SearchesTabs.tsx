import { Stack, Tab, Tabs, useTheme } from '@mui/material';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadboardSelectedSearchIdSelectors } from '@/store/loadboard/selectors';
import { LoadboardActions } from '@/store/loadboard/slice';
import { MouseEvent, useEffect } from 'react';
import { LoadboardSearch } from '@proto/models/model_loadboard_search';
import { SelectLoadboardTabAction } from '@/store/loadboard/actions';
import { useStableArray } from '@/hooks/useStable';
import { useSearchOptionsMenu } from '../../menus/SearchOptions';
import SearchTabLabel from './SearchTabLabel';
import CreateSearchButton from './CreateSearchButton';

const SearchesTabs = () => {
    const dispatch = useAppDispatch();
    const selectedSearchId = useAppSelector(loadboardSelectedSearchIdSelectors);
    const { palette } = useTheme();

    const { data } = LoadboardGrpcService.useGetSearchesQuery({});

    const searches = useStableArray(data?.searches);

    useEffect(() => {
        if (!selectedSearchId && searches.length > 0) {
            dispatch(LoadboardActions.setSelectedSearchId(searches[0].searchId));
        }
    }, [searches, selectedSearchId]);

    const searchMenu = useSearchOptionsMenu();

    const selectSearch = (_: unknown, value: string) => {
        dispatch(SelectLoadboardTabAction(value));
        dispatch(LoadboardActions.setSelectedLoadId({ loadId: '' }));
    };

    const openOptionMenu = (event: MouseEvent<HTMLDivElement>, search: LoadboardSearch) => {
        event.preventDefault();
        event.stopPropagation();
        searchMenu.open({
            search
        })(event);
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={3}
        >
            <Tabs
                value={selectedSearchId}
                onChange={selectSearch}
                variant="scrollable"
                scrollButtons={false}
            >
                {searches.map((search) => (
                    <Tab
                        key={search.searchId}
                        label={(
                            <SearchTabLabel
                                searches={searches}
                                search={search}
                                isSelectedSearch={selectedSearchId === search.searchId}
                            />
                        )}
                        value={search.searchId}
                        sx={{
                            display       : 'flex',
                            alignItems    : 'flex-start',
                            maxWidth      : '237px !important',
                            width         : '100%',
                            padding       : '4px 16px !important',
                            minWidth      : '237px !important',
                            height        : '46px !important',
                            borderBottom  : `1px solid ${palette.semantic.border.secondary}`,
                            borderRight   : `1px solid ${palette.semantic.border.secondary}`,
                            borderCollapse: 'separate'
                        }}
                        onContextMenu={(event) => openOptionMenu(event, search)}
                    />
                ))}
            </Tabs>
            <CreateSearchButton />
        </Stack>
    );
};

export default SearchesTabs;
