import DriverDetails from '@/views/fleet/drivers/Details/DriverDetails';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetStaticPaths, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default function DriverProfile() {
    const router = useRouter();
    const { id } = router.query;
    const driver_id = id as string;

    return <DriverDetails driver_id={driver_id} />;
}

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['drivers'])
//         }
//     };
// }

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['drivers']))

            // Will be passed to the page component as props
        }
    };
}
