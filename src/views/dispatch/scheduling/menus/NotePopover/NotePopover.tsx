import CloseIcon from '@mui/icons-material/Close';

import Scheduling from '@/store/dispatch/scheduling/types';
import Notes from '@/@core/components/notes/Notes';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { Box, Popover, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { ButtonClose } from './styled';
import NoMessages from './NoMessages';

type Props = {
    truck_id: Scheduling.TruckManifestRow['truckId'];
};

export const useNotePopover = menuHookFabric(
    NotePopover,
    { cleanContentOnClose: true },
    (props) => (
        <Popover
            {...props}
            anchorReference="anchorPosition"
            transformOrigin={{
                vertical  : 'center',
                horizontal: 'left'
            }}
        />
    )
);

function NotePopover({ truck_id }: Props) {
    const noteMenu = useNotePopover(true);
    const { t } = useAppTranslation();

    return (
        <Box
            maxHeight="550px"
            maxWidth="400px"
            minWidth="400px"
            display="flex"
            flexDirection="column"
        >
            <Box
                display="flex"
                alignItems="center"
                width="100%"
                sx={{
                    borderBottom: ({ palette }) => `1px solid ${palette.semantic.border.secondary}`
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
                >
                    {t('common:profile.center.title.driver_notes')}
                </Typography>

                <ButtonClose
                    type="button"
                    onClick={noteMenu.close}
                >
                    <CloseIcon />
                </ButtonClose>
            </Box>

            <Notes
                entity_type="truckdispatch"
                entity_id={truck_id}
                isHideHeader
                textFieldBottom
                size="small"
                EmptyNotes={NoMessages}
            />
        </Box>
    );
}
