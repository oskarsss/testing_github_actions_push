import { Stack } from '@mui/material';
import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { useStableArray } from '@/hooks/useStable';
import { loadboardSelectedSearchIdSelectors } from '@/store/loadboard/selectors';
import LoadboardTableContainer from './components/table/LoadboardTableContainer';
import FavoriteLoads from './components/favorite-loads/FavoriteLoads';
import LoadboardInfoPanel from './components/load-info/LoadboardInfoPanel';

function LoadboardContent() {
    const selectedSearchId = useAppSelector(loadboardSelectedSearchIdSelectors);
    const isLoading = useAppSelector((state) => state.loadboard.searchesLoadings[selectedSearchId]);
    const storageResults = useAppSelector(
        (state) => state.loadboard.resultsBySearchId[state.loadboard.selectedSearchId]
    );
    const results = useStableArray(storageResults);

    return (
        <Stack
            overflow="hidden"
            flex="2 1 100%"
            flexDirection="row"
        >
            <Stack
                overflow="hidden"
                flex="1 1 100%"
                sx={{
                    padding        : '16px',
                    backgroundColor: ({ palette }) => palette.semantic.background.secondary
                }}
            >
                <Stack
                    overflow="hidden"
                    flex="1 1 100%"
                    padding="16px"
                    sx={{
                        backgroundColor: ({ palette }) => palette.semantic.foreground.white.primary
                    }}
                >
                    {selectedSearchId && (
                        <LoadboardTableContainer
                            isLoading={isLoading}
                            rows={results}
                        />
                    )}
                    <FavoriteLoads />
                </Stack>
            </Stack>
            <LoadboardInfoPanel />
        </Stack>
    );
}

export default LoadboardContent;
