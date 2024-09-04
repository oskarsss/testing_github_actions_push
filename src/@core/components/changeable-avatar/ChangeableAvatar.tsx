import { CSSProperties, DragEvent, memo, MouseEvent, useRef, useState, ChangeEvent } from 'react';
import PartyModeIcon from '@mui/icons-material/PartyMode';
import Typography from '@mui/material/Typography';
import AvatarStyled from '@/@core/components/changeable-avatar/ChangeableAvatar.styled';
import Tooltip from '@mui/material/Tooltip';
import { SxProps, Theme } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    first_name: string | undefined;
    last_name: string | undefined;
    upload: (file: File) => void;
    selfie_thumb_url: string;
    icon?: React.ReactNode;
    icon_tooltip?: string;
    size?: CSSProperties['width'];
    sx_avatar?: SxProps<Theme>;
};

function ChangeableAvatar({
    first_name,
    last_name,
    upload,
    selfie_thumb_url,
    icon,
    icon_tooltip,
    size = 120,
    sx_avatar = {}
}: Props) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const { t } = useAppTranslation('core');

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleChangeSelfie = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const onHandleFileDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data_transfer = e.dataTransfer;
        const file = data_transfer.files[0];

        if (!file) {
            return;
        }

        upload(file);
    };

    const onUploadSelfie = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target as HTMLInputElement;

        if (!files || files.length === 0) {
            return;
        }

        upload(files[0]);
    };

    return (
        <AvatarStyled.Container>
            <AvatarStyled.Wrapper
                onDrop={onHandleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <AvatarStyled.AvatarStyle
                    alt={`${first_name} ${last_name}`}
                    src={selfie_thumb_url}
                    onClick={handleChangeSelfie}
                    sx={{
                        ...sx_avatar,
                        width : size,
                        height: size
                    }}
                >
                    {first_name?.charAt(0).toUpperCase()}
                    {last_name?.charAt(0).toUpperCase()}
                </AvatarStyled.AvatarStyle>
            </AvatarStyled.Wrapper>

            {icon && (
                <Tooltip
                    title={icon_tooltip}
                    sx={{ marginLeft: '90px' }}
                >
                    <AvatarStyled.TypeIcon>{icon}</AvatarStyled.TypeIcon>
                </Tooltip>
            )}

            <AvatarStyled.PopoverStyled
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical  : 'center',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical  : 'center',
                    horizontal: 'center'
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                slotProps={{
                    paper: {
                        style: {
                            width : size,
                            height: size
                        }
                    }
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <PartyModeIcon fontSize="large" />
                    <Typography>{t('changeable_avatar.title')}</Typography>
                </div>
            </AvatarStyled.PopoverStyled>
            <input
                style={{ display: 'none' }}
                onChange={onUploadSelfie}
                ref={inputFileRef}
                accept="image/*"
                name="image"
                type="file"
            />
        </AvatarStyled.Container>
    );
}

export default memo(ChangeableAvatar);
