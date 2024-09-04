import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import MaintenanceScheduling from '@/views/maintenance/scheduling/main';
import getTranslation from '@/utils/getTranslation';

const Scheduling: React.FC = () => <MaintenanceScheduling />;

export default Scheduling;

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['maintenance'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['maintenance']))
        }
    };
}
