import { memo } from 'react';
import TrailerTooltipForTable from '@/@core/components/table-tooltips/TrailerTooltipForTable';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import DriversTypes from '@/store/fleet/drivers/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack } from '@mui/material';
import { AssignText } from '@/views/fleet/trucks/Table/components/Table/columns';

type Props = {
    driver: DriversTypes.ConvertedDriverRow;
};

function Trailer({ driver }: Props) {
    const { t } = useAppTranslation();
    const hasTruckId = !!driver.truck?.truckId;
    return driver.trailer ? (
        <TrailerTooltipForTable trailer_id={driver.trailer.trailerId} />
    ) : (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                cursor: hasTruckId ? 'pointer' : 'not-allowed'
            }}
        >
            <ControlPointDuplicateIcon
                color={hasTruckId ? 'primary' : 'disabled'}
                style={{ marginRight: '6px', fontSize: '20px', marginLeft: '10px' }}
            />

            {/* <span
                style={{
                    color: driver.truck_id ? '#2267FF' : 'grey'
                }}
            >
                {t('fleet.drivers.table.column.assign.label')}
            </span> */}
            <AssignText disabled={!hasTruckId} />
        </Stack>
    );
}

export default memo(Trailer);
