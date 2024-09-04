import React from 'react';
import { CircularProgress, Fade, IconButton, Tooltip, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import Stack from '@mui/material/Stack';
import { useAppDispatch } from '@/store/hooks';
import { applyTestId, TestIDs } from '@/configs/tests';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { useBrokersMap, useCustomersMap, useDraftsMap } from '@/store/hash_maps/hooks';
import { LoadDraftModel_Status } from '@proto/models/model_load_draft';
import { deleteDraftPreareAction } from '@/store/drafts/actions';
import Router from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import LabelTabStyled from './LabelTab.styled';
import { useNewLoadsDialog } from '../../NewLoads';

type Props = {
    draftId: string;
};

function DraftTabLabel({ draftId }: Props) {
    const dispatch = useAppDispatch();
    const { t } = useAppTranslation();

    const [deleteDraft] = LoadDraftsGrpcService.useDeleteDraftMutation();

    const newLoadsDialog = useNewLoadsDialog();

    const customersMap = useCustomersMap();
    const brokersMap = useBrokersMap();

    const draftsMap = useDraftsMap();

    const handleDeleteDraft = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        const deleted = dispatch(deleteDraftPreareAction(draftId));
        if (deleted) {
            newLoadsDialog.close();
            if (Router.pathname.includes('new-loads')) {
                Router.replace(APP_ROUTES_CONFIG.dispatch.orders.path);
            }
        }
        deleteDraft({ loadDraftId: draftId }).unwrap();
    };
    const draftTab = draftsMap[draftId];
    const broker = brokersMap[draftTab?.brokerId || ''];
    const customer = customersMap[draftTab?.customerId || ''];

    return (
        <LabelTabStyled.Label>
            <LabelTabStyled.DeleteButton
                {...applyTestId(TestIDs.pages.createLoad.buttons.deleteDraftIcon)}
            >
                <Tooltip title={t('new_loads:tooltips.delete_draft')}>
                    <span>
                        <IconButton
                            size="small"
                            sx={{
                                width : '24px',
                                height: '24px'
                            }}
                            disabled={draftTab?.status === LoadDraftModel_Status.EXTRACTING}
                            onClick={handleDeleteDraft}
                        >
                            <CloseOutlinedIcon fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
            </LabelTabStyled.DeleteButton>
            <LabelTabStyled.Status>
                {!broker && !customer && (
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <FiberNewIcon
                            sx={{
                                fontSize: '24px'
                            }}
                        />
                        <span style={{ fontSize: '16px' }}>{t('new_loads:labels.new_draft')}</span>
                    </Stack>
                )}
                {(broker || customer) && (
                    <Typography
                        fontSize="16px"
                        fontWeight={500}
                        textOverflow="ellipsis"
                        overflow="hidden"
                        variant="body2"
                        maxWidth="230px"
                        whiteSpace="nowrap"
                    >
                        {broker?.name || broker?.nameAndMc || customer?.name || ''}
                    </Typography>
                )}
            </LabelTabStyled.Status>
            <LabelTabStyled.Location>
                {draftTab?.status === LoadDraftModel_Status.EXTRACTING ? (
                    <Fade in>
                        <Stack
                            direction="row"
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.semantic.foreground.brand.secondary,
                                padding     : '1px 4px ',
                                borderRadius: '4px',
                                border      : (theme) =>
                                    `1px solid ${theme.palette.semantic.foreground.brand.primary}`
                            }}
                            spacing={1}
                            alignItems="center"
                        >
                            <CircularProgress
                                size={12}
                                color="primary"
                            />
                            <Typography
                                fontSize="12px"
                                variant="body2"
                                fontWeight={500}
                                color={(theme) => theme.palette.semantic.foreground.brand.primary}
                            >
                                {t('new_loads:labels.extracting')}
                            </Typography>
                        </Stack>
                    </Fade>
                ) : (
                    <Typography
                        fontSize="16px"
                        fontWeight={400}
                        textOverflow="ellipsis"
                        overflow="hidden"
                        variant="body1"
                        maxWidth="230px"
                        whiteSpace="nowrap"
                    >
                        {draftTab?.stops}
                    </Typography>
                )}
            </LabelTabStyled.Location>
        </LabelTabStyled.Label>
    );
}

export default React.memo(DraftTabLabel);
