import { IconButton, Stack, Typography, Tooltip, Avatar } from '@mui/material';
import getInitials from '@/utils/get-initials';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import openNewWindow from '@/utils/open-new-window';
import { TrucksIcon, TrailerIcon } from '@/@core/icons/custom-nav-icons/icons';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { type MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    id?: string;
    type?: 'driver' | 'truck' | 'trailer';
    text?: string;
    img_url?: string;
    is_busy?: boolean;
    onClose: () => void;
};

export default function FleetPopup({
    id,
    type,
    text,
    img_url,
    is_busy,
    onClose = () => {}
}: Props) {
    const { url } = usePrivateFileUrl(img_url);
    const { t } = useAppTranslation();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        onClose();
        openNewWindow(`${type}s/${id}`);
    };

    if (!id) {
        return null;
    }

    return (
        <Stack
            direction="row"
            gap="8px"
            maxWidth="200px"
            minWidth="160px"
        >
            <Avatar
                alt={text}
                src={type === 'driver' ? url : undefined}
                sx={{
                    width       : '24px',
                    height      : '24px',
                    fontSize    : '12px',
                    flexShrink  : 0,
                    borderRadius: type === 'driver' ? '50%' : '4px',

                    svg: {
                        fill: (theme) => theme.palette.semantic.text.secondary
                    }
                }}
            >
                {type === 'truck' && <TrucksIcon />}
                {type === 'trailer' && <TrailerIcon />}
                {type === 'driver' && getInitials(text || '')}
            </Avatar>
            <Typography
                sx={{
                    color       : '#000000',
                    overflow    : 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace  : 'nowrap',
                    flexGrow    : 1
                }}
            >
                {text}
            </Typography>
            {typeof is_busy === 'boolean' && (
                <Typography
                    color={is_busy ? 'error.main' : 'success.main'}
                    sx={{
                        fontSize  : '12px',
                        fontWeight: 500,
                        display   : 'flex',
                        alignItems: 'center',
                        flexShrink: 0,

                        '&:before': {
                            content        : '""',
                            display        : 'inline-block',
                            margin         : '0 4px',
                            width          : '4px',
                            height         : '4px',
                            borderRadius   : '50%',
                            flexShrink     : 0,
                            backgroundColor: is_busy ? 'error.main' : 'success.main'
                        }
                    }}
                >
                    {t(is_busy ? 'common:busy' : 'common:available')}
                </Typography>
            )}
            <Tooltip
                disableInteractive
                title={t('common:tooltips.open_in_new_tab')}
            >
                <IconButton
                    onClick={handleClick}
                    sx={{ width: '24px', height: '24px' }}
                >
                    <ChevronRightIcon color="secondary" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
