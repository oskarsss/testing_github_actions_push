import { Button } from '@mui/material';
import React, { memo } from 'react';
import TabIcon from '@mui/icons-material/Tab';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import { useRouter } from 'next/router';
import { DraftsIsUploadingDocumentSelector } from '@/store/drafts/selectors';
import { useAppSelector } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function DraftNewTabButton() {
    const isUploadingDocument = useAppSelector(DraftsIsUploadingDocumentSelector);
    const { t } = useAppTranslation();

    const newLoadsDialog = useNewLoadsDialog();
    const router = useRouter();

    const openNewTab = () => {
        window.open('/new-loads', '_blank');
        newLoadsDialog.close();
    };

    return (
        router.pathname !== '/new-loads' && (
            <Button
                variant="text"
                onClick={openNewTab}
                disabled={isUploadingDocument}
                startIcon={<TabIcon />}
            >
                {t('common:button.new_tab')}
            </Button>
        )
    );
}

export default memo(DraftNewTabButton);
