import TableViews from '@/@core/components/table-views/TableViews';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAddRevenueTypeDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/RevenueTypeDialog/AddRevenueTypeDialog';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type ViewsType = {
    viewId: string;
    name: string;
};

type Props = {
    views: ViewsType[];
    selectedView: string;
    setSelectedView: (id: string) => void;
};
export default function RevenueTypesHeader({
    views,
    selectedView,
    setSelectedView
}: Props) {
    const { t } = useAppTranslation();
    const dialog = useAddRevenueTypeDialog();
    const add = () => {
        dialog.open({});
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <TableViews
                    selectedViewId={selectedView}
                    selectView={setSelectedView}
                    views={views}
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
                    {t('settings:settlements.revenue_types.header.buttons.add_revenue_type')}
                </Button>
            )}
        />
    );
}
