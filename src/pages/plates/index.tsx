import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Plates from '../../views/fleet/plates/Table/Plates';
import withPermissions from '../../store/app/hooks';

export default withPermissions(Plates, PERMISSIONS.PLATES_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['plates']))
        }
    };
}
