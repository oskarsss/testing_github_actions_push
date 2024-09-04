import { PageWrapper } from '@/@core/components/page/components';
import Header from './sections/header/Header';
import Content from './sections/content/Content';

export default function Dispatchers() {
    return (
        <PageWrapper>
            <Header />

            <Content />
        </PageWrapper>
    );
}
