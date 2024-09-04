import { PERMISSIONS } from '@/models/permissions/permissions';
import getTranslation from '@/utils/getTranslation';
import { GetStaticPropsContext } from 'next';
import withPermissions from '../../store/app/hooks';
import Tolls from '../../views/accounting/tolls/Tolls';

export default withPermissions(Tolls, PERMISSIONS.TOLLS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['tolls']))
        }
    };
}
