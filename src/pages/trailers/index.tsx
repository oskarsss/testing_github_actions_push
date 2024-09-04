import { PERMISSIONS } from '@/models/permissions/permissions';
import getTranslation from '@/utils/getTranslation';
import Trailers from '@/views/fleet/trailers/Table/Trailers';
import { GetStaticPropsContext } from 'next';
import withPermissions from '../../store/app/hooks';

export default withPermissions(Trailers, PERMISSIONS.TRAILERS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['trailers']))
        }
    };
}
