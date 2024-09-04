import { useController, useWatch } from 'react-hook-form';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';
import React from 'react';
import ExtractByDefault from '@/views/new-loads/views/Draft/rate-confirmation/ExtractByDefaultCheckbox';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UploadButton from './UploadButton';
import { useDraftFormContext } from '../Draft';
import UploadButtonStyled from './UploadButtonStyled.styled';
import SYSTEM from '../../../../../@system';

const RateConfirmation = () => {
    const { control } = useDraftFormContext();
    const { t } = useAppTranslation();
    const {
        fieldState: { error }
    } = useController({ name: 'rateConUrl', control });

    const fileUrl = useWatch({ control, name: 'rateConUrl' });

    return (
        <>
            <UploadButtonStyled.Container>
                <UploadButtonStyled.Text>
                    <UploadButtonStyled.TextTitle>
                        {t('new_loads:draft.rate_confirmation.title')}
                        <Tooltip title={t('new_loads:draft.rate_confirmation.tooltips.info')}>
                            <InfoOutlinedIcon
                                sx={{ fill: (theme) => theme.palette.semantic.text.white }}
                            />
                        </Tooltip>
                    </UploadButtonStyled.TextTitle>
                    <UploadButtonStyled.TextSubtitle>
                        {t('new_loads:draft.rate_confirmation.description', {
                            name: SYSTEM.AI_NAME
                        })}
                    </UploadButtonStyled.TextSubtitle>
                </UploadButtonStyled.Text>

                <UploadButton key={fileUrl} />

                <UploadButtonStyled.Decor />
            </UploadButtonStyled.Container>
            {!fileUrl && (
                <UploadButtonStyled.HelperText sx={{ color: 'error.main' }}>
                    <span>{error?.message}</span>
                </UploadButtonStyled.HelperText>
            )}
            <ExtractByDefault />
            <UploadButtonStyled.TitleDecor>
                <p>{t('new_loads:draft.rate_confirmation.buttons.manual_entry')}</p>
            </UploadButtonStyled.TitleDecor>
        </>
    );
};

export default RateConfirmation;
