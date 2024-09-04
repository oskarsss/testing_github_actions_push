import LoadTypes from '@/views/settings/tabs/Loads/LoadTypes/LoadTypes';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import withPermissions from '../../../../store/app/hooks';
import SettingsLayout from '../../../../views/settings/SettingsLayout';

const PageComponent = () => (
    <SettingsLayout turnOffScrollBar>
        <LoadTypes />
    </SettingsLayout>
);

const LoadTypesPage = withPermissions(PageComponent, PERMISSIONS.SETTINGS_PAGE);

export default LoadTypesPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['settings']))
        }
    };
}
