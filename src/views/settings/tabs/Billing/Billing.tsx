import Header from '@/views/settings/tabs/Billing/components/Header/Header';
import { Stack } from '@mui/material';
import Container from '@/views/settings/components/Container/Container';
import PaymentBlock from '@/views/settings/tabs/Billing/components/PaymentBlock/PaymentBlock';
import Plans from '@/views/settings/tabs/Billing/components/Plans/Plans';
import Loading from '@/@core/components/page/Loading';
import Fade from '@mui/material/Fade';
import SettingsBillingGrpcService from '@/@grpcServices/services/settings-billing.service';
import getScrollbarStyles from '@/utils/get-scrollbar-styles';
import InvoiceHistory from './components/InvoiceHistory/InvoiceHistory';
import CancelYourAccount from './components/CancelYourAccount/CancelYourAccount';

export default function Billing() {
    const {
        data: subscription,
        isLoading
    } =
        SettingsBillingGrpcService.useGetSettingsBillingSubscriptionQuery({});

    const {
        data: invoices,
        isLoading: isLoadingInvoices
    } =
        SettingsBillingGrpcService.useGetSettingsBillingInvoicesQuery({});

    const loading = isLoading || isLoadingInvoices;

    return (
        <Container sx={{ padding: 0, gap: 0, position: 'relative', minHeight: '600px' }}>
            <Header />
            {loading ? (
                <Stack
                    height="100%"
                    flexGrow={1}
                    position="relative"
                >
                    <Loading />
                </Stack>
            ) : (
                <Fade
                    in={!loading}
                    timeout={500}
                >
                    <Stack
                        gap="24px"
                        alignItems="stretch"
                        padding="32px"
                        position="static"
                        overflow="hidden"
                        height="100%"
                    >
                        <Plans subscription={subscription ?? null} />

                        <PaymentBlock />

                        <Stack
                            height="100%"
                            overflow="auto"
                            gap="8px"
                            sx={(theme) => ({ ...getScrollbarStyles(theme) })}
                        >
                            <InvoiceHistory invoices={invoices?.invoices} />

                            <CancelYourAccount />
                        </Stack>
                    </Stack>
                </Fade>
            )}
        </Container>
    );
}
