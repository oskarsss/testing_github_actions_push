/* eslint-disable import/no-anonymous-default-export */
import { Fade, Grid, Typography, styled } from '@mui/material';
import { PropsWithChildren } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { applyTestId } from '@/configs/tests';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const Subtitle = styled(Typography)(() => ({
    fontSize  : '20px',
    fontWeight: 600,
    variant   : 'subtitle1',
    marginLeft: '15px'
}));

type FieldsProps = PropsWithChildren<{
    rowSpacing?: number;
    columnSpacing?: number;
}>;

function Fields({
    children,
    columnSpacing = 0,
    rowSpacing = 3
}: FieldsProps) {
    return (
        <Grid
            container
            columnSpacing={columnSpacing}
            rowSpacing={rowSpacing}
        >
            {children}
        </Grid>
    );
}

type FieldProps = {
    xs: number;
    children: React.ReactNode;
};

function Field({
    xs,
    children
}: FieldProps) {
    return (
        <Grid
            item
            xs={xs}
        >
            {children}
        </Grid>
    );
}

type FieldsGroupTitleProps = {
    startIcon?: JSX.Element;
    title: IntlMessageKey;
};

function FieldsGroupTitle({
    title,
    startIcon
}: FieldsGroupTitleProps) {
    const { t } = useAppTranslation();
    return (
        <Grid
            item
            container
            direction="row"
            xs={12}
        >
            {startIcon || null}
            <Subtitle>{t(title)}</Subtitle>
        </Grid>
    );
}

function FieldCentered({
    xs,
    children
}: FieldProps) {
    return (
        <Grid
            item
            xs={xs}
            container
            justifyContent="center"
            alignItems="center"
        >
            {children}
        </Grid>
    );
}

type FullDialogFormProps<T extends FieldValues> = PropsWithChildren<{
    methods: UseFormReturn<T>;
    save: (data: T) => void;
    testID?: string;
}>;

function Form<T extends FieldValues>({
    children,
    methods,
    save,
    testID
}: FullDialogFormProps<T>) {
    return (
        <FormProvider {...methods}>
            <Fade in>
                <form
                    {...applyTestId(testID)}
                    key={0}
                    onSubmit={methods.handleSubmit(save)}
                    style={{
                        width        : '100%',
                        height       : '100%',
                        overflowX    : 'auto',
                        display      : 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {children}
                </form>
            </Fade>
        </FormProvider>
    );
}

export default {
    Fields,
    Field,
    FieldCentered,
    Form,
    FieldsGroupTitle,
    Subtitle
};
