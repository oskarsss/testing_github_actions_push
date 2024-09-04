/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { ChangeEvent } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextInput from '@/@core/fields/inputs/TextInput';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import FactoringCompanySelect from '@/@core/fields/select/FactoringCompanySelect';
import FileInput from '@/@core/fields/inputs/FileInput';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import TimezoneSelect from '@/@core/fields/select/TimezoneSelect';
import EmailsInput from '@/@core/fields/inputs/EmailsInput';
import { Control, ErrorOption, FieldValues, Path, useController } from 'react-hook-form';
import PhoneInput from '@/@core/fields/inputs/PhoneInput';
import { PhoneInputWrapper } from '@/views/settings/components/EditableInputsGroup/styled';
import { applyTestId } from '@/configs/tests';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { Stack } from '@mui/material';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useUploadPublicFile } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { invoicePaymentTermsOptions } from './constants';

type Props<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    placeholder: IntlMessageKey;
    required?: boolean;
    isEdit: boolean;
    multiple?: boolean;
};

function Checkbox<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <Stack width="48%">
            <CheckboxInput
                testID={name}
                control={control}
                errors={errors}
                label={label}
                name={name}
                disabled={!isEdit}
                required={required}
            />
        </Stack>
    );
}

function File<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    const { uploadPublicFile } = useUploadPublicFile();
    const {
        field: { onChange }
    } = useController({ name, control });
    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        uploadPublicFile(files).then(({ filePath }) => {
            onChange(filePath);
        });
    };

    return (
        <FileInput
            control={control}
            errors={errors}
            label={label}
            name={name}
            sx={{ width: 'fit-content', maxWidth: '230px' }}
            required={required}
            isEdit={isEdit}
            uploadFile={uploadFile}
        />
    );
}

function State<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <StateSelect
            width="48%"
            control={control}
            errors={errors}
            name={name}
            label={label}
            readOnly={!isEdit}
            disableUnderline={!isEdit}
            variant="standard"
            size="medium"
            testID={name}
            forcePopupIcon={isEdit}
            required={required}
        />
    );
}

function FactoringCompany<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <FactoringCompanySelect
            control={control}
            name={name}
            width="48%"
            readOnly={!isEdit}
            disableUnderline={!isEdit}
        />
    );
}

function Default<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <TextInput
            control={control}
            errors={errors}
            label={label}
            name={name}
            placeholder={!isEdit ? '-' : placeholder}
            width="48%"
            multiline
            inputProps={{
                readOnly: !isEdit,
                sx      : {
                    '&:before, &:after': {
                        opacity: !isEdit ? 0 : 1
                    }
                }
            }}
            testID={name}
            variant="standard"
            size="medium"
            required={required}
        />
    );
}

function InvoicePaymentTerms<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <SelectInput
            width="48%"
            name={name}
            label={label}
            control={control}
            errors={errors}
            options={invoicePaymentTermsOptions}
            variant="standard"
            size="medium"
            disableUnderline={!isEdit}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                readOnly: !isEdit,
                sx      : {
                    textWrap           : 'wrap !important',
                    backgroundColor    : 'transparent !important',
                    '&:before, &:after': {
                        opacity: !isEdit ? 0 : 1
                    },
                    cursor: !isEdit ? 'default' : 'pointer'
                }
            }}
            optionTestID={`option-${name}`}
            IconComponent={isEdit ? ArrowDropDownIcon : 'span'}
            required={required}
        />
    );
}

function Documents<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    const { documentTypes } = useActiveDocumentTypes();

    const options = documentTypes
        .filter((d) => d.entityType === DocumentModel_DocumentEntityType.LOAD)
        .map((item) => ({
            value: item.documentTypeId,
            name : item.title
        }));

    return (
        <SelectInput
            width="48%"
            name={name}
            label={label}
            control={control}
            errors={errors}
            options={options}
            variant="standard"
            size="medium"
            multiple={multiple}
            required={required}
            disableUnderline={!isEdit}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                readOnly: !isEdit,
                sx      : {
                    textWrap           : 'wrap !important',
                    backgroundColor    : 'transparent !important',
                    '&:before, &:after': {
                        opacity: !isEdit ? 0 : 1
                    },
                    cursor: !isEdit ? 'default' : 'pointer'
                }
            }}
            optionTestID={`option-${name}`}
            IconComponent={isEdit ? ArrowDropDownIcon : 'span'}
        />
    );
}

function Timezone<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <TimezoneSelect
            width="48%"
            control={control}
            errors={errors}
            name={name}
            label={label}
            readOnly={!isEdit}
            disableUnderline={!isEdit}
            variant="standard"
            size="medium"
            forcePopupIcon={isEdit}
            required={required}
        />
    );
}

function Emails<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <EmailsInput
            required={required}
            control={control}
            errors={errors}
            label={label}
            name={name}
            isEdit={isEdit}
            hideClearAll={!isEdit}
            placeholder={isEdit ? placeholder : '-'}
            width="48%"
            variant="standard"
            size="medium"
            inputProps={{
                readOnly: !isEdit,
                sx      : {
                    '.MuiInputBase-root': {
                        paddingLeft: 0
                    },
                    '&:before, &:after': {
                        opacity: !isEdit ? 0 : 1
                    },
                    '& .MuiChip-deleteIcon': {
                        display: !isEdit ? 'none' : 'inline-block'
                    }
                },
                ...applyTestId(name)
            }}
        />
    );
}

function PhoneNumber<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <PhoneInputWrapper
            style={{ width: '48%' }}
            isEdit={isEdit}
        >
            <PhoneInput
                control={control}
                errors={errors}
                name={name}
                label={label}
                placeholder={!isEdit ? '-' : placeholder}
                disabled={!isEdit}
                width="100%"
                testID={name}
                required={required}
            />
        </PhoneInputWrapper>
    );
}

function Number<TFieldValues extends FieldValues = FieldValues>({
    control,
    isEdit,
    errors,
    label,
    placeholder,
    name,
    required,
    multiple
}: Props<TFieldValues>) {
    return (
        <NumberInput
            control={control}
            errors={errors}
            label={label}
            name={name}
            width="48%"
            inputProps={{
                readOnly: !isEdit,
                sx      : {
                    '&:before, &:after': {
                        opacity: !isEdit ? 0 : 1
                    }
                }
            }}
            testID={name}
            variant="standard"
            placeholder={!isEdit ? '-' : placeholder}
            size="medium"
            required={required}
        />
    );
}

const MapSectionsInputs = {
    TextInput                : Default,
    NumberInput              : Number,
    PhoneNumberInput         : PhoneNumber,
    FileInput                : File,
    TimezoneSelect           : Timezone,
    InvoicePaymentTermsSelect: InvoicePaymentTerms,
    FactoringCompanySelect   : FactoringCompany,
    EmailsInput              : Emails,
    CheckboxInput            : Checkbox,
    StateSelect              : State,
    DocumentsSelect          : Documents
};

export default MapSectionsInputs;
