import { ListItem, Stack, styled } from '@mui/material';
import TrucksTypes from '@/store/fleet/trucks/types';
import DriverAvatar from '@/@core/components/assign/options/truck-with-driver/DriverAvatar';
import SubTitle from '@/@core/components/assign/options/truck-with-driver/SubTitle';
import Title from '@/@core/components/assign/options/truck-with-driver/Title';
import { memo } from 'react';
import { StatusChipWithDot } from '@/@core/theme/chip';
import { TRUCK_STATUS_COLORS } from '@/@core/theme/entities/truck/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AssignTypes from '@/@core/components/assign/types';

const Item = styled(ListItem)({
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    width         : '100%',
    paddingLeft   : '0 !important',
    paddingRight  : '8px',
    gap           : '20px'
});

type Props = AssignTypes.OptionProps<TrucksTypes.ConvertedTruckRow>;

const TruckWithDriverOption = ({
    onClickOption,
    option,
    selectedOptionId,
    onKeyDown,
    setOptionRef
}: Props) => {
    const { t } = useAppTranslation();
    return (
        <Item
            tabIndex={0}
            onKeyDown={onKeyDown}
            ref={setOptionRef}
            onClick={() => onClickOption(option)}
            disabled={selectedOptionId === option.truckId}
            selected={selectedOptionId === option.truckId}
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                gap="10px"
            >
                <DriverAvatar item={option} />

                <Stack direction="column">
                    <Title item={option} />

                    <SubTitle item={option} />
                </Stack>
            </Stack>

            <StatusChipWithDot
                color={TRUCK_STATUS_COLORS[option.status]}
                status={t(`state_info:trucks.status.${option.status}`)}
            />
        </Item>
    );
};

export default memo(TruckWithDriverOption);
