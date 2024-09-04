import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import SettingsHeader from '@/views/settings/components/Header/SettingsHeader';
import React, { memo, ReactElement } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    icon?: JSX.Element;
    title: IntlMessageKey | ReactElement;
    isEdit: boolean;
    isDirty: boolean;
    isLoading: boolean;
    onSubmit: () => void;
    onCancel: () => void;
    onEdit: () => void;
    children_left_side?: React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
};

function MapSettingsHeader({
    icon,
    title,
    isEdit,
    isDirty,
    isLoading,
    onSubmit,
    onCancel,
    onEdit,
    children_left_side,
    children,
    disabled
}: Props) {
    const { t } = useAppTranslation();
    return (
        <SettingsHeader
            title={title}
            icon={icon}
            children_left_side={children_left_side}
        >
            {isEdit ? (
                <>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={onCancel}
                    >
                        {t('common:button.cancel')}
                    </Button>
                    <LoadingButton
                        variant="contained"
                        loading={isLoading}
                        disabled={!isDirty}
                        onClick={onSubmit}
                    >
                        <SaveIcon sx={{ marginRight: '8px' }} /> {t('common:button.update')}
                    </LoadingButton>
                </>
            ) : (
                <Button
                    onClick={onEdit}
                    disabled={disabled}
                >
                    <EditIcon sx={{ marginRight: '12px' }} /> {t('common:button.edit')}
                </Button>
            )}
            {children}
        </SettingsHeader>
    );
}

export default memo(MapSettingsHeader);
