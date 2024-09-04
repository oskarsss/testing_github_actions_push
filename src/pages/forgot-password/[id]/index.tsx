import { GetServerSidePropsContext, GetStaticPaths, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import NewPasswordPage from '../../../views/auth/forgot-password/NewPasswordPage/NewPasswordPage';

const ForgotPassword = () => <NewPasswordPage />;

export default ForgotPassword;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['auth']))

            // Will be passed to the page component as props
        }
    };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
    paths   : [], // indicates that no page needs be created at build time
    fallback: 'blocking' // indicates the type of fallback
});
