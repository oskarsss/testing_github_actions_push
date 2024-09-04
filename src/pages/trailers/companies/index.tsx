import getTranslation from '@/utils/getTranslation';
import Companies from '@/views/fleet/trailers/TrailerCompanies/Companies';
import { GetStaticPropsContext } from 'next';

export default function TrailerCompanies() {
    return <Companies />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['trailers']))
        }
    };
}
