// ** MUI Imports
import Card from '@mui/material/Card';

import { TrailerProps } from '@/views/fleet/trailers/Details/types';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import TrailerProfileHeader from './components/TrailerProfileHeader/TrailerProfileHeader';
import TrailerProfileInfo from './components/TrailerProfileInfo/TrailerProfileInfo';

export default function Left({ trailer }: TrailerProps) {
    return (
        <LeftStyled.Container>
            <Card>
                <TrailerProfileHeader trailer={trailer} />

                <TrailerProfileInfo trailer={trailer} />
            </Card>
        </LeftStyled.Container>
    );
}
