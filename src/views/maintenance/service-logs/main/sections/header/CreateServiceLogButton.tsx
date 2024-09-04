import AddIcon from '@mui/icons-material/Add';
import PageHeadersKit from '@/@core/ui-kits/page-headers';

export default function CreateServiceLogButton() {
    const handleCreate = () => {};

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
