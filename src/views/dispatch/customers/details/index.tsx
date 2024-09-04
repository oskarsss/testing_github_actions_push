import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import { useRouter } from 'next/router';
import { styled } from '@mui/material';
import CustomerSidebar from './sidebar';
import CustomerMain from './main';

// type Props = {}

const SidebarSection = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : '1 0 0',
    background   : theme.palette.semantic.foreground.white.tertiary
}));

const MainSection = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : '3 0 0',
    background   : theme.palette.semantic.foreground.white.tertiary
}));

const Wrapper = styled('div')(({ theme }) => ({
    gap       : theme.spacing(5),
    background: theme.palette.semantic.background.secondary,
    display   : 'flex',
    height    : '100%',
    overflow  : 'hidden'
}));

export default function CustomerDetailsView() {
    const router = useRouter();
    const customerId = router.query.id as string;
    const {
        data,
        isLoading,
        isError
    } = CustomersGrpcService.useRetrieveCustomerQuery({
        customerId
    });

    const customer = data?.customer;

    if (isLoading) {
        return <Preloader />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (customer) {
        return (
            <Wrapper>
                <SidebarSection>
                    <CustomerSidebar customer={customer} />
                </SidebarSection>
                <MainSection>
                    <CustomerMain customer={customer} />
                </MainSection>
            </Wrapper>
        );
    }

    return null;
}
