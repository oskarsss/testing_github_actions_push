import Loading from '@/@core/components/page/Loading';
import ErrorDetailsPage from '@/@core/components/page/ErrorDetailsPage';
import DeletedItemError from '@/@core/components/page/DeletedItemError';
import Profile from '@/@core/ui-kits/profiles/components/Profile.styled';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import { TrailerModel_Status } from '@proto/models/model_trailer';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';
import Left from './components/Left/Left';
import Center from './components/Center/Center';
import Right from './components/Right/Right';

type Props = {
    trailer_id: string;
};

export default function TrailerDetails({ trailer_id }: Props) {
    const trailer = useTrailerById(trailer_id);
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);

    // if (isError) {
    //     return (
    //         <ErrorDetailsPage
    //             error={error}
    //             buttonText="trailers:profile.error.button_text"
    //         />
    //     );
    // }

    if (isLoading || !trailer) {
        return <Loading loading={isLoading} />;
    }

    if (trailer?.status === TrailerModel_Status.DELETED) {
        return (
            <DeletedItemError
                text="Trailer"
                buttonText="trailers:profile.error.button_text"
            />
        );
    }

    return (
        <Profile.Container>
            <Left trailer={trailer} />
            <Center trailer={trailer} />
            <Right trailer={trailer} />
        </Profile.Container>
    );
}
