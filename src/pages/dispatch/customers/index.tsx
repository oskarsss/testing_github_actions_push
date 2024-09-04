import withPermissions from '@/store/app/hooks';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import Customers from '../../../views/dispatch/customers/Customers';

export default withPermissions(Customers, PERMISSIONS.CUSTOMERS_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['customers', 'new_loads'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['customers', 'new_loads']))

            // Will be passed to the page component as props
        }
    };
}
