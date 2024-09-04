import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import Language from '@/views/settings/tabs/General/Language/Language';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../../store/app/hooks';
import SettingsLayout from '../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <Language />
    </SettingsLayout>
);

const LanguagePage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default LanguagePage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
