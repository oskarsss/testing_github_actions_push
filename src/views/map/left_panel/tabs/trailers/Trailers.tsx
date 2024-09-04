import { useMemo } from 'react';
import TrailerItem from '@/views/map/left_panel/tabs/trailers/TrailerItem';
import { useAppSelector } from '@/store/hooks';
import { map_trailers_default_filters, useMapTrailers } from '@/views/map/hooks/trailers';
import { filter_id } from '@/views/map/left_panel/components/Filters/TrailersFilters';
import { useAddTrailerDialog } from '@/views/fleet/trailers/dialogs/AddTrailer/AddTrailer';
import Loading from '@/@core/components/page/Loading';
import ErrorDetailsPage from '@/@core/components/page/ErrorDetailsPage';
import EmptyScreen from '@/views/map/left_panel/components/EmptyScreen/EmptyScreen';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';

export default function Trailers() {
    const {
        trailers,
        isLoading
    } = useMapTrailers();
    const search = useAppSelector((state) => state.map.search.trailers);
    const addTrailerDialog = useAddTrailerDialog();
    const editTrailerDialog = useEditTrailerDialog();

    const filteredTrailers = useMemo(() => {
        const serializedSearch = search.trim().toLowerCase();
        if (!serializedSearch) {
            return trailers;
        }

        return trailers.filter((trailer) =>
            `${trailer.referenceId} ${trailer.trailerType?.name} ${trailer.model} ${trailer.ownershipType} ${trailer.make}`
                .toLowerCase()
                .includes(serializedSearch));
    }, [search, trailers]);

    if (isLoading) {
        return <Loading />;
    }

    // if (isError) {
    //     return (
    //         <ErrorDetailsPage
    //             buttonText="common:button.reload"
    //             onClick={refetch}
    //             error={error}
    //         />
    //     );
    // }

    if (!filteredTrailers?.length) {
        const onOpenAddTrailerDialog = () => {
            addTrailerDialog.open({
                onSuccessfulCreate: (trailer_id) => {
                    editTrailerDialog.open({ trailer_id });
                }
            });
        };

        return (
            <EmptyScreen
                tableName="trailers"
                rows={filteredTrailers}
                onCreateItem={onOpenAddTrailerDialog}
                filter_id={filter_id}
                search={search}
                defaultFilters={map_trailers_default_filters}
            />
        );
    }

    return (
        <>
            {filteredTrailers.map((trailer) => (
                <TrailerItem
                    trailer={trailer}
                    key={trailer.trailerId}
                />
            ))}
        </>
    );
}
