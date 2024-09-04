import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import MaintenanceDefects from '@/views/maintenance/defects/main';
import getTranslation from '@/utils/getTranslation';

const Defects: React.FC = () => <MaintenanceDefects />;

export default Defects;

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
