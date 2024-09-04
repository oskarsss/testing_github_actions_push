import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Brokers from '../../../views/dispatch/brokers/Brokers';
import withPermissions from '../../../store/app/hooks';

export default withPermissions(Brokers, PERMISSIONS.BROKERS_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['brokers', 'new_loads'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['brokers', 'new_loads']))
        }
    };
}
