import Container from '@/views/settings/components/Container/Container';
import TrailerTypesTable from '@/views/settings/tabs/Trailers/Types/components/Table';
import DriverTypeHeader from '@/views/settings/tabs/Trailers/Types/components/Header';

export default function TrailerTypes() {
    return (
        <Container>
            <DriverTypeHeader />
            <TrailerTypesTable />
        </Container>
    );
}
