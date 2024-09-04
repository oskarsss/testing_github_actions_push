/* eslint-disable no-nested-ternary */
import MenuComponents from '@/@core/ui-kits/menus';
import DateInput from '@/@core/fields/inputs/DateInput';
import TransactionsCategoriesAutocomplete from '@/@core/fields/select/TransactionsCategoriesAutocomplete';
import EditSettlementIcons from '@/views/accounting/settlements/dialogs/edit-settlement/edit-settlement-icons';
import { memo, SyntheticEvent } from 'react';
import SettlementsTypes from '@/store/accounting/settlements/types';
import DriverSelect from '@/@core/fields/select/driver-select/DriverSelect';
import CommonTabs, { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';
import TextInput from '@/@core/fields/inputs/TextInput';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import TotalLine from './TotalLine';

const options: Options[] = [
    {
        label: 'modals:recurring_transactions.tabs.debit',
        icon : <EditSettlementIcons.Overview.Debits />,
        value: 'debit',
        color: '#D92D20'
    },
    {
        label: 'modals:recurring_transactions.tabs.credit',
        icon : <EditSettlementIcons.Overview.Credits />,
        value: 'credit',
        color: '#039855'
    }
];

type Props = {
    control: any;
    errors: any;
    handleChangeType: (event: SyntheticEvent, type: 'debit' | 'credit') => void;
    enableChangeType?: boolean;
    typeValue: 'debit' | 'credit';
    transactions?: SettlementsTypes.RecurringTransactions.Transaction[];
    totalChargedFormatting?: string;
    setUpDriverSelect?: boolean;
    readOnlyChangeCategory?: boolean;
    disableChangeCategory?: boolean;
};

function RecurringTransactionFields({
    control,
    errors,
    handleChangeType,
    typeValue,
    setUpDriverSelect = false,
    enableChangeType = false,
    readOnlyChangeCategory = false,
    disableChangeCategory = false,
    transactions,
    totalChargedFormatting
}: Props) {
    return (
        <MenuComponents.Fields>
            <MenuComponents.Field xs={12}>
                <CommonTabs
                    value={typeValue}
                    options={options}
                    disabledTab={
                        !enableChangeType ? (typeValue === 'credit' ? 'debit' : 'credit') : ''
                    }
                    aria-label="edit settlement tabs"
                    onChange={(event, value) =>
                        enableChangeType ? handleChangeType(event, value) : null}
                />
            </MenuComponents.Field>
            {transactions && (
                <MenuComponents.Field xs={12}>
                    <TotalLine
                        transactions={transactions}
                        totalChargedFormatting={totalChargedFormatting}
                    />
                </MenuComponents.Field>
            )}
            {setUpDriverSelect && (
                <MenuComponents.Field xs={12}>
                    <DriverSelect
                        control={control}
                        hideCreateDriverButton
                    />
                </MenuComponents.Field>
            )}
            <MenuComponents.Field xs={6}>
                <AmountInput
                    control={control}
                    errors={errors}
                    label="fields:amount.label"
                    name="amount"
                    placeholder="fields:amount.placeholder"
                    width="100%"
                    autoFocus
                    step={1}
                />
            </MenuComponents.Field>
            <MenuComponents.Field xs={6}>
                <AmountInput
                    control={control}
                    errors={errors}
                    label="modals:recurring_transactions.fields.max_total_amount.label"
                    name="max_total_amount"
                    placeholder="modals:recurring_transactions.fields.max_total_amount.placeholder"
                    width="100%"
                    step={1}
                />
            </MenuComponents.Field>

            <MenuComponents.Field xs={12}>
                <TransactionsCategoriesAutocomplete
                    label="modals:recurring_transactions.fields.category.label"
                    control={control}
                    type={typeValue}
                    readOnly={readOnlyChangeCategory}
                    disabled={disableChangeCategory}
                />
            </MenuComponents.Field>
            <MenuComponents.Field xs={12}>
                <TextInput
                    control={control}
                    errors={errors}
                    label="fields:note.label"
                    name="note"
                    placeholder="fields:note.placeholder"
                    width="100%"
                />
            </MenuComponents.Field>

            <MenuComponents.Field xs={12}>
                <DateInput
                    control={control}
                    errors={errors}
                    label="modals:recurring_transactions.fields.start_date.label"
                    name="start_date"
                    width="100%"
                    type="date"
                />
            </MenuComponents.Field>
        </MenuComponents.Fields>
    );
}

export default memo(RecurringTransactionFields);
