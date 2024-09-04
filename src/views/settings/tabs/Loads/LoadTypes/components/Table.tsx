import SettingTable from '@/views/settings/components/Table/Table';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { ExecuteAction } from '@/views/settings/components/Table/types';
import LoadsTypes from '@/store/dispatch/loads/types';
import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import { useEditLoadTypeDialog } from '@/views/settings/tabs/Loads/LoadTypes/dialogs/EditLoadTypeDialog';
import { FallbackType } from '@/views/settings/components/SettingsEmptyScreen';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import columns from './columns';
import { useAddLoadTypeDialog } from '../dialogs/AddLoadTypeDialog';

type Props = {
    loadTypes: LoadsTypes.LoadType[];
    isLoading: boolean;
};

export default function Table({
    loadTypes,
    isLoading
}: Props) {
    const confirm = useConfirm();
    const editLoadTypeDialog = useEditLoadTypeDialog();
    const createLoadTypeDialog = useAddLoadTypeDialog();
    const { emptyArray } = useStableLinks();

    // const {
    //     data,
    //     isLoading
    // } = LoadTypesGrpcService.useGetLoadTypesQuery({});

    const [deleteType] = LoadTypesGrpcService.useDeleteLoadTypeMutation();

    const executeAction: ExecuteAction<LoadsTypes.LoadType> = (name, {
        row,
        event
    }) => {
        event.preventDefault();
        event.stopPropagation();
        switch (name) {
        case 'edit':
            editLoadTypeDialog.open({ type: row });
            break;
        case 'delete':
            confirm({
                icon              : <DangerousIcon color="secondary" />,
                title             : 'settings:loads.load_types.table.confirm.delete.title',
                body              : 'settings:loads.load_types.table.confirm.delete.body',
                confirm_text      : 'common:button.delete',
                translationOptions: {
                    body: {
                        code: row.code,
                        name: row.name
                    }
                },
                onConfirm: () =>
                    deleteType({
                        loadTypeId: row.loadTypeId
                    })
            });
            break;
        default:
            break;
        }
    };

    const openCreateLoadTypeDialog = () => createLoadTypeDialog.open({});

    return (
        <SettingTable<LoadsTypes.LoadType>
            rows={loadTypes || emptyArray}
            isLoading={isLoading}
            elementKey="loadTypeId"
            executeAction={executeAction}
            columns={columns}
            fallbackType={FallbackType.LOAD_TYPES}
            onClickFallback={openCreateLoadTypeDialog}
        />
    );
}
