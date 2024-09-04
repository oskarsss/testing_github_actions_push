import ManifestsTypes from '@/store/dispatch/manifests/types';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import { IconButton } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useEditManifestStopDialog } from '@/views/dispatch/manifests/modals/manifest-stop/EditManifestStop';
import { useEditLoadStopDialog } from '@/views/dispatch/manifests/modals/load-stop/EditLoadStop';
import CopyText from '@/@core/components/copy-text/CopyText';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';

type Props = {
    stop: ManifestsTypes.AnyPreparedStop;
    manifestId: string;
};

export default function FullStopItemNote({
    stop,
    manifestId
}: Props) {
    const editManifestStopDialog = useEditManifestStopDialog();
    const editLoadStopDialog = useEditLoadStopDialog();

    const onEditStop = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (stop.originType === ManifestsTypes.OriginType.MANIFEST) {
            editManifestStopDialog.open({
                manifestId,
                stop
            });
        } else {
            editLoadStopDialog.open({
                stop,
                manifestId
            });
        }
    };

    if (!stop.note) return null;
    return (
        <StopsComponents.StopItemWrapper
            sx={{
                flexDirection: 'row',
                borderLeft   : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                borderBottom : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                borderRight  : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                borderRadius : '0px 0px 4px 4px'
            }}
        >
            <CopyText text={stop.note}>
                <StopsComponents.Text
                    textColor="secondary"
                    sx={{ whiteSpace: 'auto' }}
                >
                    {stop.note}
                </StopsComponents.Text>
            </CopyText>
            <IconButtonWithTooltip
                tooltip="common:tooltips.edit_note"
                onClick={onEditStop}
                icon={<VectorIcons.PenIcon />}
                className="edit-stop-button"
                padding="2px"
                sx={{
                    opacity   : 0,
                    transition: 'opacity 0.3s',
                    svg       : {
                        fontSize: '16px',
                        color   : (theme) => theme.palette.semantic.foreground.primary
                    }
                }}
            />
        </StopsComponents.StopItemWrapper>
    );
}
