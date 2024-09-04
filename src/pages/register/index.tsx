import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY } from '@/configs';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import RegisterPage from '../../views/auth/sign-up/SignUp';

const Register = () => (
    <GoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_SITE_KEY ?? ''}

        // siteKey="register"
    >
        <RegisterPage />
    </GoogleReCaptchaProvider>
);

export default Register;

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
        }
    };
}
