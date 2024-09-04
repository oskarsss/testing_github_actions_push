import { PERMISSIONS } from '@/models/permissions/permissions';
import getTranslation from '@/utils/getTranslation';
import { GetStaticPropsContext } from 'next';
import withPermissions from '../../../store/app/hooks';
import OrdersPage from '../../../views/dispatch/orders/main/Loads';

export default withPermissions(OrdersPage, PERMISSIONS.LOADS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['loads', 'new_loads']))
        }
    };
}
