import React, { useCallback, useState } from 'react';
import Container from '@/views/settings/components/Container/Container';
import MapSettingsHeader from '@/views/settings/components/MapSections/MapSettingsHeader';
import { useForm } from 'react-hook-form';
import { SettingsRetrieveReply_Orders } from '@proto/settings';
import SettingsGrpcService from '@/@grpcServices/services/settings.service';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import OrderPreferencesFields from '@/views/settings/tabs/Company/oreder-preferences/OrderPreferencesFields';

const schema: yup.ObjectSchema<SettingsRetrieveReply_Orders> = yup.object().shape({
    friendlyIdPrefix     : yup.string().defined(),
    friendlyIdStartNumber: yup.number().defined()
});

type Props = {
    ordersData: SettingsRetrieveReply_Orders;
};

export default function OrderPreferences({ ordersData }: Props) {
    const [isEdit, setIsEdit] = useState(false);
    const [updateSettings, { isLoading: loadingUpdate }] =
        SettingsGrpcService.useUpdateSettingsMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            isDirty,
            errors
        }
    } = useForm<SettingsRetrieveReply_Orders>({
        defaultValues: ordersData || SettingsRetrieveReply_Orders.create(),
        values       : ordersData,
        resolver     : yupResolver(schema)
    });

    const onCancel = useCallback(() => {
        reset();
        setIsEdit(false);
    }, [reset]);

    const onSubmit = useCallback(
        (orders: SettingsRetrieveReply_Orders) => {
            updateSettings({ orders })
                .unwrap()
                .then(() => {
                    setIsEdit(false);
                });
        },
        [updateSettings]
    );

    return (
        <Container>
            <MapSettingsHeader
                title="settings:company.titles.order_preferences"
                isEdit={isEdit}
                isDirty={isDirty}
                isLoading={loadingUpdate}
                onSubmit={handleSubmit(onSubmit)}
                onCancel={onCancel}
                onEdit={() => setIsEdit(true)}
            />
            <OrderPreferencesFields
                control={control}
                errors={errors}
                isEdit={isEdit}
            />
        </Container>
    );
}
