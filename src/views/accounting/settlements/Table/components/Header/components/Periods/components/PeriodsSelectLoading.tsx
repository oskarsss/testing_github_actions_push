import WithDots from '@/views/accounting/settlements/Table/components/WithDots';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function PeriodsSelectLoading() {
    const { t } = useAppTranslation();
    return (
        <WithDots>
            <b>
                <i>{t('common:loading')}</i>
            </b>
        </WithDots>
    );
}
