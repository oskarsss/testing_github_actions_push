import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import { Skeleton } from '@mui/material';

export default function OverviewSkeletonFleet() {
    return (
        <LoadOverviewStyled.Item.Container>
            <LoadOverviewStyled.Item.Container
                style={{
                    gap: 0
                }}
            >
                <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ mr: '8px' }}
                />
                <LoadOverviewStyled.Item.InfoWrapper sx={{ paddingLeft: '3px' }}>
                    <Skeleton
                        variant="text"
                        width="40px"
                    />
                    <Skeleton
                        variant="text"
                        width="100px"
                    />
                </LoadOverviewStyled.Item.InfoWrapper>
            </LoadOverviewStyled.Item.Container>
        </LoadOverviewStyled.Item.Container>
    );
}
