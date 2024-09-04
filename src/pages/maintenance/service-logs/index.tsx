import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import MaintenanceServiceLogs from '@/views/maintenance/service-logs/main';
import getTranslation from '@/utils/getTranslation';

const ServiceLogs: React.FC = () => <MaintenanceServiceLogs />;

export default ServiceLogs;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['maintenance']))
        }
    };
}
