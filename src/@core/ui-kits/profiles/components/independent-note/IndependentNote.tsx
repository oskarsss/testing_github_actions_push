import Typography from '@mui/material/Typography';
import Info from '@/@core/components/Info';
import { applyTestId } from '@/configs/tests';
import { CircularProgress, Stack } from '@mui/material';
import { ChangeEvent } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import IndependentNoteStyled from './IndependentNote.styled';

export type IndependentNoteChangeAction = (e: ChangeEvent<HTMLInputElement>) => void;

type TestOptions = {
    content?: string;
    save?: string;
};

type Props = {
    title: IntlMessageKey;
    update: () => void;
    isLoading: boolean;
    isInfoExist: boolean;
    infoTitle?: IntlMessageKey;
    isDisabled: boolean;
    onChange: IndependentNoteChangeAction;
    inputLabel: IntlMessageKey;
    inputPlaceholder: IntlMessageKey;
    inputValue: string;
    testOptions?: TestOptions;
};

export default function IndependentNote({
    title,
    update,
    isLoading,
    isInfoExist,
    infoTitle,
    isDisabled,
    onChange,
    inputLabel,
    inputPlaceholder,
    inputValue,
    testOptions = {
        save   : '',
        content: ''
    }
}: Props) {
    const { t } = useAppTranslation();
    return (
        <IndependentNoteStyled.Block>
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                padding="12px 24px"
                gap="5px"
                sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.semantic.border.secondary}`
                }}
            >
                <IndependentNoteStyled.Header>
                    <Typography
                        variant="body1"
                        fontSize="20px"
                        fontWeight="600"
                    >
                        {t(title)}
                    </Typography>
                    {isInfoExist && infoTitle && <Info title={infoTitle} />}
                </IndependentNoteStyled.Header>

                <IndependentNoteStyled.SaveButton
                    variant="outlined"
                    onClick={update}
                    loading={isLoading}
                    disabled={isDisabled}
                    color="secondary"
                    {...applyTestId(testOptions.save)}
                >
                    {isLoading ? (
                        <CircularProgress
                            size={18}
                            color="inherit"
                        />
                    ) : (
                        t('common:button.save')
                    )}
                </IndependentNoteStyled.SaveButton>
            </Stack>

            <IndependentNoteStyled.FieldWrapper>
                <IndependentNoteStyled.Field
                    label={t(inputLabel)}
                    multiline
                    onChange={onChange}
                    value={inputValue}
                    rows={2}
                    placeholder={t(inputPlaceholder)}
                    variant="filled"
                    {...applyTestId(testOptions.content)}
                />
            </IndependentNoteStyled.FieldWrapper>
        </IndependentNoteStyled.Block>
    );
}
