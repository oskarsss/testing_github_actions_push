import { PERMISSIONS } from '@/models/permissions/permissions';
import withPermissions from '@/store/app/hooks';
import getTranslation from '@/utils/getTranslation';
import { GetStaticPropsContext } from 'next';
import Settlements from '../../views/accounting/settlements/Table/Settlements';

export default withPermissions(Settlements, PERMISSIONS.SETTLEMENTS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settlements']))
        }
    };
}
