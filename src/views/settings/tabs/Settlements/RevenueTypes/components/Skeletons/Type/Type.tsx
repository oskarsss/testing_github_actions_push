import { CyclePaper } from '@/views/settings/components/styled';
import HeaderSkeleton from './Header';
import InfoSkeleton from './Info';
import TableSkeleton from './Table';

export default function Type() {
    return (
        <CyclePaper elevation={0}>
            <HeaderSkeleton />
            <InfoSkeleton />
            <TableSkeleton />
        </CyclePaper>
    );
}
