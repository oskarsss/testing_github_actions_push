import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import SchedulingView from '../../../views/dispatch/scheduling/Scheduling';
import withPermissions from '../../../store/app/hooks';

export default withPermissions(SchedulingView, PERMISSIONS.SCHEDULING_PAGE);

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['schedule', 'manifest', 'new_loads'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['schedule', 'manifest', 'new_loads']))

            // Will be passed to the page component as props
        }
    };
}
