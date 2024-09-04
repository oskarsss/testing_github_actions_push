import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import {
    MiniTableColumnType,
    MiniTableExecuteActionType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import React, { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useController, useWatch } from 'react-hook-form';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { FormControl, FormHelperText, InputBaseComponentProps } from '@mui/material';
import NoItems from '../components/NoItems';
import { useDraftFormContext } from '../../Draft';
import { EditTableInput } from '../components/EditableTable/Input';

const CommodityField = () => {
    const { control } = useDraftFormContext();
    const { t } = useAppTranslation();
    const {
        field,
        fieldState
    } = useController({ control, name: 'commodity' });

    return (
        <FormControl fullWidth>
            <EditTableInput
                onBlur={field.onBlur}
                value={field.value}
                onChange={field.onChange}
                InputLabelProps={{
                    shrink: true
                }}
            />
            {fieldState.error && (
                <FormHelperText
                    error
                    id="stepper-linear-commodity"
                >
                    <span>{fieldState.error.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
};

const WeightField = () => {
    const { control } = useDraftFormContext();

    return (
        <NumericInput
            variant="outlined"
            control={control}
            name="weight"
            label=""
            placeholder="new_loads:draft.form.fields.units.placeholder"
            decimalScale={0}
            allowNegative={false}
            step={1}
            endAdornment={(
                <FormHelperText
                    style={{
                        paddingRight: '0px'
                    }}
                >
                    lb
                </FormHelperText>
            )}
            customInput={EditTableInput as React.ComponentType<InputBaseComponentProps>}
        />
    );
};

const columns: MiniTableColumnType<{
    commodity: string;
    weight: number;
}>[] = [
    {
        field      : 'commodity',
        headerName : 'new_loads:draft.form.commodities.header.labels.commodity',
        minWidth   : 250,
        maxWidth   : 300,
        hasMaxWidth: true,
        renderCell : (row) => <CommodityField />,
        flex_start : true
    },
    {
        field      : 'weight',
        headerName : 'new_loads:draft.form.commodities.header.labels.weight',
        minWidth   : 100,
        hasMaxWidth: true,
        renderCell : (row) => <WeightField />,
        flex_start : true
    }

    // {
    //     headerName : '',
    //     field      : 'delete',
    //     minWidth   : 50,
    //     hasMaxWidth: true,
    //     onClick    : (row, {
    //         event,
    //         executeAction
    //     }) => {
    //         executeAction('delete', {
    //             row,
    //             event
    //         });
    //     },
    //     renderCell: () => <DeleteItemButton />
    // }
];
function Table() {
    const { t } = useAppTranslation();
    const {
        control,
        setValue
    } = useDraftFormContext();

    const weight = useWatch({ name: 'weight', control });
    const commodity = useWatch({ name: 'commodity', control });

    const list = [
        {
            key: 'default',
            commodity,
            weight
        }
    ];

    const executeAction: MiniTableExecuteActionType<{
        commodity: string;
        weight: number;
        key: string;
    }> = (name, props) => {
        if (name === 'delete') {
            // eslint-disable-next-line no-console
            setValue('commodity', '');
            setValue('weight', 0);
        }
    };

    return (
        <div
            style={{
                width    : '100%',
                position : 'relative',
                marginTop: '24px'
            }}
        >
            <MiniTable
                columns={columns}
                turnOffBorder
                rows={list}
                elementKey="key"
                executeAction={executeAction}
                emptyStateContent={
                    <NoItems title={t('new_loads:draft.form.commodities.no_items')} />
                }

                // ComponentAfterContent={(
                //     <TotalsRow
                //         without_border
                //         columns={columns}
                //         fontSize="large"
                //         info_config={{
                //             total_amount: `$${total}`
                //         }}
                //         testID={TestIDs.pages.createLoad.fields.totalSumInvoicing}
                //     />
                // )}
            />
        </div>
    );
}

export default memo(Table);
