import getTranslation from '@/utils/getTranslation';
import InboxView from '@/views/inbox/sections/main';
import { GetStaticPropsContext } from 'next';

export default function Inbox() {
    return <InboxView />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale ?? 'en', ['notifications', 'manifest', 'loads']))
        }
    };
}
