import { useDraftsState } from '@/@grpcServices/services/loads-drafts-service/load-drafts-service-hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DraftsActions } from '@/store/drafts/slice';
import { useEffect, useRef, WheelEvent } from 'react';
import Box from '@mui/material/Box';
import { LS_SELECTED_DRAFT_ID } from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import {
    DraftSelectedDraftIdSelector,
    DraftsIsUploadingDocumentSelector
} from '@/store/drafts/selectors';
import Tabs from '@mui/material/Tabs';
import { Theme, useTheme } from '@mui/material';
import DraftTabLabel from './LabelTab';
import DraftHeaderStyled from './DraftsHeader.styled';

export const scrollBarStyled = (theme: Theme) => ({
    '&::-webkit-scrollbar': {
        width  : '6px !important',
        height : '6px !important',
        opacity: ' 1 !important'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'} !important`,
        borderRadius   : '16px !important',
        width          : '4px !important'
    },

    // style for scroll bar box
    '&::-webkit-scrollbar-track-piece:vertical': {
        width          : '4px !important',
        backgroundColor: `${
            theme.palette.mode === 'light' ? '#F2F4F7' : theme.palette.semantic.background.white
        } !important`
    },
    '&::-webkit-scrollbar-track-piece:horizontal': {
        height         : '2px !important',
        backgroundColor: `${
            theme.palette.mode === 'light' ? '#F2F4F7' : theme.palette.semantic.background.white
        } !important`
    }
});

function DraftTabs() {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLElement>();
    const selectedDraftId = useAppSelector(DraftSelectedDraftIdSelector);

    const theme = useTheme();

    const handleScroll = (e: WheelEvent<HTMLElement>) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += e.deltaY;
        }
    };

    const isUploadingDocument = useAppSelector(DraftsIsUploadingDocumentSelector);

    const { drafts } = useDraftsState();

    useEffect(() => {
        containerRef.current?.scrollTo({
            behavior: 'smooth',
            left    : containerRef.current.scrollWidth,
            top     : 0
        });
    }, [drafts.length]);

    const onTabChange = (draftId: string) => {
        dispatch(DraftsActions.SetSelectedDraftId(draftId));
        localStorage.setItem(LS_SELECTED_DRAFT_ID, draftId);
    };

    return (
        <Box
            onWheel={handleScroll}
            ref={containerRef}
            sx={{
                display               : 'flex',
                flex                  : '1 1 0',
                overflow              : 'auto',
                scrollbarWidth        : 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}
        >
            <Tabs
                value={selectedDraftId}
                onChange={(_, value) => onTabChange(value)}
                TabIndicatorProps={{ style: { display: 'none' } }}
                variant="scrollable"
                scrollButtons={false}
                visibleScrollbar
                sx={{
                    '.MuiTabs-scroller': {
                        ...scrollBarStyled(theme)
                    }
                }}
            >
                {drafts.map((draft) => (
                    <DraftHeaderStyled.Tab
                        data-id={draft.loadDraftId}
                        key={draft.loadDraftId}
                        disabled={isUploadingDocument}
                        label={<DraftTabLabel draftId={draft.loadDraftId} />}
                        value={draft.loadDraftId}
                    />
                ))}
            </Tabs>
        </Box>
    );
}

export default DraftTabs;
