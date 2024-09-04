import { PERMISSIONS } from '@/models/permissions/permissions';
import withPermissions from '@/store/app/hooks';
import getTranslation from '@/utils/getTranslation';
import RecurringTransactions from '@/views/accounting/recurring-transactions/Table/RecurringTransactions';
import { GetStaticPropsContext } from 'next';

// eslint-disable-next-line max-len
export default withPermissions(RecurringTransactions, PERMISSIONS.RECURRING_TRANSACTIONS_PAGE);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await getTranslation(locale, ['recurring_transactions']))
        }
    };
}
