import LoadboardContainer from '@/views/loadboard/LoadboardContainer';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

function Loadboard() {
    return <LoadboardContainer />;
}

export default Loadboard;

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['loadboard'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['loadboard']))
        }
    };
}
