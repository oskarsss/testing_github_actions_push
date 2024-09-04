import BillingLoadPanel from '@/views/billing/BillingLoadPanel/BillingLoadPanel';
import { memo, useCallback } from 'react';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { BillingStoreKey } from '@/store/billing/slice';
import InfoPanel from '@/@core/ui-kits/basic/info-panel/InfoPanel';

type Props = {
    selectedLoadId: string;
    onClose: () => void;
    storeKey: BillingStoreKey;
};

function BillingLoadPanelWrap({
    selectedLoadId,
    onClose,
    storeKey
}: Props) {
    const editLoadDialog = useEditLoadDialog();

    const onClickEditLoad = useCallback(
        (loadId?: string) => {
            if (!loadId) return;
            editLoadDialog.open({
                load_id           : loadId,
                onSuccessfulDelete: onClose
            });
        },
        [editLoadDialog, onClose]
    );
    return (
        <InfoPanel
            isPanelOne={!!selectedLoadId}
            closePanel={onClose}
        >
            <BillingLoadPanel
                storeKey={storeKey}
                onClickEditLoad={onClickEditLoad}
            />
        </InfoPanel>
    );
}

export default memo(BillingLoadPanelWrap);
