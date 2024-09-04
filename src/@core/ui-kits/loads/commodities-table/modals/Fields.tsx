import DialogComponents from '@/@core/ui-kits/common-dialog';
import { createSvgIcon } from '@mui/material';
import { CommodityModel_PackagingUnit } from '@proto/models/model_commodity';
import type { PropsWithChildren } from 'react';
import { MeasurementUnit } from '@proto/models/measurement_unit';
import { UseFormReturn } from 'react-hook-form';
import TextInput from '@/@core/fields/inputs/TextInput';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { WeightUnit } from '@proto/models/weight_unit';
import MeasurementSelect from './components/MeasurementSelect';
import WeightUnitSelect from './components/WeightUnitSelect';
import CommodityTypeSelect from './components/CommodityTypeSelect';

export type DefaultValues = {
    description: string;
    measurementUnit: MeasurementUnit;
    packagingUnit: CommodityModel_PackagingUnit;
    quantity: number;
    length: number;
    weight: number;
    height: number;
    width: number;
    weightUnit: WeightUnit;
};

type Props = PropsWithChildren<{
    commodityId?: string;
    methods: UseFormReturn<DefaultValues>;
    submit: (data: DefaultValues) => void;
}>;

const DetailsIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.3231 5.16152L12.8945 2.44723C12.3315 2.1657 11.6687 2.1657 11.1057 2.44723L5.67712 5.16151L12.0001 8.32301L18.3231 5.16152ZM4.00012 11.6771V16.764C4.00012 17.5215 4.42813 18.214 5.10569 18.5528L11.1057 21.5528C11.6687 21.8343 12.3315 21.8343 12.8945 21.5528L18.8945 18.5528C19.5721 18.214 20.0001 17.5215 20.0001 16.764V11.6771L14.6709 14.3417C13.9943 14.68 13.1717 14.4616 12.7521 13.8321L12.0001 12.7042L11.2482 13.8321C10.8286 14.4616 10.0059 14.68 9.32931 14.3417L4.00012 11.6771ZM11.9759 10.0157L4.01575 6.02344L2.02881 8.98025L10.0313 13.0026L11.9759 10.0157ZM11.9759 10.0157L13.9979 13.0026L22.0172 9.03787L19.991 6.04956L11.9759 10.0157Z"
            fill="#0A43E1"
        />
    </svg>,
    'CommodityDetails'
);

export default function CommodityFields({
    methods,
    submit,
    children,
    commodityId
}: Props) {
    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Fields
                rowSpacing={2}
                columnSpacing={0}
            >
                <DialogComponents.Header
                    title={`core:basic.load.commodities.dialogs.titles.${
                        commodityId ? 'edit' : 'add'
                    }`}
                />
                <DialogComponents.SectionTitle
                    startIcon={<DetailsIcon />}
                    title="modals:manifests.stop.titles.details"
                />
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        label="core:basic.load.commodities.dialogs.fields.description.label"
                        control={methods.control}
                        errors={methods.formState.errors}
                        name="description"
                        placeholder="core:basic.load.commodities.dialogs.fields.description.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <CommodityTypeSelect
                        control={methods.control}
                        errors={methods.formState.errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <NumericInput
                        required
                        control={methods.control}
                        label="core:basic.load.commodities.dialogs.fields.quantity.label"
                        name="quantity"
                        placeholder="core:basic.load.commodities.dialogs.fields.quantity.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <NumericInput
                        required
                        control={methods.control}
                        label="core:basic.load.commodities.dialogs.fields.weight.label"
                        name="weight"
                        placeholder="core:basic.load.commodities.dialogs.fields.weight.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <WeightUnitSelect
                        control={methods.control}
                        errors={methods.formState.errors}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={3}>
                    <NumericInput
                        control={methods.control}
                        label="core:basic.load.commodities.dialogs.fields.height.label"
                        name="height"
                        placeholder="core:basic.load.commodities.dialogs.fields.height.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <NumericInput
                        control={methods.control}
                        label="core:basic.load.commodities.dialogs.fields.width.label"
                        name="width"
                        placeholder="core:basic.load.commodities.dialogs.fields.width.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <NumericInput
                        control={methods.control}
                        label="core:basic.load.commodities.dialogs.fields.length.label"
                        name="length"
                        placeholder="core:basic.load.commodities.dialogs.fields.length.placeholder"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={3}>
                    <MeasurementSelect
                        control={methods.control}
                        errors={methods.formState.errors}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}
