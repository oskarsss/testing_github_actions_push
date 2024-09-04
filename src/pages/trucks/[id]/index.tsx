import { useRouter } from 'next/router';
import Details from '@/views/fleet/trucks/Details/TruckDetails';
import { GetServerSidePropsContext, GetStaticPaths } from 'next';
import getTranslation from '@/utils/getTranslation';

export default function TruckProfile() {
    const router = useRouter();
    const { id } = router.query;
    const truck_id = id as string;

    return <Details truck_id={truck_id} />;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({
    locale,
    defaultLocale
}: GetServerSidePropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['trucks']))
        }
    };
}
