import { IconButton, Stack, Typography } from '@mui/material';
import ManifestStatusChipSelect from '@/@core/fields/chip-select/ManifestStatusChipSelect';
import Router from 'next/router';
import { ManifestModel_Status } from '@proto/models/model_manifest';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import VectorIcons from '@/@core/icons/vector_icons';
import { useConfirm } from '@/@core/components/confirm-dialog';
import RelatedManifests from '@/views/dispatch/manifests/details/sections/header/components/RelatedManifests';
import RelatedLoads from '@/views/dispatch/manifests/details/sections/header/components/RelatedLoads';
import { memo } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import ManifestDetailsIcons from '../../icons';
import { useUpdateManifestTitleDialog } from '../../../modals/add-title';

const Button = styled(MuiButton)({
    height      : '48px',
    borderRadius: '6px',
    padding     : '0px 18px',
    fontSize    : '16px',
    fontWeight  : 600,
    lineHeight  : 1.4,

    '& svg': {
        fontSize: '20px',
        width   : '20px',
        height  : '20px'
    }
});

type Props = {
    manifestId: string;
    status: ManifestModel_Status;
    friendlyId: string;
    onCloseDialog?: () => void;
    title: string;
    loadIds: string[];
};

function ManifestDetailsHeader({
    friendlyId,
    manifestId,
    status,
    onCloseDialog,
    title,
    loadIds
}: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();
    const addTitleDialog = useUpdateManifestTitleDialog();
    const [deleteManifest, { isLoading }] = ManifestsGrpcService.useDeleteManifestMutation();

    const addTitleHandler = () => {
        addTitleDialog.open({
            title,
            manifestId
        });
    };
    const goBack = () => {
        if (onCloseDialog) {
            onCloseDialog();
            return;
        }
        Router.push('/dispatch/manifests');
    };

    const onDeleteManifest = () => {
        confirm({
            title       : 'modals:manifests.details.confirm.delete.title',
            body        : 'modals:manifests.details.confirm.delete.body',
            confirm_text: 'common:button.delete',
            onConfirm   : () =>
                deleteManifest({ manifestId })
                    .unwrap()
                    .then(() => {
                        if (onCloseDialog) {
                            onCloseDialog();
                        }
                        Router.push('/dispatch/manifests');
                    })
        });
    };

    const onNewTabClick = () => {
        window.open(`/dispatch/manifests/${manifestId}`, '_blank');
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap="16px"
            minHeight="90px"
            maxHeight="90px"
            sx={{
                padding     : '12px 28px 0px 28px',
                borderBottom: ({ palette }) => `1px solid ${palette.semantic.border.primary}`
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap={2}
                flexShrink={0}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    <IconButton
                        size="small"
                        aria-label="back to manifests"
                        onClick={goBack}
                    >
                        <ManifestDetailsIcons.ArrowBack
                            sx={{
                                svg: {
                                    fontSize: 'small',
                                    height  : '20px',
                                    width   : '20px'
                                }
                            }}
                            fontSize="small"
                        />
                    </IconButton>
                    <ManifestDetailsIcons.Title color="primary" />
                    <Typography
                        fontSize="20px"
                        fontWeight={600}
                    >
                        {t('common:manifests.friendlyId', { friendlyId })}
                    </Typography>
                </Stack>
                {!title ? (
                    <MuiButton
                        onClick={addTitleHandler}
                        variant="text"
                        color="secondary"
                        endIcon={<ManifestDetailsIcons.AddTitle />}
                        sx={{
                            color        : (theme) => theme.palette.semantic.text.disabled,
                            textTransform: 'none',
                            fontWeight   : 600,
                            fontSize     : '14px'
                        }}
                    >
                        {t('modals:manifests.buttons.add_title')}
                    </MuiButton>
                ) : (
                    <Stack
                        direction="row"
                        gap={0.5}
                        alignItems="center"
                    >
                        <Typography
                            fontSize="16px"
                            color="initial"
                            fontWeight={500}
                            sx={{
                                color: ({ palette }) => palette.semantic.text.disabled
                            }}
                        >
                            | {title}
                        </Typography>
                        <IconButton
                            size="small"
                            aria-label="edit title"
                            onClick={addTitleHandler}
                        >
                            <ManifestDetailsIcons.AddTitle fontSize="small" />
                        </IconButton>
                    </Stack>
                )}
                <ManifestStatusChipSelect
                    manifestId={manifestId}
                    status={status}
                />
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                gap="8px"
                overflow="hidden"
            >
                <OverlayScrollbarsComponent>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap="8px"
                        paddingY="12px"
                    >
                        <RelatedLoads
                            manifestId={manifestId}
                            openNewTab={!!onCloseDialog}
                        />

                        <RelatedManifests
                            manifestId={manifestId}
                            loadIds={loadIds}
                            openNewTab={!!onCloseDialog}
                        />
                    </Stack>
                </OverlayScrollbarsComponent>

                {Router.pathname !== '/dispatch/manifests/[id]' && (
                    <Button
                        variant="text"
                        color="primary"
                        startIcon={<ManifestDetailsIcons.NewTab />}
                        onClick={onNewTabClick}
                        sx={{ flexShrink: 0 }}
                    >
                        {t('common:button.new_tab')}
                    </Button>
                )}

                {status !== ManifestModel_Status.DELETED && (
                    <Button
                        variant="text"
                        color="error"
                        startIcon={<VectorIcons.TrashIcon />}
                        onClick={onDeleteManifest}
                        disabled={isLoading}
                        sx={{ flexShrink: 0 }}
                    >
                        {t('common:button.delete')}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}

export default memo(ManifestDetailsHeader);
