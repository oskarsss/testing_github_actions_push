import Container from '@/views/settings/components/Container/Container';
import DriverTypesTable from './components/Table';
import DriverTypeHeader from './components/Header';

export default function DriverTypes() {
    return (
        <Container>
            <DriverTypeHeader />

            <DriverTypesTable />
        </Container>
    );
}
