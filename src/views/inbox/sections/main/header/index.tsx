import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { NotificationsIcon } from '@/@core/icons/custom-nav-icons/icons';
import { Button, styled, useTheme } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Action = styled(Button)(({ theme }) => ({
    padding                 : '8px 12px',
    border                  : '1px solid',
    borderColor             : theme.palette.semantic.border.secondary,
    boxShadow               : '0px 1px 2px 0px #1018280D',
    color                   : theme.palette.semantic.text.secondary,
    borderRadius            : 6,
    minWidth                : 0,
    '& .MuiButton-startIcon': {
        marginRight: '4px'
    }
}));

export default function Header() {
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    return (
        <PageHeadersKit.Header
            topLeft={(
                <PageHeadersKit.Title
                    Icon={<NotificationsIcon />}
                    title="navigation:items.notifications"
                />
            )}

            // topRight={(
            //     <>
            //         <Action
            //             variant="outlined"
            //             color="secondary"
            //             startIcon={(
            //                 <VectorIcons.Notifications.Slider
            //                     sx={{
            //                         fill: palette.semantic.foreground.primary
            //                     }}
            //                 />
            //             )}
            //         >
            //             {t('notifications:buttons.display')}
            //         </Action>
            //
            //         <Action
            //             variant="outlined"
            //             color="secondary"
            //         >
            //             <VectorIcons.Filter
            //             style={{ fill: palette.semantic.foreground.primary }} />
            //         </Action>
            //
            //         <Action
            //             variant="outlined"
            //             color="secondary"
            //         >
            //             <SettingsIcon sx={{ fill: palette.semantic.foreground.primary }} />
            //         </Action>
            //     </>
            // )}
        />
    );
}
