// ** Styled Components
import withPermissions from '@/store/app/hooks';
import Drivers from '@/views/fleet/drivers/Table/Drivers';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default withPermissions(() => <Drivers />, PERMISSIONS.DRIVERS_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['drivers'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['drivers']))

            // Will be passed to the page component as props
        }
    };
}
