import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import StatsView from '../../views/accounting/dispatchers/Dispatchers';
import withPermissions from '../../store/app/hooks';

export default withPermissions(StatsView, PERMISSIONS.DISPATCHERS_SETTLEMENTS_VIEW);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['dispatchers', 'settlements'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['dispatchers', 'settlements']))
        }
    };
}
