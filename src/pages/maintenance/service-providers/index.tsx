import getTranslation from '@/utils/getTranslation';
import MaintenanceServiceProviders from '@/views/maintenance/service-providers/main';
import { GetStaticPropsContext } from 'next';
import React from 'react';

const ServiceProviders: React.FC = () => <MaintenanceServiceProviders />;

export default ServiceProviders;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['maintenance']))
        }
    };
}
