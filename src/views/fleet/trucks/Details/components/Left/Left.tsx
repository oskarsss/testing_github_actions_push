// ** MUI Imports
import Card from '@mui/material/Card';
import { Fade } from '@mui/material';

// ** Utils Import
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import TrucksTypes from '@/store/fleet/trucks/types';
import { TruckModel_Truck } from '@proto/models/model_truck';
import TruckProfileHeader from './components/TruckProfileHeader/TruckProfileHeader';
import TruckProfileInfo from './components/TruckProfileInfo/TruckProfileInfo';

type Props = {
    truck: TruckModel_Truck;
};

export default function Left({ truck }: Props) {
    if (!truck) return <div />;

    return (
        <Fade in>
            <LeftStyled.Container>
                <Card>
                    <TruckProfileHeader truck={truck} />

                    <TruckProfileInfo truck={truck} />
                </Card>
            </LeftStyled.Container>
        </Fade>
    );
}
