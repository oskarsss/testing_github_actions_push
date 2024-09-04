import { useConfirm } from '@/@core/components/confirm-dialog';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import SettingTable from '@/views/settings/components/Table/Table';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import { useEditTrailerTypeDialog } from '../dialogs/EditTrailerType';
import { useAddTrailerTypeDialog } from '../dialogs/AddTrailerType';
import columns from './columns';

export default function Table() {
    const confirm = useConfirm();
    const editLoadTypeDialog = useEditTrailerTypeDialog();
    const addLoadTypeDialog = useAddTrailerTypeDialog();
    const { emptyArray } = useStableLinks();

    const {
        data,
        isLoading
    } = TrailerTypesGrpcService.useGetTrailerTypesQuery({});
    const [deleteType] = TrailerTypesGrpcService.endpoints.deleteTrailerType.useMutation();

    const executeAction: ExecuteAction<TrailerTypesGetReply_TrailerType> = (
        name,
        {
            row,
            event
        }
    ) => {
        event.preventDefault();
        event.stopPropagation();
        switch (name) {
        case 'edit':
            editLoadTypeDialog.open({ type: row });
            break;
        case 'delete':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'modals:settings.trailer_types.delete.title',
                body              : 'modals:settings.trailer_types.delete.body',
                confirm_text      : 'common:button.delete',
                onConfirm         : () => deleteType({ trailerTypeId: row.trailerTypeId }),
                translationOptions: {
                    body: {
                        code: row.code,
                        name: row.name
                    }
                }
            });
            break;
        default:
            break;
        }
    };

    const openAddTrailerTypeDialog = () => addLoadTypeDialog.open({});

    return (
        <SettingTable<TrailerTypesGetReply_TrailerType>
            rows={data?.trailerTypes ?? emptyArray}
            isLoading={isLoading}
            elementKey="trailerTypeId"
            columns={columns}
            executeAction={executeAction}
            fallbackType={FallbackType.TRAILER_TYPES}
            onClickFallback={openAddTrailerTypeDialog}
        />
    );
}
