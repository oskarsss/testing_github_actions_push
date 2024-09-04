import getTranslation from '@/utils/getTranslation';
import CustomerDetailsView from '@/views/dispatch/customers/details';
import { GetServerSidePropsContext, GetStaticPaths } from 'next';
import React from 'react';

export default function CustomerDetails() {
    return <CustomerDetailsView />;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['customers']))
        }
    };
}
