import { LoadingButton } from '@mui/lab';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import CriticalNotificationStyled from '../styled';

type Props = {
    submit: () => void;
    isLoading: boolean;
    disabled: boolean;
    text: IntlMessageKey;
};

export default function SendCriticalNotificationButton({
    submit,
    isLoading = false,
    disabled = false,
    text
}: Props) {
    const { t } = useAppTranslation();
    return (
        <CriticalNotificationStyled.SirenButton>
            <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                onClick={submit}
                loading={isLoading}
                disabled={disabled}
                color="error"
            >
                {t(text)}
            </LoadingButton>
        </CriticalNotificationStyled.SirenButton>
    );
}
