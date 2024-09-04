import { memo } from 'react';
import TruckTooltipForTable from '@/@core/components/table-tooltips/TruckTooltipForTable';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import DriversTypes from '@/store/fleet/drivers/types';
import { AssignText } from '@/views/fleet/trucks/Table/components/Table/columns';

type Props = {
    driver: DriversTypes.ConvertedDriverRow;
};

function Truck({ driver }: Props) {
    return driver.truck ? (
        <TruckTooltipForTable truck_id={driver.truck.truckId} />
    ) : (
        <>
            <ControlPointDuplicateIcon
                color="primary"
                style={{ marginRight: '6px', fontSize: '20px', marginLeft: '10px' }}
            />
            <AssignText />
        </>
    );
}

export default memo(Truck);
