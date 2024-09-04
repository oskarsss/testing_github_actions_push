import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Vendors from '../../views/fleet/vendors/Table/Vendors';
import withPermissions from '../../store/app/hooks';

export default withPermissions(Vendors, PERMISSIONS.VENDORS_PAGE);

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['vendors']))
        }
    };
}
