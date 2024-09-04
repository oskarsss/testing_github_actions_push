import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LoadInvoiceDetailsStyled from '@/views/dispatch/orders/Details/sections/load-tabs/load-financials-tab/load-invoice-details/LoadInvoiceDetails.styled';
import { MouseEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function AddItemButton({ onClick }: Props) {
    const { t } = useAppTranslation();
    return (
        <LoadInvoiceDetailsStyled.Button
            onClick={onClick}
            startIcon={(
                <AddOutlinedIcon
                    color="primary"
                    sx={{ fontSize: '16px' }}
                />
            )}
            sx={{ padding: 0 }}
        >
            {t('common:button.add_item')}
        </LoadInvoiceDetailsStyled.Button>
    );
}
