import { CircularProgress, Tooltip } from '@mui/material';
import React, { memo } from 'react';
import {
    DraftIsCreatingSelector,
    DraftsIsUploadingDocumentSelector
} from '@/store/drafts/selectors';
import { useAppSelector } from '@/store/hooks';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { TestIDs, applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DraftsHeaderStyled from '../DraftsHeader.styled';

function CreateDraftButton() {
    const isCreateLoading = useAppSelector(DraftIsCreatingSelector);
    const isUploadingDocument = useAppSelector(DraftsIsUploadingDocumentSelector);
    const [createDraft] = LoadDraftsGrpcService.useCreateDraftMutation();
    const { t } = useAppTranslation();

    const handleCreateDraft = () => createDraft(true);

    return (
        <span>
            <Tooltip title={t('new_loads:tooltips.add_new_draft')}>
                <DraftsHeaderStyled.CreateDraftButton
                    disabled={isUploadingDocument || isCreateLoading}
                    {...applyTestId(TestIDs.pages.createLoad.buttons.addNewDraft)}
                    aria-label="add new draft"
                    color="primary"
                    onClick={handleCreateDraft}
                >
                    {isCreateLoading ? <CircularProgress size={18} /> : <AddOutlinedIcon />}
                </DraftsHeaderStyled.CreateDraftButton>
            </Tooltip>
        </span>
    );
}

export default memo(CreateDraftButton);
