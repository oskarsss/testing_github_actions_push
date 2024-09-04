import SafetyManifestDetails from '@/views/dispatch/manifests/details';
import React from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import { useRouter } from 'next/router';

export default function ManifestDetailsPage() {
    const router = useRouter();
    const manifestId = (router.query.id as string) || '';

    return <SafetyManifestDetails manifestId={manifestId} />;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['manifest']))
        }
    };
}
