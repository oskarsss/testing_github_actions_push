// ** React Imports
// ** MUI Imports
import Card from '@mui/material/Card';
import { Fade } from '@mui/material';

// ** Utils Import
import DriversTypes from '@/store/fleet/drivers/types';
import { DriverModel_Driver } from '@proto/models/model_driver';
import DriverProfileHeader from './components/DriverProfileHeader/DriverProfileHeader';
import DriverProfileInfo from './components/DriverProfileInfo/DriverProfileInfo';
import LeftStyled from './styled';

type Props = {
    driver: DriverModel_Driver;
};

export default function Left({ driver }: Props) {
    return (
        <Fade in>
            <LeftStyled.Container>
                <Card>
                    <DriverProfileHeader driver={driver} />

                    <DriverProfileInfo driver={driver} />
                </Card>
            </LeftStyled.Container>
        </Fade>
    );
}
