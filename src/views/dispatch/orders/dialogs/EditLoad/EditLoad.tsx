import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOrderById } from '@/store/storage/orders/selectors';
import { useEffect } from 'react';
import { OrdersDataActions, OrdersDataSelectors } from '@/store/storage/orders/slice';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import EditLoadForm from './EditLoadForm';

type Props = {
    load_id: string;
    document_id?: string;
    onSuccessfulDelete?: () => void;
    settlementParams?: {
        settlementId: string;
        cycleId: string;
        periodId: string;
    };
};

// eslint-disable-next-line no-use-before-define
export const useEditLoadDialog = hookFabric(EditLoad, (props) => (
    <FullDialog.Dialog
        open={props.open}
        onClose={props.onClose}
        onExited={() => props.onExited?.()}
        paperStyles={{
            width: '1700px'
        }}
    >
        {props.children}
    </FullDialog.Dialog>
));

export default function EditLoad({
    load_id,
    document_id,
    onSuccessfulDelete,
    settlementParams
}: Props) {
    const load = useAppSelector(selectOrderById(load_id));
    const ordersDataLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);
    const dispatch = useAppDispatch();
    const { isLoading } = LoadsGrpcService.endpoints.getLoad.useQueryState({
        loadId: load_id
    });

    useEffect(() => {
        if (!load && !ordersDataLoading) {
            dispatch(LoadsGrpcService.endpoints.getLoad.initiate({ loadId: load_id }))
                .unwrap()
                .then((res) => {
                    const newOrder = res.load;
                    if (newOrder) {
                        dispatch(
                            OrdersDataActions.UpdateOrder({ order: newOrder, isCacheUpdate: false })
                        );
                    }
                });
        }
    }, [load_id, load, ordersDataLoading]);

    if (isLoading || ordersDataLoading) {
        return <Preloader />;
    }

    if (!load) return null;

    return (
        <EditLoadForm
            load={load}
            document_id={document_id}
            settlementsParams={settlementParams}
            onSuccessfulDelete={onSuccessfulDelete}
        />
    );
}
