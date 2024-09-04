import AddIcon from '@mui/icons-material/Add';
import HeaderButton from './HeaderButton';
import { useCreateSettlementDialog } from '../../../../../dialogs/create-settlement/CreateSettlement';

export default function CreateSettlementButton() {
    const createSettlementDialog = useCreateSettlementDialog();

    return (
        <HeaderButton
            title="settlements:header.buttons.create_settlements"
            onClick={createSettlementDialog.open}
            startIcon={<AddIcon fontSize="medium" />}
            variant="contained"
        />
    );
}
