import CycleHeader from '@/views/settings/tabs/Settlements/Cycles/components/Cycle/Header/Header';
import { useMainPeriods } from '@/store/accounting/settlements/hooks/settlements';
import { Fade } from '@mui/material';
import { CyclePaper, DescriptionWrapper } from '@/views/settings/components/styled';
import SettlementsTypes from '@/store/accounting/settlements/types';
import Typography from '@mui/material/Typography';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import Info from './Info/Info';
import Table from './Table/Table';
import CycleSkeleton from '../Skeletons/Cycle/Cycle';

type Props = {
    cycle: SettlementsTypes.Cycles.Cycle;
};
export default function Cycle({ cycle }: Props) {
    const {
        periods,
        isLoading
    } = useMainPeriods(cycle.cycleId);

    if (isLoading) {
        return <CycleSkeleton />;
    }

    return (
        <Fade
            in
            timeout={1000}
        >
            <CyclePaper
                elevation={0}
                sx={{
                    '&+&': {
                        marginTop: '40px !important'
                    }
                }}
            >
                <CycleHeader
                    periods={periods}
                    cycle={cycle}
                />
                <PageHeadersKit.Divider
                    sx={{
                        width : '100%',
                        height: '1px'
                    }}
                />
                <DescriptionWrapper style={{ display: cycle.description ? 'block' : 'none' }}>
                    <Typography
                        fontWeight={500}
                        variant="body1"
                        component="div"
                        overflow="hidden"
                        sx={{
                            wordBreak: 'break-word'
                        }}
                    >
                        {cycle.description}
                    </Typography>
                </DescriptionWrapper>
                <Info
                    periods={periods}
                    cycle={cycle}
                />

                <Table
                    periods={periods}
                    cycleId={cycle.cycleId}
                />
            </CyclePaper>
        </Fade>
    );
}
