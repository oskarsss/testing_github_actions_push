import withPermissions from '@/store/app/hooks';
import Ifta from '@/views/reports/ifta/Ifta';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default withPermissions(Ifta, PERMISSIONS.IFTA_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['ifta'])
//         }
//     };
// }
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['ifta']))
        }
    };
}
