import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import MaintenanceOverview from '@/views/maintenance/overview';
import getTranslation from '@/utils/getTranslation';

const Overview: React.FC = () => <MaintenanceOverview />;

export default Overview;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['maintenance']))
        }
    };
}
