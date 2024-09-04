import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { BrokersGrpcService } from '@/@grpcServices/services/brokers.service';
import { useRouter } from 'next/router';
import { styled } from '@mui/material';
import BrokerSidebar from './sidebar';
import BrokerMain from './main';

// type Props = {}

const SidebarSection = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    flex         : '1 0 0',
    minWidth     : '420px',
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

export default function BrokerDetailsView() {
    const router = useRouter();
    const brokerId = router.query.id as string;
    const {
        data,
        isLoading,
        isError
    } = BrokersGrpcService.useRetrieveBrokerQuery({
        brokerId
    });

    const broker = data?.broker;

    if (isLoading) {
        return <Preloader />;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (broker) {
        return (
            <Wrapper>
                <SidebarSection>
                    <BrokerSidebar broker={broker} />
                </SidebarSection>
                <MainSection>
                    <BrokerMain broker={broker} />
                </MainSection>
            </Wrapper>
        );
    }

    return null;
}
