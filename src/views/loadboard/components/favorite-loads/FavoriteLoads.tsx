import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadboardFavoritesLoads } from '@/store/loadboard/selectors';
import React, { useEffect, useRef } from 'react';
import { IconButton, Stack, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LoadboardActions } from '@/store/loadboard/slice';
import { useStableArray } from '@/hooks/useStable';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FavoriteItem from './FavoriteItem';
import { useCompareLoadsDialog } from '../../dialogs/coompare-loads/CompareLoads';

function FavoriteLoads() {
    const favoriteLoadsIds = useAppSelector(loadboardFavoritesLoads);
    const favoriteLoads = useStableArray(favoriteLoadsIds);
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const compareLoadsDialog = useCompareLoadsDialog();

    const clearAll = () => {
        dispatch(LoadboardActions.clearFavoritesLoads());
    };

    const handleCompare = () => {
        compareLoadsDialog.open({ resultIds: favoriteLoads });
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollRight = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
            const newScrollPosition = direction === 'left' ? 0 : scrollRight;
            scrollRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            const scrollRight = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({ left: scrollRight, behavior: 'smooth' });
        }
    }, [favoriteLoads.length]);

    if (!favoriteLoads.length) return null;

    return (
        <Stack
            direction="row"
            overflow="hidden"
            sx={{
                overflowX: 'hidden',
                minHeight: '44px'
            }}
            gap={2}
        >
            <Stack
                justifyContent="center"
                alignItems="center"
            >
                <IconButton
                    size="small"
                    onClick={() => handleScroll('left')}
                    disabled={!favoriteLoads.length}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Stack
                ref={scrollRef}
                direction="row"
                flex="4 1 0"
                gap={1}
                overflow="auto"
                sx={{
                    '&::-webkit-scrollbar': {
                        width  : '3px !important',
                        height : '3px !important',
                        opacity: ' 1 !important'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        cursor         : 'grab',
                        backgroundColor: (theme) =>
                            `${theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'} !important`,
                        borderRadius: '16px !important',
                        width       : '4px !important'
                    }
                }}
            >
                {favoriteLoads.map((loadId) => (
                    <FavoriteItem
                        key={loadId}
                        resultId={loadId}
                    />
                ))}
            </Stack>

            <Stack
                justifyContent="center"
                alignItems="center"
            >
                <IconButton
                    size="small"
                    onClick={() => handleScroll('right')}
                    disabled={!favoriteLoads.length}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </Stack>

            <Stack
                flex="1 1 0"
                direction="row"
                gap={1}
            >
                <Button
                    size="small"
                    onClick={clearAll}
                    variant="outlined"
                    color="secondary"
                    sx={{
                        width: '100%'
                    }}
                >
                    {t('loadboard:buttons.clear_all')}
                </Button>
                <Button
                    onClick={handleCompare}
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{
                        width: '100%'
                    }}
                >
                    {t('loadboard:buttons.compare')}
                </Button>
            </Stack>
        </Stack>
    );
}

export default FavoriteLoads;
