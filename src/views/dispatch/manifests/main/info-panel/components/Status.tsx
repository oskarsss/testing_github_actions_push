import VectorIcons from '@/@core/icons/vector_icons';
import { MANIFEST_STATUS_GRPC_COLORS } from '@/@core/theme/entities/manifests/status';
import { IconButton, Stack, styled, Tooltip } from '@mui/material';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { useEditManifestDialog } from '@/views/dispatch/manifests/modals/edit-manifest/EditManifest';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React, { useCallback } from 'react';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import type { IChipColors } from '@/@core/theme/chip';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { ENTITY_CHIP_COLORS } from '@/@core/theme/entities';
import { useAppDispatch } from '@/store/hooks';
import { toggleShowPanel } from '@/store/dispatch/manifests/actions/views';

type Props = {
    manifestId: string;
    status?: ManifestModel_Status;
};

const Container = styled('div', {
    shouldForwardProp(propName) {
        return propName !== 'color';
    }
})<{
    color: IChipColors;
}>(({
    theme,
    color
}) => ({
    width          : '100%',
    display        : 'flex',
    borderBottom   : `1px solid ${theme.palette.utility.foreground[color].primary}`,
    backgroundColor: theme.palette.utility.foreground[color].secondary,
    color          : theme.palette.utility.text[color],
    fontSize       : '12px',
    padding        : '4px 16px',
    maxHeight      : '28px',
    alignItems     : 'center',
    justifyContent : 'space-between',
    fontWeight     : 500
}));

function ManifestStatus({
    manifestId,
    status = ManifestModel_Status.UNSPECIFIED
}: Props) {
    const editManifestDialog = useEditManifestDialog();
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const handleClick = useCallback(() => {
        editManifestDialog.open({
            manifestId
        });
    }, [manifestId, editManifestDialog]);

    const statusColor = MANIFEST_STATUS_GRPC_COLORS[status];

    const toggleShowPanelHandler = () => {
        dispatch(toggleShowPanel());
    };

    return (
        <Container color={statusColor}>
            <ManifestStatusChipSelect
                manifestId={manifestId}
                status={status}
                sx={{
                    '&:not(:hover)': {
                        backgroundColor: 'transparent'
                    }
                }}
            />

            <Stack
                direction="row"
                spacing={1}
            >
                <Tooltip
                    title={t('common:tooltips.hide_panel')}
                    placement="top"
                    disableInteractive
                >
                    <IconButton
                        size="small"
                        onClick={toggleShowPanelHandler}
                    >
                        <KeyboardTabIcon
                            sx={{
                                transform: 'rotate(180deg)',
                                color    : (theme) =>
                                    theme.palette.utility.foreground[statusColor]?.primary
                            }}
                            fontSize="small"
                        />
                    </IconButton>
                </Tooltip>

                <Tooltip
                    placement="top"
                    title={t('manifest:panel.tooltips.edit_manifest')}
                >
                    <IconButton
                        size="small"
                        onClick={handleClick}
                        aria-label="Edit manifest"
                    >
                        <VectorIcons.EditIcon
                            sx={{
                                color: ({ palette }) =>
                                    palette.utility.foreground[statusColor]?.primary,
                                fontSize: '16px'
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Container>
    );
}

export default React.memo(ManifestStatus);
