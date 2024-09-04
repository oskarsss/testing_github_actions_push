import { PropsWithChildren, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { InputAdornment, SvgIconProps } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import TextInput from '@/@core/fields/inputs/TextInput';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import NumberInput from '@/@core/fields/inputs/NumberInput';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { DefaultValues } from './helpers';
import { CLOSE_DAYS } from '../../constants';
import CycleDialogFormCheckboxLabel from './CycleDialogFormCheckboxLabel';

function IconCalendarToday(props: SvgIconProps) {
    return (
        <CalendarTodayIcon
            sx={{
                color      : (theme) => theme.palette.semantic.text.secondary,
                marginRight: '5px',
                transform  : 'none !important'
            }}
            {...props}
        />
    );
}

type Props = PropsWithChildren<{
    methods: UseFormReturn<DefaultValues>;
    submit: (data: DefaultValues) => void;
    title: IntlMessageKey;
    cycleName?: string;
}>;

export default function CycleDialogForm({
    methods,
    submit,
    title,
    children,
    cycleName
}: Props) {
    const { t } = useAppTranslation();
    const {
        control,
        formState: { errors },
        handleSubmit
    } = methods;

    const closingDayOptions = useMemo(
        () =>
            CLOSE_DAYS.map((day) => ({
                ...day,
                label: t(day.label),
                name : t(day.name)
            })),
        [t]
    );

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                Icon={<TimelapseIcon color="primary" />}
                textVariant="h6"
                title={title}
                translationOptions={cycleName ? { cycleName } : undefined}
            />

            <DialogComponents.Fields>
                <DialogComponents.Field xs={8}>
                    <TextInput
                        required
                        label="modals:settings.settlements.cycles.fields.name.label"
                        placeholder="modals:settings.settlements.cycles.fields.name.placeholder"
                        name="name"
                        width="100%"
                        errors={errors}
                        control={control}
                        autoFocus
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={4}>
                    <NumberInput
                        required
                        control={control}
                        errors={errors}
                        name="periodWeeks"
                        label="modals:settings.settlements.cycles.fields.period_weeks.label"
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={4}>
                    <SelectInput
                        required
                        label="modals:settings.settlements.cycles.fields.closing_day.label"
                        name="closingDay"
                        width="100%"
                        options={closingDayOptions}
                        errors={errors}
                        control={control}
                        IconComponent={IconCalendarToday}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={4}>
                    <TextInput
                        required
                        label="modals:settings.settlements.cycles.fields.closing_time.label"
                        placeholder="modals:settings.settlements.cycles.fields.closing_time.placeholder"
                        name="closingTime"
                        width="100%"
                        type="time"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={4}>
                    <NumberInput
                        required
                        control={control}
                        errors={errors}
                        name="payDateDaysAfterClosing"
                        label="modals:settings.settlements.cycles.fields.pay_date_days_after_closing.label"
                        width="100%"
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        multiline
                        label="modals:settings.settlements.cycles.fields.description.label"
                        placeholder="modals:settings.settlements.cycles.fields.description.placeholder"
                        name="description"
                        width="100%"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.Fields
                sx={{
                    marginTop: '10px'
                }}
                columnSpacing={2}
                rowSpacing={1}
            >
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        label={
                            <CycleDialogFormCheckboxLabel description="modals:settings.settlements.cycles.checkboxes.auto_create_period_settlements.label" />
                        }
                        name="autoCreatePeriodSettlements"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        label={
                            <CycleDialogFormCheckboxLabel description="modals:settings.settlements.cycles.checkboxes.auto_create_periods.label" />
                        }
                        name="autoCreatePeriods"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        label={
                            <CycleDialogFormCheckboxLabel description="modals:settings.settlements.cycles.checkboxes.default.label" />
                        }
                        name="default"
                        errors={errors}
                        control={control}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            {children}
        </DialogComponents.Form>
    );
}
