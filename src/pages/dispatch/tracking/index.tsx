import withPermissions from '@/store/app/hooks';
import TrackingPage from '@/views/dispatch/tracking/TrackingPage';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default withPermissions(TrackingPage, PERMISSIONS.LOADS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['tracking', 'new_loads']))
        }
    };
}
