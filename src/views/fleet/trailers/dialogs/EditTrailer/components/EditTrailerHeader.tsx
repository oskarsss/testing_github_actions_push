import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { useEditTrailerForm } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailerForm';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TestIDs } from '@/configs/tests';
import TrailerStatusChipSelect from '@/@core/fields/chip-select/TrailerStatusChipSelect';
import { Stack } from '@mui/material';
import navigateToPage from '@/utils/navigateToPage';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import { TRAILER_STATUS_GRPC } from '@/models/fleet/trailers/trailers-mappings';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { PlateModel } from '@proto/models/model_plate';

type Props = {
    trailer: TrailerModel_Trailer;
    isMutationLoading: boolean;
    plate?: PlateModel;
    onClose: () => void;
};

export default function EditTrailerHeader({
    trailer,
    isMutationLoading,
    plate,
    onClose
}: Props) {
    const router = useRouter();
    const { t } = useAppTranslation();
    const {
        formState: { isDirty }
    } = useEditTrailerForm();
    const confirm = useConfirm();

    const editTrailerDialog = useEditTrailerDialog();
    const [deleteTrailer, {
        isLoading,
        isSuccess
    }] =
        TrailersGrpcService.useDeleteTrailerMutation();

    const onDelete = () => {
        confirm({
            icon            : <DangerousIcon color="secondary" />,
            title           : 'modals:trailers.delete.title',
            body            : 'modals:trailers.delete.body',
            confirm_text    : 'common:button.confirm',
            max_width_dialog: '600px',
            onConfirm       : () => deleteTrailer({ trailerId: trailer.trailerId }),
            cancelTestId    : TestIDs.pages.editTrailer.buttons.cancelDeleteTrailer,
            confirmTestId   : TestIDs.pages.editTrailer.buttons.confirmDeleteTrailer
        });
    };

    useEffect(() => {
        if (isSuccess) {
            editTrailerDialog.close();
            if (router.pathname === '/trailers/[id]') {
                navigateToPage('/trailers');
            }
        }
    }, [isSuccess]);

    return (
        <FullDialog.Header>
            <Stack
                direction="row"
                alignItems="center"
                spacing={3}
                flex={1}
                overflow="hidden"
            >
                <FullDialog.HeaderTitle title="modals:trailers.edit.header.title">
                    <FullDialog.CopyText text={trailer.referenceId} />
                    <FullDialog.Slashed />
                    {plate && plate.state
                        ? `${plate.state}-${plate.number}`
                        : t('common:empty.no_plate')}
                    <FullDialog.Slashed />
                    {trailer.year} {capitalizeFirstLetter(trailer.model)}
                    <FullDialog.Slashed />
                    <FullDialog.CopyText text={trailer.vin} />
                </FullDialog.HeaderTitle>

                <TrailerStatusChipSelect
                    trailer_id={trailer.trailerId}
                    trailer_status={TRAILER_STATUS_GRPC[trailer.status]}
                    buttonTestId={TestIDs.pages.editTrailer.fields.status}
                    optionTestId={TestIDs.components.select.status.optionPrefix}
                />
            </Stack>

            <FullDialog.ActionsWrapper>
                <FullDialog.SaveButton
                    isDisabled={!isDirty}
                    isLoading={false}
                    testId={TestIDs.pages.editTrailer.buttons.saveTrailerEditing}
                    type="update"
                />
                <FullDialog.DeleteButton
                    disabled={false}
                    isLoading={false}
                    onClick={onDelete}
                    testId={TestIDs.pages.editTrailer.buttons.deleteTrailer}
                />
                <FullDialog.ViewButton
                    onClose={editTrailerDialog.close}
                    path={`/trailers/${trailer.trailerId}`}
                    hidden={router.pathname === '/trailers/[id]'}
                />
                <FullDialog.CloseButton
                    onClose={onClose}
                    testId={TestIDs.pages.editTrailer.buttons.close}
                />
            </FullDialog.ActionsWrapper>
        </FullDialog.Header>
    );
}
