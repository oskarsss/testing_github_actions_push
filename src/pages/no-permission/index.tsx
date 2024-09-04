import { ErrorScreenType } from '@/@core/ui-kits/error-screen/error-screen-config';
import ErrorScreen from '@/@core/ui-kits/error-screen/ErrorScreen';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';

export default function NoPermission() {
    return (
        <ErrorScreen
            onClick={() => {}}
            configType={ErrorScreenType.PERMISSION}
            withoutBorder
            withoutBackground
        />
    );
}

// export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
//     return {
//         props: {
//             messages: await getTranslation(locale)
//         }
//     };
// }

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en'))
        }
    };
}
