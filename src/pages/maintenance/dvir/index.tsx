import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import MaintenanceDvir from '@/views/maintenance/dvir/main';
import getTranslation from '@/utils/getTranslation';

const Dvir: React.FC = () => <MaintenanceDvir />;

export default Dvir;

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
