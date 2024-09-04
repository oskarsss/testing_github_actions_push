/* eslint-disable import/no-anonymous-default-export */
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Stack, type SxProps } from '@mui/material';
import { MouseEventHandler, PropsWithChildren, useMemo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { applyTestId } from '@/configs/tests';
import navigateToPage from '@/utils/navigateToPage';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import defineButtonText from '@/utils/define-button-text';
import TabIcon from '@mui/icons-material/Tab';
import openNewTab from '@/utils/openNewTab';

type ActionWrapperProps = PropsWithChildren<{
    sx?: SxProps;
}>;

function ActionsWrapper({
    children,
    sx = {}
}: ActionWrapperProps) {
    return (
        <Stack
            spacing={3}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={sx}
        >
            {children}
        </Stack>
    );
}

type SubmitButtonType = 'create' | 'update';

type SaveButtonProps = {
    isDisabled: boolean;
    isLoading: boolean;
    text?: IntlMessageKey;
    type?: SubmitButtonType;
    testId?: string;
};

function SaveButton({
    isDisabled,
    isLoading,
    text = 'common:button.save',
    type,
    testId
}: SaveButtonProps) {
    const { t } = useAppTranslation();

    const defineSubmitButtonText = useMemo(() => defineButtonText(text, type), [text, type]);

    return (
        <LoadingButton
            {...applyTestId(testId)}
            variant="contained"
            disabled={isDisabled}
            type="submit"
            style={{
                fontWeight: 600
            }}
            loading={isLoading}
        >
            {t(defineSubmitButtonText)}
            <SaveIcon sx={{ marginLeft: 2 }} />
        </LoadingButton>
    );
}

type DownloadButtonProps = {
    isLoading: boolean;
    onDownload: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    text?: IntlMessageKey;
};

function DownloadButton({
    onDownload,
    isLoading,
    variant = 'outlined',
    text = 'common:button.download'
}: DownloadButtonProps) {
    const { t } = useAppTranslation();
    return (
        <LoadingButton
            variant={variant}
            loading={isLoading}
            onClick={onDownload}
            startIcon={<DownloadIcon />}
        >
            {t(text)}
        </LoadingButton>
    );
}

type ViewProfileButtonProps = {
    onClose: () => void;
    path: string;
    text?: IntlMessageKey;
    hidden?: boolean;
};

const ViewButton = ({
    onClose,
    path,
    text = 'common:button.view_profile',
    hidden = false
}: ViewProfileButtonProps) => {
    const { t } = useAppTranslation();
    if (hidden) {
        return null;
    }

    const handleViewDetails: MouseEventHandler<HTMLButtonElement> = (e) => {
        onClose();

        navigateToPage(path, e);
    };

    return (
        <Button
            variant="text"
            style={{ fontWeight: 600 }}
            color="secondary"
            onClick={handleViewDetails}
        >
            {t(text)}
        </Button>
    );
};

type DeleteButtonProps = {
    disabled: boolean;
    isLoading: boolean;
    onClick: () => void;
    text?: IntlMessageKey;
    testId?: string;
};

function DeleteButton({
    disabled,
    isLoading,
    onClick,
    text = 'common:button.delete',
    testId
}: DeleteButtonProps) {
    const { t } = useAppTranslation();
    return (
        <LoadingButton
            {...applyTestId(testId)}
            variant="text"
            color="error"
            disabled={disabled}
            loading={isLoading}
            onClick={onClick}
            sx={{ fontWeight: 600 }}
            startIcon={<DeleteIcon />}
        >
            {t(text)}
        </LoadingButton>
    );
}

type CloseButtonProps = {
    onClose: () => void;
    text?: IntlMessageKey;
    testId?: string;
};

function CloseButton({
    onClose,
    text = 'common:button.close',
    testId
}: CloseButtonProps) {
    const { t } = useAppTranslation();
    return (
        <Button
            {...applyTestId(testId)}
            variant="text"
            style={{ fontWeight: 600 }}
            color="secondary"
            onClick={onClose}
        >
            {t(text)}
        </Button>
    );
}

type NewTabButtonProps = {
    path: string;
};

function NewTabButton({ path }: NewTabButtonProps) {
    const { t } = useAppTranslation();

    const clickHandler = () => {
        openNewTab(path);
    };

    return (
        <Button
            variant="text"
            color="primary"
            startIcon={<TabIcon />}
            onClick={clickHandler}
        >
            {t('common:button.new_tab')}
        </Button>
    );
}

export default {
    ActionsWrapper,
    SaveButton,
    ViewButton,
    CloseButton,
    DeleteButton,
    DownloadButton,
    NewTabButton
};
