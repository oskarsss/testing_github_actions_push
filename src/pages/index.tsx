import Spinner from '@/@core/components/spinner/Spinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        router.replace('/home');
    }, [router]);

    return <Spinner />;
}

// export const getStaticProps = (async (context) => {
//     return { props: {
//         // You can get the messages from anywhere you like. The recommended
//         // pattern is to put them in JSON files separated by locale and read
//         // the desired one based on the `locale` received from Next.js.
//         messages: (await import(`../../public/locales/${context.locale}.json`)).default
//     }
//     }
// }) satisfies GetStaticProps<any>
