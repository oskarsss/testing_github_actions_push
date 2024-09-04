import { MenuItem } from '@mui/material';
import { useViewDialog } from '@/@core/components/table/TableEditor/menus/ViewMenus/ViewDialog';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableTypes from '@/@core/components/table/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import { ReactNode } from 'react';
import { PageModel_Page } from '@proto/models/model_page';
import PagesGrpcService from '@/@grpcServices/services/pages.service';

type Option = {
    title: IntlMessageKey;
    icon: ReactNode;
    mode: string;
};

const config: Option[] = [
    {
        title: 'common:button.edit',
        icon : <EditIcon />,
        mode : 'edit'
    },
    {
        title: 'common:button.duplicate',
        icon : <ContentCopyIcon />,
        mode : 'duplicate'
    },
    {
        title: 'common:button.delete',
        icon : <DeleteIcon />,
        mode : 'delete'
    }
];

type Props = {
    page: PageModel_Page;
    view: TableTypes.View | undefined;
    selectLastItem?: () => void;
};

export const useViewSubMenus = menuHookFabric(ViewSubMenus);

function ViewSubMenus({
    page,
    view,
    selectLastItem
}: Props) {
    const { t } = useAppTranslation();
    const [deleteView, { isLoading: isLoadingDelete }] =
        PagesGrpcService.useDeletePageViewMutation();

    const isLoading = isLoadingDelete;
    const viewDialog = useViewDialog();
    const viewMenu = useViewSubMenus(true);

    const onClick = (mode: string) => {
        switch (mode) {
        case 'delete':
            if (!view) return;
            deleteView({ page, viewId: view.viewId }).unwrap().then(viewMenu.close);
            break;
        case 'edit':
        case 'duplicate':
            viewDialog.open({
                mode,
                page,
                view,
                selectLastItem
            });
            viewMenu.close();
            break;
        default:
        }
    };

    return (
        <>
            {config.map(({
                title,
                icon,
                mode
            }) => (
                <MenuItem
                    onClick={() => onClick(mode)}
                    disabled={isLoading}
                    key={mode}
                >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{t(title)}</ListItemText>
                </MenuItem>
            ))}
        </>
    );
}
