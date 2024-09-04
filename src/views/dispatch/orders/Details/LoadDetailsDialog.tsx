import { useLayoutSettings } from '@/hooks/useLayoutSettings';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoadsActions } from '@/store/dispatch/loads/slice';
import CloseButton from '@/@core/ui-kits/basic/close-button/CloseButton';
import { ordersPageSelectedOrderSelector } from '@/store/dispatch/loads/selectors';
import LoadDetailsView from './LoadDetailsView';
import LoadDetailsViewStyled from './LoadDetailsView.styled';

const LoadDetailsDialog = ({ maxWidth = 'none' }) => {
    const dispatch = useAppDispatch();

    const order = useAppSelector(ordersPageSelectedOrderSelector);

    const { settings } = useLayoutSettings();

    const onClose = () => dispatch(LoadsActions.ResetSelectedLoad());

    return (
        <LoadDetailsViewStyled.Container
            navCollapsed={settings.navCollapsed}
            isMenuOpen={!!order}
            style={{
                maxWidth
            }}
        >
            {order && <LoadDetailsView load={order} />}

            <CloseButton onClose={onClose} />
        </LoadDetailsViewStyled.Container>
    );
};

export default LoadDetailsDialog;
