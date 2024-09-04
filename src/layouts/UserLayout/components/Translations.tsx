// ** Third Party Import
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    text: IntlMessageKey;
};

const Translations = ({ text }: Props) => {
    // ** Hook
    const { t } = useAppTranslation();

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{t(text)}</>;
};

export default Translations;
