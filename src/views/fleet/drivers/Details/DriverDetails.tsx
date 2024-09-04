import Loading from '@/@core/components/page/Loading';
import { DriverModel_Status } from '@proto/models/model_driver';
import DeletedItemError from '@/@core/components/page/DeletedItemError';
import Profile from '@/@core/ui-kits/profiles/components/Profile.styled';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import Left from './components/Left/Left';
import Center from './components/Center/Center';
import Right from './components/Right/Right';

type Props = {
    driver_id: string;
};

export default function DriverDetails({ driver_id }: Props) {
    const driver = useDriverById(driver_id);
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);

    if (isLoading) {
        return <Loading loading={isLoading} />;
    }

    if (driver) {
        return (
            <Profile.Container>
                <Left driver={driver} />
                <Center driver={driver} />
                <Right driver={driver} />
            </Profile.Container>
        );
    }
}
