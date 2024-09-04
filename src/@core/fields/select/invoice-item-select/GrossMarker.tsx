import { MouseEvent } from 'react';
import { LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory } from '@proto/load_invoice_item_categories';
import { IconButton, Stack } from '@mui/material';
import { GrossLabel } from '@/@core/ui-kits/basic/gross-label/GrossLabel';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    onClick: (
        event: MouseEvent<HTMLButtonElement>,
        category: LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory
    ) => void;
    category: LoadInvoiceItemCategoriesGetReply_LoadInvoiceItemCategory;
};

export default function GrossMarker({
    category,
    onClick
}: Props) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            overflow="hidden"
            position="relative"
        >
            <span>{category?.name}</span>

            <Stack
                direction="row"
                spacing={2}
            >
                {category?.includeInGrossAmount && <GrossLabel />}
                <IconButton
                    onClick={(event) => onClick(event, category)}
                    sx={{ marginLeft: 'auto', padding: '4px' }}
                    aria-label="edit invoice item"
                >
                    <EditIcon sx={{ fontSize: '20px' }} />
                </IconButton>
            </Stack>
        </Stack>
    );
}
