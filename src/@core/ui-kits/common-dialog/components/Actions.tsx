/* eslint-disable import/no-anonymous-default-export */
import { LoadingButton } from '@mui/lab';
import { Button, Stack, SxProps, Theme } from '@mui/material';
import { PropsWithChildren, useMemo } from 'react';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import defineButtonText from '@/utils/define-button-text';
import type { IntlOptions, IntlMessageKey } from '@/@types/next-intl';

type SubmitButtonType = 'create' | 'update';

type SubmitButtonProps = {
    loading: boolean;
    text?: IntlMessageKey | string;
    translationOptions?: IntlOptions;
    disabled?: boolean;
    type?: SubmitButtonType;
    testID?: string;
};

function SubmitButton({
    loading,
    text = 'common:button.save',
    translationOptions,
    type,
    disabled = false,
    testID = ''
}: SubmitButtonProps) {
    const { t } = useAppTranslation();

    const defineSubmitButtonText = useMemo(() => defineButtonText(text, type), [text, type]);

    return (
        <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            {...applyTestId(testID)}
            style={{ fontWeight: '600', minWidth: '120px' }}
            loading={loading}
            disabled={disabled}
        >
            {t(defineSubmitButtonText, translationOptions)}
        </LoadingButton>
    );
}

type CancelButtonProps = {
    onCancel: () => void;
    cancel_text?: IntlMessageKey | string;
    testID?: string;
};

function CancelButton({
    onCancel,
    cancel_text = 'common:button.cancel',
    testID
}: CancelButtonProps) {
    const { t } = useAppTranslation();
    return (
        <Button
            onClick={onCancel}
            {...applyTestId(testID)}
            size="large"
            variant="outlined"
            style={{ minWidth: '120px', marginRight: '10px' }}
        >
            {t(cancel_text)}
        </Button>
    );
}

type DeleteButtonProps = {
    onClick: () => void;
    loading: boolean;
    text?: IntlMessageKey | string;
    disabled?: boolean;
    deleteTestId?: string;
};

function DeleteButton({
    onClick,
    loading,
    text = 'common:button.delete',
    disabled = false,
    deleteTestId
}: DeleteButtonProps) {
    const { t } = useAppTranslation();
    return (
        <LoadingButton
            {...applyTestId(deleteTestId)}
            variant="outlined"
            size="large"
            color="error"
            onClick={onClick}
            disabled={disabled}
            loading={loading}
            style={{ minWidth: '120px', marginRight: '10px' }}
        >
            {t(text)}
        </LoadingButton>
    );
}

function ActionsWrapper({
    children,
    sx
}: PropsWithChildren<{ sx?: SxProps<Theme> }>) {
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            alignItems="center"
            marginTop="20px"
            sx={sx}
        >
            {children}
        </Stack>
    );
}

type DefaultActionsProps = {
    onCancel: () => void;
    submitLoading: boolean;
    type?: SubmitButtonType;
    submitText?: IntlMessageKey;
    submitDisabled?: boolean;
    cancelTestId?: string;
    confirmTestId?: string;
    sx?: SxProps<Theme>;
};

function DefaultActions({
    submitLoading,
    onCancel,
    type,
    submitText,
    submitDisabled = false,
    cancelTestId,
    confirmTestId,
    sx
}: DefaultActionsProps) {
    return (
        <ActionsWrapper sx={sx}>
            <CancelButton
                testID={cancelTestId}
                onCancel={onCancel}
            />
            <SubmitButton
                testID={confirmTestId}
                disabled={submitDisabled}
                loading={submitLoading}
                type={type}
                text={submitText}
            />
        </ActionsWrapper>
    );
}

export default {
    /**
     * ### Vektor Dialogs Components
     * SubmitButton component. Its a button with submit type. Use it in ActionsWrapper component.
     * #### Props:
     * - `text` - is required
     * - `loading` - is required
     * - `disabled`(optional) - is false by default
     * - `testID`(optional) - is empty by default
     */
    SubmitButton,

    /**
     * ### Vektor Dialogs Components
     * CancelButton component. Use it in ActionsWrapper component.
     * #### Props:
     * - `onCancel` - is required
     */
    CancelButton,

    /**
     * ### Vektor Dialogs Components
     * DeleteButton component. Use it in ActionsWrapper component.
     * #### Props:
     * - `onClick` - is required
     * - `loading` - is required
     * - `disabled`(optional) - is false by default
     */
    DeleteButton,

    /**
     * ### Vektor Dialogs Components
     * ActionsWrapper component. Its a wrapper for Buttons component.
     * @example
     * <DialogsComponents.ActionsWrapper>
     *  <DialogsComponents.CancelButton onCancel={onCancel} />
     *  <DialogsComponents.SubmitButton loading={loading} text="Save" />
     * </DialogsComponents.ActionsWrapper>
     */
    ActionsWrapper,

    /**
     * ### Vektor Dialogs Components
     * DefaultActions component. Its a wrapper for CancelButton and SubmitButton components.
     * #### Props:
     * - `submitText`(optional) - is Save by default
     * - `submitDisabled`(optional) - is false by default
     * - `submitLoading` - is required
     * - `onCancel` - is required
     * - `cancelTestId`(optional)
     * - `confirmTestId`(optional)
     * #### Description:
     * You can use it in Fields component.
     */
    DefaultActions
};
