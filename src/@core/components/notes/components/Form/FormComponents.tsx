/* eslint-disable import/no-anonymous-default-export */
import React, { PropsWithChildren } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import Notes from '@/store/notes/types';
import IconButtonWithTooltip from '@/@core/ui-kits/basic/icon-button-with-tooltip/IconButtonWithTooltip';
import { applyTestId } from '@/configs/tests';
import { Text } from '@/@core/components/notes/components/Form/Form.styled';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, CircularProgress, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const SendIcon = () => {
    const { palette } = useTheme();
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.6951 2.26299C15.9677 2.1968 16.3412 2.13275 16.7177 2.26576C17.1926 2.43355 17.5661 2.80711 17.7339 3.28202C17.8669 3.6585 17.8029 4.03202 17.7367 4.30458C17.6692 4.58228 17.5532 4.92214 17.4225 5.30477L13.899 15.6235C13.7478 16.0663 13.6166 16.4508 13.4876 16.7414C13.366 17.0154 13.1727 17.3902 12.8007 17.6117C12.3437 17.8838 11.7844 17.9215 11.2951 17.7132C10.8967 17.5436 10.6548 17.1981 10.4976 16.9429C9.89071 15.958 8.90786 13.9332 8.3724 12.8062L13.5058 7.67266C13.8312 7.34722 13.8312 6.81959 13.5058 6.49415C13.1804 6.16872 12.6527 6.16873 12.3273 6.49417L7.19089 11.6307C6.09579 11.1154 4.14756 10.1742 3.05678 9.50212C2.80152 9.34484 2.45611 9.10296 2.2865 8.70456C2.0782 8.21527 2.1159 7.65594 2.38798 7.19902C2.60951 6.82698 2.98426 6.63364 3.25831 6.51204C3.54884 6.38312 3.93336 6.25184 4.37614 6.10067L14.6949 2.57719C15.0775 2.44651 15.4174 2.33044 15.6951 2.26299Z"
                fill={palette.semantic.foreground.brand.primary}
            />
        </svg>
    );
};

function FilesWrapper({ children }: PropsWithChildren) {
    return <Stack direction="column">{children}</Stack>;
}

type AttachFileButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    testID?: string;
};

function AttachFileButton({
    onClick,
    testID
}: AttachFileButtonProps) {
    return (
        <IconButtonWithTooltip
            tooltip="core:notes.tooltips.attach_file"
            size="small"
            onClick={onClick}
            padding="0"
            icon={(
                <AttachFileIcon
                    sx={{
                        transform: 'rotate(45deg)'
                    }}
                    fontSize="small"
                />
            )}
            testID={testID}
        />
    );
}

type SendButtonProps = {
    onClick: () => void;
    disabled: boolean;
    editedNote: Notes.NoteType | null;
    size: 'small' | 'normal';
    testID?: string;
};

function SendButton({
    onClick,
    disabled,
    editedNote,
    size,
    testID
}: SendButtonProps) {
    const { t } = useAppTranslation();
    const tooltip_text = editedNote
        ? 'core:notes.tooltips.save_changes'
        : 'core:notes.tooltips.leave_note';
    if (size === 'small') {
        return (
            <IconButtonWithTooltip
                tooltip={disabled ? '' : tooltip_text}
                disabled={disabled}
                onClick={onClick}
                size="small"
                icon={<SendIcon />}
                padding="0"
                sx={
                    disabled
                        ? {
                            svg: {
                                path: {
                                    fill: (theme) => theme.palette.semantic.text.secondary
                                }
                            }
                        }
                        : {}
                }
                testID={testID}
            />
        );
    }
    return (
        <Button
            {...applyTestId(testID)}
            type="button"
            color={editedNote ? 'primary' : 'secondary'}
            sx={{
                fontSize  : '12px',
                whiteSpace: 'nowrap'
            }}
            disabled={disabled}
            onClick={onClick}
            size="small"
            variant="outlined"
        >
            {t(tooltip_text)}
        </Button>
    );
}

