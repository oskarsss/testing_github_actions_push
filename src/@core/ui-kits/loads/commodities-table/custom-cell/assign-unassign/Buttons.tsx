import { styled } from '@mui/material/styles';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IconButton, Tooltip } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';

const ButtonWrapper = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    justifyItems  : 'center',
    width         : '100%',
    height        : '33px'
});

type Props = {
    disabled: boolean;
    isLoading: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const AssignButton = ({
    disabled,
    isLoading,
    onClick
}: Props) => {
    const { t } = useAppTranslation('modals');
    return (
        <ButtonWrapper onClick={onClick}>
            <Tooltip
                title={t('manifests.stop.tooltips.assign_to_load_stop')}
                disableInteractive
                placement="bottom-start"
                disableHoverListener={disabled}
            >
                <IconButton
                    sx={{
                        padding: '2px',
                        opacity: disabled || isLoading ? 0.5 : 1,
                        svg    : {
                            width : '14px',
                            height: '14px',
                            fill  : (theme) => theme.palette.semantic.foreground.primary
                        },
                        '&:hover': {
                            svg: {
                                fill: (theme) => theme.palette.utility.foreground.success.primary
                            }
                        }
                    }}
                    size="small"
                    disabled={disabled || isLoading}
                >
                    <VectorIcons.AssignIcon />
                </IconButton>
            </Tooltip>
        </ButtonWrapper>
    );
};

const UnassignButton = ({
    disabled,
    isLoading,
    onClick
}: Props) => {
    const { t } = useAppTranslation('modals');

    return (
        <ButtonWrapper onClick={onClick}>
            <Tooltip
                title={t('manifests.stop.tooltips.unassign_from_load_stop')}
                disableInteractive
                placement="bottom-start"
                disableHoverListener={disabled}
            >
                <IconButton
                    size="small"
                    sx={{
                        padding: '2px',
                        opacity: disabled || isLoading ? 0.5 : 1,
                        svg    : {
                            width : '14px',
                            height: '14px',
                            fill  : (theme) => theme.palette.semantic.foreground.primary
                        },
                        '&:hover': {
                            svg: {
                                fill: (theme) => theme.palette.utility.foreground.error.primary
                            }
                        }
                    }}
                    disabled={disabled || isLoading}
                >
                    <VectorIcons.UnassignIcon />
                </IconButton>
            </Tooltip>
        </ButtonWrapper>
    );
};

const AssignUnassignButtons = {
    AssignButton,
    UnassignButton
};

export default AssignUnassignButtons;
