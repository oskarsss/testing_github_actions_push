import { PERMISSIONS } from '@/models/permissions/permissions';
import getTranslation from '@/utils/getTranslation';
import Trucks from '@/views/fleet/trucks/Table/Trucks';
import { GetStaticPropsContext } from 'next';
import withPermissions from '../../store/app/hooks';

export default withPermissions(Trucks, PERMISSIONS.TRUCKS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['trucks'])),

            // Note that when `now` is passed to the app, you need to make sure the
            // value is updated from time to time, so relative times are updated. See
            // https://next-intl-docs.vercel.app/docs/usage/configuration#global-now-value
            now: new Date().getTime()
        }
    };
}
