import Button from '@mui/material/Button';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Container } from '@/@core/components/import-dialog/components/Header/styled';
import { useImportHelpers } from '@/@core/components/import-dialog/helpers';

type Props = {
    closeDialog: () => void;
};

export default function Header({ closeDialog }: Props) {
    const { t } = useAppTranslation();
    const { handleClose } = useImportHelpers();

    const onClick = () => {
        handleClose(closeDialog);
    };

    return (
        <Container>
            <h5>{t('core:import.header.title')}</h5>
            <Button
                variant="outlined"
                onClick={onClick}
            >
                {t('common:button.close')}
            </Button>
        </Container>
    );
}
