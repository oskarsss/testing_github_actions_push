import getTranslation from '@/utils/getTranslation';
import AcceptInvite from '@/views/auth/accept-invite';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AcceptInvitePage() {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id && router.isReady) {
            router.replace('/register');
        }
    }, [id, router]);

    return <AcceptInvite token={(id as string) || ''} />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['auth']))
        }
    };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});
