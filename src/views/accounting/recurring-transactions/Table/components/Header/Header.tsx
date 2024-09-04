import { useRecurringTransactions } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { useMemo } from 'react';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { IconButton, Tooltip } from '@mui/material';
import { RecurringTransactionsIcon, SettingsIcon } from '@/@core/icons/custom-nav-icons/icons';
import AddIcon from '@mui/icons-material/Add';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import openNewWindow from '@/utils/open-new-window';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import PageSwitcher, { Views } from './PageSwitcher';
import Search from './Search';
import { useCreateRecurringTransactionDialog } from '../../../menus/RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import { ViewID } from '../../RecurringTransactions';

type Props = {
    views: Views;
    selected_view_id: ViewID;
    selectViewId: (view_id: ViewID) => void;
};
export default function RecurringTransactionsHeader({
    views,
    selected_view_id,
    selectViewId
}: Props) {
    const createRecurringTransactionDialog = useCreateRecurringTransactionDialog();

    const {
        drivers_filters,
        drivers_filter_id,
        recurring_transactions_filters,
        transaction_filter_id,
        selected_drivers_filter,
        selected_transaction_filter,
        default_drivers_filter,
        default_recurring_transactions_filter,
        isLoading
    } = useRecurringTransactions(false);

    const {
        filter_id,
        filters,
        selected_filters,
        default_filters
    } = useMemo(() => {
        if (selected_view_id === 'transactions') {
            return {
                filters         : recurring_transactions_filters,
                filter_id       : transaction_filter_id,
                selected_filters: selected_transaction_filter,
                default_filters : default_recurring_transactions_filter
            };
        }
        return {
            filters         : drivers_filters,
            filter_id       : drivers_filter_id,
            selected_filters: selected_drivers_filter,
            default_filters : default_drivers_filter
        };
    }, [
        selected_view_id,
        drivers_filters,
        drivers_filter_id,
        recurring_transactions_filters,
        transaction_filter_id,
        selected_drivers_filter,
        selected_transaction_filter,
        default_drivers_filter,
        default_recurring_transactions_filter
    ]);

    const handleClickCreate = () =>
        createRecurringTransactionDialog.open({
            category_id      : '',
            category_type    : 'debit',
            enableChangeType : true,
            setDialogStyled  : true,
            setUpDriverSelect: true
        });

    const handleClickSettings = () => {
        openNewWindow('/settings/settlements/debit-categories');
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<RecurringTransactionsIcon />}
                        title="recurring_transactions:header.title"
                    />
                    <Search />
                    <PageSwitcher
                        views={views}
                        selected_view_id={selected_view_id}
                        selectView={selectViewId}
                    />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="RECURRING_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        title="recurring_transactions:header.buttons.add_recurring"
                        onClick={handleClickCreate}
                        icon={<AddIcon fontSize="medium" />}
                    />
                </>
            )}
            bottomLeft={(
                <>
                    <Tooltip
                        onClick={handleClickSettings}
                        title="recurring_transactions:header.buttons.tooltip.settings"
                        placement="bottom"
                        disableInteractive
                    >
                        <IconButton>
                            <SettingsIcon isActive={false} />
                        </IconButton>
                    </Tooltip>
                    <FiltersContainer>
                        <Filters
                            updateType="redux"
                            filter_id={filter_id}
                            filters={filters}
                            default_filters={default_filters}
                            loading={isLoading}
                            skeleton_count={selected_view_id === 'transactions' ? 1 : 2}
                        />
                    </FiltersContainer>
                </>
            )}
            bottomRight={(
                <>
                    <PageHeadersKit.Buttons.ClearFilter
                        default_filters={default_filters}
                        filter_id={filter_id}
                        updateType="redux"
                        selected_filters={selected_filters}
                    />
                    {selected_view_id === 'drivers' && (
                        <SwitchFilter
                            filterId={filter_id}
                            filterType="uninsured"
                            selectedFilters={selected_filters}
                            isLocalFilter
                            label="fields:uninsured.label"
                            isNegative
                        />
                    )}
                </>
            )}
        />
    );
}
