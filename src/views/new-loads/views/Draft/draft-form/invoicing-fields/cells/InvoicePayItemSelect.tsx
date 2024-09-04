import { memo, MouseEvent, useCallback, useMemo } from 'react';
import { useActiveInvoiceItemCategories } from '@/store/dispatch/loads/hooks';
import { useDraftFormContext } from '@/views/new-loads/views/Draft/Draft';
import { Autocomplete, InputAdornment, Stack } from '@mui/material';
import { GrossLabel } from '@/@core/ui-kits/basic/gross-label/GrossLabel';
import { useController, useWatch } from 'react-hook-form';
import { LoadDraftFields_InvoiceItem } from '@proto/load_drafts';
import createMap from '@/utils/create-map';
import TextField from '@mui/material/TextField';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAddInvoiceItemCategoryDialog } from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/AddInvoiceItemCategory';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditIcon from '@mui/icons-material/Edit';
import { useEditInvoiceItemCategoryDialog } from '@/views/settings/tabs/Loads/InvoiceItemCategories/dialogs/EditInvoiceItemCategory';

type Props = {
    invoiceItemId: LoadDraftFields_InvoiceItem['invoiceItemId'];
};

function InvoicePayItemSelect({ invoiceItemId }: Props) {
    const { t } = useAppTranslation();
    const { control } = useDraftFormContext();
    const loadInvoiceItemCategories = useActiveInvoiceItemCategories();
    const invoiceItems = useWatch({ name: 'invoiceItems', control });
    const addCategoryDialog = useAddInvoiceItemCategoryDialog();
    const editCategoryDialog = useEditInvoiceItemCategoryDialog();

    const invoiceItemIndex = useMemo(
        () => invoiceItems.findIndex((element) => element.invoiceItemId === invoiceItemId),
        [invoiceItems, invoiceItemId]
    );

    const categories = useMemo(
        () =>
            loadInvoiceItemCategories.map((category) => ({
                id   : category.invoiceItemCategoryId,
                label: category.name
            })),
        [loadInvoiceItemCategories]
    );

    const optionsMap = useMemo(() => createMap(categories, 'id'), [categories]);
    const categoriesMap = useMemo(
        () => createMap(loadInvoiceItemCategories, 'invoiceItemCategoryId'),
        [loadInvoiceItemCategories]
    );

    const {
        field: {
            onChange,
            value
        }
    } = useController({ name: `invoiceItems.${invoiceItemIndex}.categoryId`, control });

    const onAdd = useCallback(() => {
        addCategoryDialog.open({
            onAdd: (id) => onChange(id)
        });
    }, [addCategoryDialog, onChange]);

    const openEditDialog = useCallback(
        (categoryId: string) => (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            event.preventDefault();
            editCategoryDialog.open({
                item  : categoriesMap[categoryId],
                onEdit: () => onChange(categoryId)
            });
        },
        [editCategoryDialog, onChange, categoriesMap]
    );

    return (
        <Autocomplete
            size="small"
            id="demo-simple-select-standard"
            value={optionsMap[value]}
            fullWidth
            options={categories}
            disableClearable
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{ ml: 0 }}
                            >
                                {categoriesMap[value]?.includeInGrossAmount && <GrossLabel />}
                                <IconButtonWithTooltip
                                    onClick={onAdd}
                                    tooltip="core:selects.autocomplete.add_button.tooltip"
                                    translateOptions={{ label: t('entity:category') }}
                                    icon={<AddCircleOutlineOutlinedIcon color="primary" />}
                                    padding="0px"
                                    sx={{
                                        ml: '2px'
                                    }}
                                />
                                {params.InputProps.endAdornment}
                            </InputAdornment>
                        )
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Stack
                    component="li"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between !important"
                    gap="5px"
                    {...props}
                >
                    {option.label}
                    <Stack
                        flexDirection="inherit"
                        alignItems="inherit"
                        gap="inherit"
                    >
                        {categoriesMap[option.id]?.includeInGrossAmount && <GrossLabel />}
                        <IconButtonWithTooltip
                            onClick={openEditDialog(option.id)}
                            tooltip="common:button.edit"
                            icon={<EditIcon sx={{ fontSize: '16px' }} />}
                            padding="2px"
                        />
                    </Stack>
                </Stack>
            )}
            sx={{
                borderRadius                        : 0,
                '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: 0
                },
                '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: (theme) => theme.palette.semantic.text.disabled
                },
                '& .MuiInputBase-input': {
                    fontSize  : '12px',
                    fontWeight: 500,
                    padding   : 0
                },
                '& .MuiInputBase-root.MuiInput-root.Mui-focused.MuiInput-underline:after': {
                    border: 'none !important'
                },
                '& .MuiInputBase-root.MuiInput-root.MuiInput-underline:before': {
                    border: 'none !important'
                }
            }}
            onChange={(_, value) => {
                onChange(value?.id || '');
            }}

            // inputProps={{
            //     ...applyTestId(TestIDs.pages.createLoad.fields.invoicingCategory)
            // }}
        />
    );
}

export default memo(InvoicePayItemSelect);
