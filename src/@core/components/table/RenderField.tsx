import TableTypes from '@/@core/components/table/types';
import FieldNumber from '@/@core/components/table/fields/FieldNumber';
import FieldDate from '@/@core/components/table/fields/FieldDate';
import FieldText from '@/@core/components/table/fields/FieldText';
import FieldSelect from '@/@core/components/table/fields/FieldSelect';
import FieldCheckbox from '@/@core/components/table/fields/FieldCheckbox';
import { memo } from 'react';
import { FieldModel_Type } from '@proto/models/model_field';
import { FieldValueSetRequest } from '@proto/field';
import { PageModel_Page } from '@proto/models/model_page';

type Props = {
    row: TableTypes.Row & { [key: string]: string };
    selected: boolean;
    executeAction: TableTypes.executeAction;
    value: string;
    fieldType: FieldModel_Type;
    fieldId: string;
    selectValues: string[];
    page?: PageModel_Page;
};

function RenderField({
    row,
    selected,
    executeAction,
    fieldId,
    value,
    fieldType,
    selectValues,
    page
}: Props) {
    const getCommonField = (
        value: string | boolean
    ): FieldValueSetRequest & { page?: PageModel_Page } => ({
        fieldId,
        entityId: row.entityId || '',
        value   : value.toString(),
        page
    });

    if (selected) {
        // eslint-disable-next-line default-case
        switch (fieldType) {
        case FieldModel_Type.FIELD_TYPE_NUMBER:
        case FieldModel_Type.FIELD_TYPE_AMOUNT:
            return (
                <FieldNumber
                    value={value}
                    onChange={(val) => {
                        executeAction('update_field', {
                            row,
                            field: getCommonField(val)
                        });
                    }}
                />
            );
        case FieldModel_Type.FIELD_TYPE_DATE:
            return (
                <FieldDate
                    type="date"
                    value={value}
                    onChange={(val) => {
                        executeAction('update_field', {
                            row,
                            field: getCommonField(val)
                        });
                    }}
                />
            );
        case FieldModel_Type.FIELD_TYPE_DATETIME:
            return (
                <FieldDate
                    type="datetime-local"
                    value={value}
                    onChange={(val) => {
                        executeAction('update_field', {
                            row,
                            field: getCommonField(val)
                        });
                    }}
                />
            );
        case FieldModel_Type.FIELD_TYPE_TEXT:
            return (
                <FieldText
                    value={value}
                    onChange={(val) => {
                        executeAction('update_field', {
                            row,
                            field: getCommonField(val)
                        });
                    }}
                />
            );
        case FieldModel_Type.FIELD_TYPE_SELECT:
            return (
                <FieldSelect
                    value={value}
                    options={selectValues}
                    onChange={(val) => {
                        executeAction('update_field', {
                            row,
                            field: getCommonField(val)
                        });
                    }}
                />
            );
        }
    }

    switch (fieldType) {
    case FieldModel_Type.FIELD_TYPE_CHECKBOX:
        return (
            <FieldCheckbox
                value={value === 'true'}
                onChange={(val) => {
                    executeAction('update_field', {
                        row,
                        field: getCommonField(val)
                    });
                }}
            />
        );
    case FieldModel_Type.FIELD_TYPE_AMOUNT:
        return value ? `$${value}` : '';
    default:
        return value;
    }
}

export default memo(RenderField);
