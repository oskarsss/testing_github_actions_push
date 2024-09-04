import { TestIDs, applyTestId } from '@/configs/tests';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

function CloseNewLoadButton() {
    const newLoadsDialog = useNewLoadsDialog();
    const router = useRouter();
    const { t } = useAppTranslation();

    return (
        router.pathname !== '/new-loads' && (
            <Button
                variant="text"
                {...applyTestId(TestIDs.pages.createLoad.buttons.closeDraftsPage)}
                onClick={newLoadsDialog.close}
            >
                {t('common:button.close')}
            </Button>
        )
    );
}

export default memo(CloseNewLoadButton);
