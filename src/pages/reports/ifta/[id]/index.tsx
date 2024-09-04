import { useRouter } from 'next/router';
import Details from '@/views/reports/ifta/Details/Details';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default function Periods() {
    const router = useRouter();
    const { id } = router.query;
    const period_id = id as string;

    return <Details period_id={period_id} />;
}

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['ifta'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['ifta']))
        }
    };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});
