import { useCreateBrokerDialog } from '@/views/dispatch/brokers/dialogs/create-broker/CreateBroker';
import AddIcon from '@mui/icons-material/Add';
import SwitchFilter from '@/@core/components/filters/switch-filter/SwitchFilter';
import { default_broker_filters, useBrokers } from '@/store/dispatch/brokers/hooks';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { BrokersIcon } from '@/@core/icons/custom-nav-icons/icons';
import BrokersHeaderViews from './Views';
import Search from './Search';

export default function BrokersHeader() {
    const {
        filter_id,
        isLoading,
        filters,
        selected_filters
    } = useBrokers(false);

    const createBrokerDialog = useCreateBrokerDialog();

    const handleClickCreate = () => createBrokerDialog.open({});

    return (
        <PageHeadersKit.Header
            topLeft={(
                <>
                    <PageHeadersKit.Title
                        Icon={<BrokersIcon />}
                        title="pages:brokers"
                    />
                    <Search />
                    <BrokersHeaderViews />
                </>
            )}
            topRight={(
                <>
                    <PageHeadersKit.AvatarGroup />
                    <PageHeadersKit.Buttons.Import category_id="brokers" />
                    <PageHeadersKit.Buttons.Export
                        exporter_id="BROKERS_EXPORTER"
                        filters={filters}
                        isNotImplemented
                    />
                    <PageHeadersKit.Divider />
                    <PageHeadersKit.Buttons.Primary
                        onClick={handleClickCreate}
                        title="brokers:header.buttons.add_broker"
                        icon={<AddIcon />}
                    />
                </>
            )}
            bottomLeft={
                !isLoading ? (
                    <>
                        <PageHeadersKit.DateRange
                            labelStart="brokers:header.filters.labels.created_start"
                            labelEnd="brokers:header.filters.labels.created_end"
                            field="broker_created_at"
                            date={selected_filters.broker_created_at}
                            filterId={filter_id}
                        />
                        <PageHeadersKit.Divider />
                        <SwitchFilter
                            label="brokers:header.buttons.unpaid_loads"
                            filterType="unpaid_loads"
                            filterId={filter_id}
                            selectedFilters={selected_filters}
                            isLocalFilter
                        />
                    </>
                ) : (
                    <div />
                )
            }
            bottomRight={(
                <>
                    <SwitchFilter
                        label="common:button.unassigned"
                        filterType="unassigned"
                        filterId={filter_id}
                        selectedFilters={selected_filters}
                        isLocalFilter
                    />
                    <PageHeadersKit.Buttons.ClearFilter
                        filter_id={filter_id}
                        selected_filters={selected_filters}
                        default_filters={default_broker_filters}
                    />
                </>
            )}
        />
    );
}
