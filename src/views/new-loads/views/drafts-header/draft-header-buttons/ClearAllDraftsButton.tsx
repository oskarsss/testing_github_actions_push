import { useDraftsState } from '@/@grpcServices/services/loads-drafts-service/load-drafts-service-hooks';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { TestIDs, applyTestId } from '@/configs/tests';
import navigateToPage from '@/utils/navigateToPage';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import { LoadingButton } from '@mui/lab';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { type MouseEvent, memo } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store/hooks';
import { DraftsIsUploadingDocumentSelector } from '@/store/drafts/selectors';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

function ClearAllDraftsButton() {
    const { drafts } = useDraftsState();
    const newLoadsDialog = useNewLoadsDialog();
    const isUploadingDocument = useAppSelector(DraftsIsUploadingDocumentSelector);
    const router = useRouter();
    const { t } = useAppTranslation();

    const [clearAllDrafts, { isLoading: isLoadingClearAllDrafts }] =
        LoadDraftsGrpcService.useClearAllDraftsMutation();

    const handleClearAllDrafts = (e: MouseEvent) => {
        if (router.pathname === '/new-loads') {
            navigateToPage(APP_ROUTES_CONFIG.dispatch.orders.path, e);
        }

        newLoadsDialog.close();
        clearAllDrafts({});
    };

    return (
        <LoadingButton
            variant="text"
            size="small"
            color="secondary"
            onClick={handleClearAllDrafts}
            {...applyTestId(TestIDs.pages.createLoad.buttons.clearAllDrafts)}
            disabled={drafts.length === 0 || isUploadingDocument}
            loading={isLoadingClearAllDrafts}
            startIcon={<DeleteOutlinedIcon />}
        >
            {t('new_loads:buttons.clear_all_drafts')}
        </LoadingButton>
    );
}

export default memo(ClearAllDraftsButton);
