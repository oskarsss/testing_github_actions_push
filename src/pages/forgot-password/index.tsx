import { GetServerSidePropsContext, GetStaticPaths, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import SendLinkPage from '../../views/auth/forgot-password/SendLinkPage/SendLinkPage';

const ForgotPassword = () => <SendLinkPage />;

export default ForgotPassword;

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale, ['auth'])
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['auth']))

            // Will be passed to the page component as props
        }
    };
}
