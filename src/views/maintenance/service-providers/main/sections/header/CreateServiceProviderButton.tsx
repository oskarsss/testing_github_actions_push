import AddIcon from '@mui/icons-material/Add';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useCreateServiceProvider } from '@/views/maintenance/service-providers/modals/CreateServiceProvider';

export default function CreateServiceProviderButton() {
    const createServiceProviderDialog = useCreateServiceProvider();

    const handleCreate = () => {
        createServiceProviderDialog.open({});
    };

    return (
        <PageHeadersKit.Buttons.Primary
            onClick={handleCreate}
            icon={<AddIcon />}
            disabled={false}
            size="small"
            title="core:basic.page_headers.buttons.add"
            sx={{
                minWidth: 'fit-content'
            }}
        />
    );
}
