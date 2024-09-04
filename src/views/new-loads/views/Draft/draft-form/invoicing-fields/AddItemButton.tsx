import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { generateInvoiceItem } from '@/views/new-loads/utils/default-value-generators';
import { useActiveInvoiceItemCategories } from '@/store/dispatch/loads/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { StepButton } from '../../styled';
import { useDraftFormContext } from '../../Draft';

const AddItemButton = () => {
    const {
        setValue,
        getValues
    } = useDraftFormContext();
    const { t } = useAppTranslation();
    const loadInvoiceItemCategories = useActiveInvoiceItemCategories();

    const handlerAddItem = () => {
        const invoicingItem = generateInvoiceItem(
            loadInvoiceItemCategories[0]?.invoiceItemCategoryId
        );
        const { invoiceItems } = getValues();
        setValue('invoiceItems', [...invoiceItems, invoicingItem]);
    };

    return (
        <StepButton
            variant="text"
            size="small"
            style={{ marginLeft: 'auto' }}
            onClick={handlerAddItem}
        >
            <AddOutlinedIcon />
            {t('new_loads:draft.form.buttons.add_line_item')}
        </StepButton>
    );
};

export default AddItemButton;
