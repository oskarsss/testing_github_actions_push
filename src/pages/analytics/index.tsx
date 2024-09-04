import Analytics from '@/views/analytics/Analytics';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../store/app/hooks';

const AnalyticsPage = () => <Analytics />;

export default withPermissions(AnalyticsPage, PERMISSIONS.HOME_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['analytics']))
        }
    };
}
