import { GetStaticPaths, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import { useRouter } from 'next/router';
import ServiceLogDetails from '@/views/maintenance/service-logs/details';

export default function ManifestDetailsPage() {
    const router = useRouter();
    const serviceLogId = (router.query.id as string) || '';

    return <ServiceLogDetails serviceLogId={serviceLogId} />;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['maintenance']))
        }
    };
}
