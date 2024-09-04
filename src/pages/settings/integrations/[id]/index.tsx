import Details from '@/views/settings/tabs/Integrations/Details/Details';
import { useRouter } from 'next/router';
import SettingsLayout from '@/views/settings/SettingsLayout';
import withPermissions from '@/store/app/hooks';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext, GetStaticPaths } from 'next';
import getTranslation from '@/utils/getTranslation';

const ProviderPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const provider_id = typeof id === 'string' ? id : '';

    return (
        <SettingsLayout
            turnOffScrollBar
            resetWidthContainer
            sxSection={{
                padding: '40px 16px 16px 16px'
            }}
        >
            <Details provider_id={provider_id} />
        </SettingsLayout>
    );
};

const IntegrationsPage = withPermissions(ProviderPage, PERMISSIONS.SETTINGS_PAGE);

export default IntegrationsPage;

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
