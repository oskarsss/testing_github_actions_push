import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { useEditSearchDialog } from '../dialogs/searches/EditSearch';

export const useSearchOptionsMenu = menuHookFabric(SearchOptions);

type Props = {
    search: any;
};

function SearchOptions({ search }: Props) {
    const [deleteSearch, { isLoading: isDeleting }] =
        LoadboardGrpcService.useDeleteSearchMutation();
    const [refreshSearch] = LoadboardGrpcService.useRefreshSearchResultMutation();
    const editDialog = useEditSearchDialog();
    const edit = () => {
        editDialog.open({
            search
        });
    };

    const remove = () => {
        deleteSearch({
            searchId: search.searchId
        });
    };

    const refresh = () => {
        refreshSearch({
            searchId: search.searchId
        });
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                Icon={<EditIcon fontSize="small" />}
                text="common:button.edit"
                onClick={edit}
            />

            {search.status === 2 && (
                <MenuComponents.Item
                    onClick={refresh}
                    Icon={<HistoryIcon fontSize="small" />}
                    text="common:button.refresh"
                />
            )}
            <MenuComponents.DangerItem
                text="common:button.delete"
                onClick={remove}
                Icon={(
                    <DeleteIcon
                        fontSize="small"
                        color="error"
                    />
                )}
                disabled={isDeleting}
            />
        </MenuComponents.List>
    );
}

export default SearchOptions;
