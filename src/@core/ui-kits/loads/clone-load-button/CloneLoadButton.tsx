import { useConfirm } from '@/@core/components/confirm-dialog';
import LoadDraftsGrpcService, {
    LS_SELECTED_DRAFT_ID
} from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { DraftsActions } from '@/store/drafts/slice';
import { useAppDispatch } from '@/store/hooks';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import { LoadingButton } from '@mui/lab';
import { createSvgIcon } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = { loadId: string };

const CloneIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
    >
        <path
            d="M5.41349 3.06901C5.25 3.38988 5.25 3.80992 5.25 4.65V10.35C5.25 11.1901 5.25 11.6101 5.41349 11.931C5.5573 12.2132 5.78677 12.4427 6.06901 12.5865C6.38988 12.75 6.80992 12.75 7.65 12.75H13.35C14.1901 12.75 14.6101 12.75 14.931 12.5865C15.2132 12.4427 15.4427 12.2132 15.5865 11.931C15.75 11.6101 15.75 11.1901 15.75 10.35V4.65C15.75 3.80992 15.75 3.38988 15.5865 3.06901C15.4427 2.78677 15.2132 2.5573 14.931 2.41349C14.6101 2.25 14.1901 2.25 13.35 2.25H7.65C6.80992 2.25 6.38988 2.25 6.06901 2.41349C5.78677 2.5573 5.5573 2.78677 5.41349 3.06901Z"
            fill="currentColor"
        />
        <path
            d="M2.25 6.75C2.25 5.92157 2.92157 5.25 3.75 5.25V13.875C3.75 14.0821 3.91789 14.25 4.125 14.25H12.75C12.75 15.0784 12.0784 15.75 11.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V6.75Z"
            fill="currentColor"
        />
    </svg>,
    'CloneIcon'
);

function CloneLoadButton({ loadId }: Props) {
    const [trigger, cloneLoadState] = LoadDraftsGrpcService.useCloneLoadMutation();
    const newLoadDialog = useNewLoadsDialog();
    const { t } = useAppTranslation();

    const confirm = useConfirm();
    const dispatch = useAppDispatch();
    const cloneLoad = () => {
        trigger({
            loadId
        })
            .unwrap()
            .then(({ loadDraftId }) => {
                dispatch(DraftsActions.SetSelectedDraftId(loadDraftId));
                localStorage.setItem(LS_SELECTED_DRAFT_ID, loadDraftId);
                newLoadDialog.open({});
            });
    };

    const onClick = () => {
        confirm({
            title       : 'core:basic.load.clone_button.confirm.title',
            body        : 'core:basic.load.clone_button.confirm.body',
            onConfirm   : cloneLoad,
            confirm_text: 'common:button.confirm'
        });
    };

    return (
        <LoadingButton
            onClick={onClick}
            variant="outlined"
            startIcon={<CloneIcon />}
            loading={cloneLoadState.isLoading}
            disabled={cloneLoadState.isLoading}
            sx={{
                padding     : '2px 16px',
                fontWeight  : 500,
                fontSize    : 16,
                borderRadius: '8px',
                height      : '36px',
                minWidth    : 'auto',
                borderColor : (theme) => theme.palette.semantic.foreground.brand.primary
            }}
        >
            {t('common:button.clone')}
        </LoadingButton>
    );
}

export default CloneLoadButton;
