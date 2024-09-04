/* eslint-disable import/no-anonymous-default-export */
import { FormEvent, PropsWithChildren } from 'react';
import { Grid, Stack, SxProps, Theme, Typography } from '@mui/material';
import { applyTestId } from '@/configs/tests';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type FieldsProps = PropsWithChildren<{
    rowSpacing?: number;
    columnSpacing?: number;
    sx?: SxProps<Theme>;
}>;

function Fields({
    children,
    columnSpacing = 5,
    rowSpacing = 5,
    sx = {}
}: FieldsProps) {
    return (
        <Grid
            sx={sx}
            container
            columnSpacing={columnSpacing}
            rowSpacing={rowSpacing}
        >
            {children}
        </Grid>
    );
}

type SectionTitleProps = PropsWithChildren<{
    startIcon: React.ReactNode;
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    sx?: SxProps<Theme>;
}>;

function SectionTitle({
    startIcon,
    title,
    translationOptions,
    sx,
    children
}: SectionTitleProps) {
    const { t } = useAppTranslation();
    return (
        <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap="8px"
            xs={12}
            sx={sx}
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="inherit"
            >
                {startIcon}
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                >
                    {t(title, translationOptions)}
                </Typography>
            </Stack>
            {children}
        </Grid>
    );
}

type FieldProps = {
    xs: number;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
};

function Field({
    xs,
    children,
    sx
}: FieldProps) {
    return (
        <Grid
            item
            xs={xs}
            sx={sx}
        >
            {children}
        </Grid>
    );
}

type FormProps = PropsWithChildren<{
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    testID?: string;
    style?: React.CSSProperties;
}>;

function Form({
    children,
    onSubmit,
    testID = '',
    style = {}
}: FormProps) {
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        onSubmit(e);
    };
    return (
        <form
            {...applyTestId(testID)}
            autoComplete="off"
            onSubmit={submit}
            style={style}
        >
            {children}
        </form>
    );
}

export default {
    /**
     * ### Vektor Dialogs Components
     * Fields component. Its a wrapper for Fields components.
     * #### Props:
     * - `columnSpacing` - is 2 by default
     * - `rowSpacing` - is 3 by default
     */
    Fields,

    /**
     * ### Vektor Dialogs Components
     * Field component. Its a wrapper for input. You can use it in Fields component.
     * #### Props:
     * - `xs` - is required params.
     */
    Field,

    /**
     * ### Vektor Dialogs Components
     * Form component. Its a form.
     * #### Props:
     * - `onSubmit` - is required params.
     * - `testID` - is optional params.
     *
     * You can set onSubmit function to handle submit form
     */
    Form,

    /**
     * ### Vektor Dialogs Components
     * SectionTitle component. Its a section title.
     * #### Props:
     * - `startIcon` - is required params.
     * - `title` - is required params.
     *
     * You can set startIcon and title to show section title
     *
     * Example:
     * ```tsx
     * <SectionTitle
     *    startIcon={<Icon />}
     *   title="Title"
     * />
     */

    SectionTitle
};
