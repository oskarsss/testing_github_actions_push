import TableViews from '@/@core/components/table-views/TableViews';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useMemo } from 'react';
import { useAddCycleDialog } from '../../dialogs/AddCycleDialog';

type ViewsType = {
    view_id: string;
    name: string;
    deleted: boolean;
};

type Props = {
    views: ViewsType[];
    selectedView: string;
    setSelectedView: (id: string) => void;
};

export default function CycleHeader({
    views,
    selectedView,
    setSelectedView
}: Props) {
    const dialog = useAddCycleDialog();
    const { t } = useAppTranslation();

    const add = () => {
        dialog.open({});
    };

    const translateViews = useMemo(
        () =>
            views.map((view) => ({
                ...view,
                viewId: view.view_id,
                name  : t(
                    `settings:settlements.cycles.tabs.${view.deleted ? 'deactivated' : 'active'}`
                )
            })),
        [t, views]
    );

    return (
        <PageHeadersKit.Header
            topLeft={(
                <TableViews
                    selectedViewId={selectedView}
                    selectView={setSelectedView}
                    views={translateViews}
                    isScrollable={false}
                />
            )}
            topRight={(
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<AddIcon />}
                    onClick={add}
                    sx={{
                        width: 'max-content'
                    }}
                >
                    {t('settings:settlements.cycles.buttons.add_new_cycle')}
                </Button>
            )}
        />
    );
}
