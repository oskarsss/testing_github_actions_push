import AllBilling from '@/views/billing/all/AllBilling';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../store/app/hooks';

export default withPermissions(AllBilling, PERMISSIONS.INVOICES_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['billing'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['billing']))
        }
    };
}
