import PageHeadersKit from '@/@core/ui-kits/page-headers';
import Views from './Views';

export default function HomeHeader() {
    return <PageHeadersKit.Header topLeft={<Views />} />;
}
