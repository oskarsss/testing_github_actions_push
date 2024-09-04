import { IntlMessageKey, IntlNamespaces } from '@/@types/next-intl';
import { useTranslation } from 'react-i18next';

export const useAppTranslation = useTranslation<IntlNamespaces, IntlMessageKey>;
