import Manifests from '@/views/dispatch/manifests/main';
import React from 'react';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default function ManifestsPage() {
    return <Manifests />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['manifest', 'new_loads']))
        }
    };
}
