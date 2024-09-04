import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
    marginLeft    : '15px',
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'flex-start',
    alignItems    : 'center',
    height        : '50px',
    borderTop     : `1px solid ${theme?.palette.semantic.border.secondary}`,
    paddingTop    : '2px'
}));

export default function Stats() {
    // const { invoice_status_stats } = useInvoices();
    // const {t} = useAppTranslation();

    return (
        <Container>
            {/* {invoice_status_stats.map((stat) => (
                <StatContainer key={stat.value}>
                    <div
                        style={{
                            display       : 'flex',
                            flexDirection : 'row',
                            justifyContent: 'flex-start',
                            alignItems    : 'center'
                        }}
                    >
                        {LOAD_INVOICE_STATUS_ICONS[stat.value]}
                        <div
                            style={{
                                width         : '100%',
                                display       : 'flex',
                                flexDirection : 'row',
                                justifyContent: 'flex-start',
                                alignItems    : 'center'
                            }}
                        >
                            <span style={{ fontWeight: 500 }}>
                                {t(`load.invoice_status.${stat.value}`)}
                            </span>
                        </div>
                        <Amount>
                            {stat.amount} ({stat.count})
                        </Amount>
                    </div>
                </StatContainer>
            ))} */}
        </Container>
    );
}
