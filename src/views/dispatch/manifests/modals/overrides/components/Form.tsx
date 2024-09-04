import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { FormEvent, memo, PropsWithChildren } from 'react';
import type { IntlMessageKey } from '@/@types/next-intl';
import Header from './Header';

type Props = PropsWithChildren<{
    title: IntlMessageKey;
    amount?: string;
    description: IntlMessageKey;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isDirty: boolean;
    isLoading: boolean;
    onClose: () => void;
}>;

function Form({
    title,
    amount,
    description,
    onSubmit,
    isDirty,
    isLoading,
    onClose,
    children
}: Props) {
    const { t } = useAppTranslation();

    return (
        <DialogComponents.Form onSubmit={onSubmit}>
            <Header
                amount={amount}
                title={title}
            />

            <Stack
                direction="row"
                gap="4px"
                borderRadius="2px"
                border="1px solid"
                padding="2px 12px"
                marginBottom="16px"
                borderColor={({ palette }) => palette.utility.foreground.warning.secondary}
                bgcolor={({ palette }) => palette.utility.foreground.warning.tertiary}
            >
                <VectorIcons.WarningIcon sx={{ fontSize: '16px' }} />

                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                    color={({ palette }) => palette.utility.text.warning}
                >
                    {t(description)}
                </Typography>
            </Stack>

            <DialogComponents.Field xs={6}>{children}</DialogComponents.Field>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={onClose} />
                <DialogComponents.SubmitButton
                    disabled={!isDirty}
                    type="update"
                    loading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

export default memo(Form);
