import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import IftaGrpcService from '@/@grpcServices/services/ifta.service';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { Wrapper, YearBlock, Container } from './styled';
import Periods from './Periods/Periods';

export default function Years() {
    const {
        data,
        isLoading
    } = IftaGrpcService.useGetIftaPeriodsQuery({});

    if (isLoading) {
        return <Preloader />;
    }
    return (
        <Container>
            {data &&
                data.years.map((year) => (
                    <Wrapper key={year.year}>
                        <YearBlock>
                            <CalendarTodayIcon color="secondary" />
                            <Typography variant="h4">{year.year}</Typography>
                        </YearBlock>
                        <Periods year={year} />
                    </Wrapper>
                ))}
        </Container>
    );
}
