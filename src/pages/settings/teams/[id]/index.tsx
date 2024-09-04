import { PERMISSIONS } from '@/models/permissions/permissions';
import withPermissions from '@/store/app/hooks';
import SettingsLayout from '@/views/settings/SettingsLayout';
import TeamProfile from '@/views/settings/tabs/teams/profile';
import React from 'react';
import { GetStaticPropsContext, GetStaticPaths } from 'next';
import getTranslation from '@/utils/getTranslation';

function TeamProfilePage() {
    return (
        <SettingsLayout turnOffScrollBar>
            <TeamProfile />
        </SettingsLayout>
    );
}

const ProtectedTeamProfile = withPermissions(TeamProfilePage, PERMISSIONS.SETTINGS_PAGE);

export default ProtectedTeamProfile;

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
