import CommonTabs, { type Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import { memo, type SyntheticEvent } from 'react';
import { TrailerIcon, TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import { useTheme } from '@mui/material';

type Props = {
    vehicleType: VehicleMaintenanceModel_VehicleType;
    handleChange: (e: SyntheticEvent<Element>, value: VehicleMaintenanceModel_VehicleType) => void;
};

function VehicleTabs({
    vehicleType,
    handleChange
}: Props) {
    const { palette } = useTheme();

    const options: Options[] = [
        {
            icon : <TrucksIcon />,
            label: 'entity:truck',
            value: VehicleMaintenanceModel_VehicleType.TRUCK,
            color: 'text.primary'
        },
        {
            icon : <TrailerIcon />,
            label: 'entity:trailer',
            value: VehicleMaintenanceModel_VehicleType.TRAILER,
            color: 'text.primary'
        }
    ];

    return (
        <CommonTabs
            value={vehicleType}
            options={options}
            aria-label="service logs header tabs"
            onChange={handleChange}
            slots={{
                tabsSx: {
                    minHeight   : '34px',
                    borderRadius: '8px'
                },
                tabSx: {
                    textTransform     : 'capitalize',
                    minWidth          : '80px',
                    fontWeight        : 500,
                    '& .MuiStack-root': {
                        svg: {
                            fill: palette.semantic.foreground.primary
                        }
                    }
                }
            }}
        />
    );
}

export default memo(VehicleTabs);
