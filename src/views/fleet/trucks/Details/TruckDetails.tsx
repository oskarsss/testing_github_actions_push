import Loading from '@/@core/components/page/Loading';
import ErrorDetailsPage from '@/@core/components/page/ErrorDetailsPage';
import DeletedItemError from '@/@core/components/page/DeletedItemError';
import Profile from '@/@core/ui-kits/profiles/components/Profile.styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TruckModel_Status } from '@proto/models/model_truck';
import { useAppSelector } from '@/store/hooks';
import { selectTruckRowById } from '@/store/storage/trucks/selectors';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import Left from './components/Left/Left';
import Center from './components/Center/Center';
import Right from './components/Right/Rght';

type Props = {
    truck_id: string;
};

export default function TruckDetails({ truck_id }: Props) {
    const { t } = useAppTranslation();
    const truck = useAppSelector(selectTruckRowById(truck_id));
    const isLoading = useAppSelector(TrucksDataSelectors.getIsLoading);

    if (isLoading) return <Loading loading={isLoading} />;

    if (!truck) {
        return <ErrorDetailsPage buttonText="trucks:profile.error.button_text" />;
    }

    if (truck?.status === TruckModel_Status.deleted) {
        return (
            <DeletedItemError
                text="Truck"
                buttonText="trucks:profile.error.button_text"
            />
        );
    }

    return (
        <Profile.Container>
            <Left truck={truck} />
            <Center truck={truck} />
            <Right truck={truck} />
        </Profile.Container>
    );
}
