import AddIcon from '@mui/icons-material/Add';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useAddPlateCompanyDialog } from '@/views/fleet/plates/PlateCompanies/dialogs/PlateCompany/AddPlateCompany';

export default function AddCompanyButton() {
    const addCompanyDialog = useAddPlateCompanyDialog();
    const openDialog = () => {
        addCompanyDialog.open({});
    };
    return (
        <PageHeadersKit.Buttons.Primary
            onClick={openDialog}
            title="plates:plate_companies.header.buttons.add_company"
            icon={<AddIcon />}
        />
    );
}
