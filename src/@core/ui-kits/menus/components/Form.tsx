/* eslint-disable import/no-anonymous-default-export */
import { Grid, Typography, styled } from '@mui/material';
import { FormEvent, PropsWithChildren } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';

const HeaderWrapper = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    marginBottom  : '1.25rem'
}));

type FormHeaderProps = {
    text: IntlMessageKey;
    translateOptions?: IntlOptions;
    textVariant?: 'h5' | 'h6';
};

function FormHeader({
    text,
    translateOptions,
    textVariant = 'h5'
}: FormHeaderProps) {
    const { t } = useAppTranslation();
    return (
        <HeaderWrapper>
            <Typography variant={textVariant}>{t(text, translateOptions)}</Typography>
        </HeaderWrapper>
    );
}

type FormProps = PropsWithChildren<{
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    width?: React.CSSProperties['width'];
    padding?: React.CSSProperties['padding'];
    style?: React.CSSProperties;
}>;

function Form({
    children,
    onSubmit,
    width = '450px',
    padding = '20px',
    style = {}
}: FormProps) {
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        onSubmit(e);
    };
    return (
        <form
            autoComplete="off"
            onSubmit={submit}
            style={{
                width,
                padding,
                ...style
            }}
        >
            {children}
        </form>
    );
}

type FieldProps = PropsWithChildren<{
    xs: number;
    children: React.ReactNode;
}>;

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

type FieldsProps = PropsWithChildren<{
    rowSpacing?: number;
    columnSpacing?: number;
}>;

function Fields({
    children,
    columnSpacing = 3,
    rowSpacing = 5
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

export default {
    /**
     * ### Vektor Menus Components
     * Field component. Its a wrapper for input. You can use it in Fields component.
     * #### Props:
     * - `xs` - is required params.
     */
    Field,

    /**
     * ### Vektor Menus Components
     * Fields component. Its a wrapper for Fields components.
     * #### Props:
     * - `columnSpacing`(optional) - is 2 by default
     * - `rowSpacing`(optional) - is 3 by default
     */
    Fields,

    /**
     * ### Vektor Menus Components
     * Form component. Its a form.
     * #### Props:
     * - `width`(optional) - is 450px by default
     * - `padding`(optional) - is 20px by default
     * - `style`(optional) - is {} by default
     * - `onSubmit` - is required params.
     *
     * You can set onSubmit function to handle submit form
     *
     * #### Customize example:
     * @example
     * <Form
     *    onSubmit={handleSubmit}
     *    width="700px"
     *    padding="30px"
     *    style={{ backgroundColor: 'red' }}
     * >
     *   ...
     * </Form>
     */
    Form,

    /**
     * ### Vektor Menus Components
     * FormHeader Component. Its header for form.
     * #### Props:
     * - `textVariant`(optional) - is h5 by default.
     * - `text` - is required params.
     */
    FormHeader
};
