import { useController, useWatch } from 'react-hook-form';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { DriverIcon, VendorIcon } from '@/@core/icons/custom-nav-icons/icons';
import { Box, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { useBatchSendSettlementsForm } from '../../BatchSendSettlements';

const useChooseRecipientMenu = menuHookFabric(ChooseRecipient);

function ChooseRecipient({ onChange }: { onChange: (value: 'driver' | 'vendor') => void }) {
    return (
        <MenuComponents.List>
            <MenuComponents.Item
                Icon={<DriverIcon />}
                text="entity:driver"
                onClick={() => onChange('driver')}
            />
            <MenuComponents.Item
                Icon={<VendorIcon />}
                onClick={() => onChange('vendor')}
                text="entity:vendor"
            />
        </MenuComponents.List>
    );
}

type Props = {
    rowIndex: number;
    driverId: string;
};
export default function Recipient({
    rowIndex,
    driverId
}: Props) {
    const { t } = useAppTranslation();
    const { control } = useBatchSendSettlementsForm();
    const recipient = useWatch({ control, exact: true, name: `sends.${rowIndex}.recipient` });
    const menu = useChooseRecipientMenu();

    const { field } = useController({ control, name: `sends.${rowIndex}.recipient` });
    const mailControl = useController({ control, name: `sends.${rowIndex}.email` });
    const phoneControl = useController({ control, name: `sends.${rowIndex}.phoneNumber` });

    const driversMap = useDriversMap();
    const vendorsMap = useVendorsMap();

    const driver = driversMap[driverId];

    const onChange = (value: 'driver' | 'vendor') => {
        field.onChange(value);
        if (value === 'vendor') {
            const vendor = vendorsMap[driver?.vendorId];
            mailControl.field.onChange(vendor?.contactEmail || '');
            phoneControl.field.onChange(vendor?.contactPhoneNumber || '');
        }
        if (value === 'driver' && driver) {
            mailControl.field.onChange(driver.email);
            phoneControl.field.onChange(driver.phoneNumber);
        }
        menu.close();
    };

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!driver?.vendorId) return;
        menu.open({ onChange })(event);
    };
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
            onClick={onClick}
        >
            <Box
                sx={{
                    display        : 'flex',
                    alignItems     : 'center',
                    width          : '95px',
                    height         : '24px',
                    justifyContent : 'space-between',
                    backgroundColor: ({ palette }) => palette.semantic.background.secondary,
                    border         : ({ palette }) => `1px solid ${palette.semantic.border.secondary}`,
                    borderRadius   : '4px',
                    padding        : '3px 5px',
                    textTransform  : 'capitalize'
                }}
            >
                <Box
                    sx={{
                        display   : 'flex',
                        alignItems: 'center',
                        gap       : 1,
                        svg       : {
                            fill  : (theme) => theme.palette.semantic.foreground.primary,
                            height: '20px',
                            width : '20px'
                        }
                    }}
                >
                    {recipient === 'driver' ? <DriverIcon /> : <VendorIcon />}
                    {t(`entity:${recipient}`)}
                </Box>
                {driver?.vendorId && <ArrowDropDownIcon />}
            </Box>
        </Stack>
    );
}
