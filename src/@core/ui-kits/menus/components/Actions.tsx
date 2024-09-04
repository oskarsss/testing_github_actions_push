/* eslint-disable import/no-anonymous-default-export */
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { PropsWithChildren, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import defineButtonText from '@/utils/define-button-text';
import type { IntlMessageKey } from '@/@types/next-intl';

type SubmitButtonType = 'create' | 'update';

type MenuSubmitButtonProps = {
    loading: boolean;
    text?: IntlMessageKey;
    type?: SubmitButtonType;
    disabled?: boolean;
    testId?: string;
};

function SubmitButton({
    loading,
    text = 'common:button.save',
    type,
    disabled = false,
    testId = ''
}: MenuSubmitButtonProps) {
    const { t } = useAppTranslation();

    const defineSubmitButtonText = useMemo(() => defineButtonText(text, type), [text, type]);

    return (
        <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            style={{ fontWeight: '600', minWidth: '120px' }}
            loading={loading}
            disabled={disabled}
            {...applyTestId(testId)}
        >
            {t(defineSubmitButtonText)}
        </LoadingButton>
    );
}

type MenuCancelButtonProps = {
    onCancel: () => void;
};

function CancelButton({ onCancel }: MenuCancelButtonProps) {
    const { t } = useAppTranslation();
    return (
        <Button
            onClick={onCancel}
            size="large"
            variant="outlined"
            style={{ minWidth: '120px', marginRight: '10px' }}
        >
            {t('common:button.cancel')}
        </Button>
    );
}

type MenuDeleteButtonProps = {
    onClick: () => void;
    loading: boolean;
    disabled?: boolean;
    text?: IntlMessageKey;
};

function DeleteButton({
    onClick,
    loading,
    disabled = false,
    text = 'common:button.delete'
}: MenuDeleteButtonProps) {
    const { t } = useAppTranslation();
    return (
        <LoadingButton
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

function ActionsWrapper({ children }: PropsWithChildren) {
    return (
        <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
        >
            {children}
        </Grid>
    );
}

export default {
    /**
     * ### Vektor Menus Components
     * SubmitButton component. Its a button with submit type. Use it in ActionsWrapper component.
     * #### Props:
     * - `text` - is required
     * - `loading` - is required
     * - `disabled`(optional) - is false by default
     * - `testId`(optional) - is empty by default
     */
    SubmitButton,

    /**
     * ### Vektor Menus Components
     * CancelButton component. Its a button with cancel type. Use it in ActionsWrapper component.
     * #### Props:
     * - `onCancel` - is required
     */
    CancelButton,

    /**
     * ### Vektor Menus Components
     * DeleteButton component. Use it in ActionsWrapper component.
     * #### Props:
     * - `onClick` - is required
     * - `loading` - is required
     * - `disabled`(optional) - is false by default
     * - `text`(optional) - is 'Delete' by default
     */
    DeleteButton,

    /**
     * ### Vektor Dialogs Components
     * ActionsWrapper component. Its a wrapper for Buttons component.
     * @example
     * <MenuComponents.ActionsWrapper>
     *  <MenuComponents.CancelButton onCancel={onCancel} />
     *  <MenuComponents.SubmitButton loading={loading} text="Save" />
     * </MenuComponents.ActionsWrapper>
     */
    ActionsWrapper
};