type CancelButtonProps = {
    onCancel: () => void;
    size: 'small' | 'normal';
    testID?: string;
};

function CancelButton({
    onCancel,
    size,
    testID
}: CancelButtonProps) {
    const { t } = useAppTranslation('common');
    if (size === 'small') {
        return (
            <IconButtonWithTooltip
                tooltip="common:button.cancel"
                onClick={onCancel}
                size="small"
                icon={<CancelIcon color="secondary" />}
                testID={testID}
            />
        );
    }
    return (
        <Button
            {...applyTestId(testID)}
            sx={{
                fontSize: '12px'
            }}
            color="secondary"
            variant="outlined"
            size="small"
            onClick={onCancel}
        >
            {t('button.cancel')}
        </Button>
    );
}

type ActionsWrapperProps = PropsWithChildren<{
    size: 'small' | 'normal';
}>;

function ActionsWrapper({
    size,
    children
}: ActionsWrapperProps) {
    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
        >
            <Stack
                direction="row"
                alignItems="center"
                padding={size === 'small' ? 0 : 2}
                spacing={size === 'small' ? 0 : 2}
            >
                {children}
            </Stack>
        </Stack>
    );
}

type FileItemProps = {
    title: string;
    onDelete?: () => void;
    style?: React.CSSProperties;
    size?: 'small' | 'normal';
    loading?: boolean;
};

function FileItem({
    title,
    onDelete,
    style = {},
    size = 'normal',
    loading = false
}: FileItemProps) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="25px"
            style={style}
            gap="8px"
        >
            <Stack
                direction="row"
                alignItems="center"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                gap="4px"
            >
                <InsertDriveFileIcon
                    color="primary"
                    fontSize="small"
                />
                <Text sx={{ fontSize: size === 'small' ? '12px' : '14px' }}>{title}</Text>
            </Stack>
            {loading ? (
                <Box sx={{ display: 'flex', marginRight: 1 }}>
                    <CircularProgress
                        size={14}
                        color="primary"
                    />
                </Box>
            ) : (
                <IconButton
                    size="small"
                    disabled={!onDelete}
                    onClick={onDelete}
                >
                    <ClearIcon
                        color="secondary"
                        fontSize="small"
                    />
                </IconButton>
            )}
        </Stack>
    );
}

export default {
    /**
     * ### Vektor Form Components
     * FilesWrapper component. Its a wrapper for File components.
     */
    FilesWrapper,

    /**
     * ### Vektor Form Components
     * AttachFileButton component. Use it in ActionsWrapper component.
     * #### Props:
     * - `onClick` - is required
     */
    AttachFileButton,

    /**
     * ### Vektor Form Components
     * SendButton component. Use it in ActionsWrapper component.
     * #### Props:
     * - `onClick` - is required
     * - `disabled` - is required
     * - `editedNote` - is required
     * - `size` - is required
     * - `testID`(optional) - is '' by default
     */
    SendButton,

    /**
     * ### Vektor Form Components
     * CancelButton component. Its a button with cancel type. Use it in ActionsWrapper component.
     * #### Props:
     * - `onCancel` - is required
     * - `size` - is required
     * - `testID`(optional) - is '' by default
     */
    CancelButton,

    /**
     * ### Vektor Form Components
     * ActionsWrapper component. Its a wrapper for Buttons component.
     * @example
     * <FormComponents.ActionsWrapper>
     *  <FormComponents.CancelButton onCancel={onCancel} />
     *  <FormComponents.SubmitButton loading={loading} text="Save" />
     * </FormComponents.ActionsWrapper>
     *
     * #### Props:
     * - `size` - is required
     */
    ActionsWrapper,

    /**
     * ### Vektor Form Components
     * FileItem component with CircularProgress and cancel button. Use it in FilesWrapper component.
     * #### Props:
     * - `title` - is required
     * - `onDelete` - (optional)
     * - `style` - (optional)
     * - `size` - (optional) - is 'normal' by default
     * - `loading` - (optional) - is false by default
     * - `testID`(optional) - is '' by default
     */
    FileItem
};
