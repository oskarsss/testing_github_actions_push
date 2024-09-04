import { type MouseEvent, memo, useEffect, useState } from 'react';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { CircularProgress } from '@mui/material';
import { useDraftsState } from '@/@grpcServices/services/loads-drafts-service/load-drafts-service-hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteDraftPreareAction } from '@/store/drafts/actions';
import { applyTestId, TestIDs } from '@/configs/tests';
import navigateToPage from '@/utils/navigateToPage';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import {
    DraftSelectedDraftIdSelector,
    DraftsIsExtractingSelector,
    DraftsIsUploadingDocumentSelector
} from '@/store/drafts/selectors';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import Router from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import SavedIndicator from './SavedIndicator';
import ToolbarStyled from './Toolbar.styled';

type Props = {
    isCreateLoadLoading: boolean;
    isUpdateSuccess: boolean;
    isUpdateLoading: boolean;
};

const Toolbar = ({
    isCreateLoadLoading,
    isUpdateLoading,
    isUpdateSuccess
}: Props) => {
    const dispatch = useAppDispatch();
    const selectedDraftId = useAppSelector(DraftSelectedDraftIdSelector);
    const isUploadingDocument = useAppSelector(DraftsIsUploadingDocumentSelector);
    const isExtractLoading = useAppSelector(DraftsIsExtractingSelector);
    const { t } = useAppTranslation();

    const isDisabled = isExtractLoading || isUploadingDocument;

    const { drafts } = useDraftsState();

    const [saved_recently, setSavedRecently] = useState(false);

    const [deleteDraft] = LoadDraftsGrpcService.useDeleteDraftMutation();
    const newLoadsDialog = useNewLoadsDialog();

    const handlerDeleteDraft = (e: MouseEvent) => {
        const deleted = dispatch(deleteDraftPreareAction(selectedDraftId));

        if (deleted) {
            newLoadsDialog.close();
            if (Router.pathname.includes('new-loads')) {
                Router.replace(APP_ROUTES_CONFIG.dispatch.orders.path);
            }
        }
        deleteDraft({ loadDraftId: selectedDraftId });

        if (drafts.length === 1) {
            navigateToPage(APP_ROUTES_CONFIG.dispatch.orders.path, e);
        }
    };

    useEffect(() => {
        if (!isUpdateLoading && isUpdateSuccess) {
            setSavedRecently(true);
            setTimeout(() => {
                setSavedRecently(false);
            }, 4000);
        }
    }, [isUpdateLoading]);

    return (
        <ToolbarStyled.Container>
            <ToolbarStyled.LeftSide />
            <ToolbarStyled.RightSide>
                <ToolbarStyled.DraftSaved>
                    {isUpdateLoading && (
                        <SavedIndicator
                            Icon={CloudOffIcon}
                            title="new_loads:draft.toolbar.saving_titles.saving"
                        />
                    )}

                    {!isUpdateLoading && !saved_recently && (
                        <SavedIndicator
                            Icon={CloudDoneOutlinedIcon}
                            title="new_loads:draft.toolbar.saving_titles.draft_saved"
                        />
                    )}
                    {!isUpdateLoading && saved_recently && (
                        <SavedIndicator
                            Icon={CloudUploadOutlinedIcon}
                            title="new_loads:draft.toolbar.saving_titles.draft_saved_seconds_ago"
                        />
                    )}
                </ToolbarStyled.DraftSaved>
                <ToolbarStyled.DeleteDraftBtn
                    variant="text"
                    size="small"
                    color="secondary"
                    onClick={handlerDeleteDraft}
                    disabled={isDisabled}
                    {...applyTestId(TestIDs.pages.createLoad.buttons.deleteDraft)}
                >
                    <DeleteOutlinedIcon />
                    {t('new_loads:draft.toolbar.buttons.delete_draft')}
                </ToolbarStyled.DeleteDraftBtn>
                <ToolbarStyled.SubmitLoadBtn
                    disabled={isCreateLoadLoading || isExtractLoading}
                    variant="contained"
                    size="small"
                    type="submit"
                    {...applyTestId(TestIDs.pages.createLoad.buttons.submitLoad)}
                >
                    {isCreateLoadLoading ? (
                        <>
                            <CircularProgress size={16} />
                            {t('new_loads:draft.toolbar.buttons.submitting')}
                        </>
                    ) : (
                        <>
                            <CheckOutlinedIcon />
                            {t('new_loads:draft.toolbar.buttons.submit_load')}
                        </>
                    )}
                </ToolbarStyled.SubmitLoadBtn>
            </ToolbarStyled.RightSide>
        </ToolbarStyled.Container>
    );
};

export default memo(Toolbar);
