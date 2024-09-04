import EditIcon from '@mui/icons-material/Edit';
import LoadHeaderStyled from '@/views/dispatch/orders/Details/sections/load-header/LoadHeader.styled';
import React from 'react';
import { useEditLoadDialog } from '@/views/dispatch/orders/dialogs/EditLoad/EditLoad';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/types';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import { useRouter } from 'next/router';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    load_id: string;
};

export default function ButtonEditLoad({ load_id }: Props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t } = useAppTranslation('common');
    const is_load_details_open = useAppSelector(
        (state: RootState) => !!state.loads.selectedOrderIndex
    );
    const editLoadDialog = useEditLoadDialog();

    const onSuccessfulDelete = () => {
        if (is_load_details_open) {
            dispatch(LoadsActions.ResetSelectedLoad());
        }

        if (Object.keys(router.query).length > 0) {
            router.replace(APP_ROUTES_CONFIG.dispatch.orders.path);
        }
    };

    const onEditLoad = () => {
        editLoadDialog.open({
            load_id,
            onSuccessfulDelete
        });
    };

    return (
        <LoadHeaderStyled.Button
            startIcon={<EditIcon />}
            variant="contained"
            onClick={onEditLoad}
        >
            {t('button.edit')}
        </LoadHeaderStyled.Button>
    );
}
