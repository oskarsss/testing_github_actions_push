import { Box, IconButton, Tooltip } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import openNewWindow from '@/utils/open-new-window';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    path: string;
};

function RouteButton({ path }: Props) {
    const { t } = useAppTranslation();

    const onClick = () => {
        openNewWindow(path);
    };

    return (
        <Tooltip
            disableInteractive
            placement="top"
            title={t('common:tooltips.open_in_new_tab')}
        >
            <Box
                display="flex"
                alignItems="center"
            >
                <IconButton
                    aria-label="route-button"
                    onClick={onClick}
                    size="small"
                >
                    <ArrowForwardIosIcon
                        color="secondary"
                        sx={{
                            width : '16px',
                            height: '16px'
                        }}
                    />
                </IconButton>
            </Box>
        </Tooltip>
    );
}

export default memo(RouteButton);
