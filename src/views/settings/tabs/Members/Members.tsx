import Container from '@/views/settings/components/Container/Container';
import MembersHeader from '@/views/settings/tabs/Members/components/MembersHeader/MembersHeader';
import MembersTable from '@/views/settings/tabs/Members/components/MembersTable/MembersTable';

export default function Members() {
    return (
        <Container
            style={{
                height       : 'auto',
                maxHeight    : '100%',
                paddingBottom: 0
            }}
        >
            <MembersHeader />
            <MembersTable />
        </Container>
    );
}
