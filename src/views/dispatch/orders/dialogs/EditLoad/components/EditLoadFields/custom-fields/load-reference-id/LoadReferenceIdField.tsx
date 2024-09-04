import { TextField } from '@mui/material';
import React from 'react';
import { LoadClientReferenceIDCheckDuplicateRequest_EntityType } from '@proto/loads';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditReferenceIdDialogDialog } from './EditReferenceIdDialog';

type Props = {
    entityId: string;
    entityType: LoadClientReferenceIDCheckDuplicateRequest_EntityType;
    loadId: string;
    referenceId: string;
};

export default function LoadReferenceId({
    entityId,
    entityType,
    referenceId,
    loadId
}: Props) {
    const dialog = useEditReferenceIdDialogDialog();
    const { t } = useAppTranslation('fields');

    const onClickHandler = () => {
        dialog.open({
            entityId,
            entityType,
            initialValue: referenceId,
            loadId
        });
    };

    return (
        <TextField
            value={referenceId}
            label={t('reference_id.label')}
            placeholder={t('reference_id.placeholder')}
            fullWidth
            variant="filled"
            size="small"
            InputProps={{
                readOnly: true
            }}
            onClick={onClickHandler}
        />
    );
}
