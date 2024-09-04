/* eslint-disable no-use-before-define */
import { hookFabric } from '@/utils/dialog-hook-fabric';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';
import EditTrailerForm from './EditTrailerForm';

type Props = {
    trailer_id: string;
    document_id?: string;
};

export const useEditTrailerDialog = hookFabric(EditTrailer, FullDialog.Dialog);

export default function EditTrailer({
    trailer_id,
    document_id
}: Props) {
    const dialog = useEditTrailerDialog(true);
    const trailer = useTrailerById(trailer_id);
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);

    // if (isError) {
    //     return (
    //         <FullDialog.FailedFetching
    //             onRetry={() => {}}
    //             onClose={dialog.close}
    //         />
    //     );
    // }

    if (isLoading) return <FullDialog.FetchingProcess />;

    if (!trailer) return null;

    return (
        <EditTrailerForm
            trailer={trailer}
            document_id={document_id}
        />
    );
}
