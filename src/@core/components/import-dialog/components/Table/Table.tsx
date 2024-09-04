import PerfectScrollbar from 'react-perfect-scrollbar';
import { ExtractData } from '@/store/import/hooks';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { Container } from './styled';

type Props = Omit<ExtractData, 'isValidTable'>;
export default function Table({ data }: Props) {
    if (!data.columns) {
        return null;
    }

    return (
        <Container>
            <PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
            >
                <TableHead columns={data.columns} />
                <TableBody
                    rows={data.rows || []}
                    columns={data.columns}
                />
            </PerfectScrollbar>
        </Container>
    );
}
