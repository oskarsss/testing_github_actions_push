import getTranslation from '@/utils/getTranslation';
import TrailerDetails from '@/views/fleet/trailers/Details/TrailerDetails';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

export default function TrailerProfile() {
    const router = useRouter();
    const { id } = router.query;
    const trailer_id = id as string;

    return <TrailerDetails trailer_id={trailer_id} />;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['trailers']))
        }
    };
}
