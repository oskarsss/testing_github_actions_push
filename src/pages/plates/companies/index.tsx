import PlateCompanies from '@/views/fleet/plates/PlateCompanies/PlateCompanies';
import withPermissions from '@/store/app/hooks';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default withPermissions(PlateCompanies, PERMISSIONS.PLATES_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['plates'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['plates']))
        }
    };
}
