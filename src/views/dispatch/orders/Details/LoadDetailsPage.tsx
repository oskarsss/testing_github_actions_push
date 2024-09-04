import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { selectOrderById } from '@/store/storage/orders/selectors';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { OrdersDataActions, OrdersDataSelectors } from '@/store/storage/orders/slice';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import LoadDetailsView from './LoadDetailsView';
import LoadDetailsStyled from './LoadDetailsPage.styled';

export default function LoadDetailsPage() {
    const dispatch = useAppDispatch();
    const { id } = useRouter().query;

    const load = useAppSelector(selectOrderById(id as string));
    const ordersDataLoading = useAppSelector(OrdersDataSelectors.getOrdersIsLoading);

    const { isLoading } = LoadsGrpcService.endpoints.getLoad.useQueryState({
        loadId: id as string
    });

    useEffect(() => {
        if (!load && !ordersDataLoading) {
            dispatch(LoadsGrpcService.endpoints.getLoad.initiate({ loadId: id as string }))
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
    }, [id, load, ordersDataLoading]);

    if (ordersDataLoading || isLoading) {
        return <Preloader />;
    }

    if (!load) return null;
    return (
        <LoadDetailsStyled.Wrapper>
            <LoadDetailsView
                load={load}
                sxContainer={{
                    padding: '28px 28px 0 28px'
                }}
            />
        </LoadDetailsStyled.Wrapper>
    );
}
