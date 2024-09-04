import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import { useAddCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/AddCycleDialog';
import { useCreateRecurringTransactionDialog } from '@/views/accounting/recurring-transactions/menus/RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import OnBoardingAccordionDetailsRow from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsRow';
import OnBoardingAccordion from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { HomeActions } from '@/store/home/slice';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';
import navigateToPage from '@/utils/navigateToPage';

export default function LeftSideSetupPayroll() {
    const dispatch = useAppDispatch();
    const expanded = useAppSelector((state) => state.home.setupPayrollExpanded);
    const {
        data,
        refetch
    } = OnboardingGrpcService.useGetOnboardingChecklistQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const addCycleDialog = useAddCycleDialog();
    const addRecurringTransactionDialog = useCreateRecurringTransactionDialog();

    const onClickWatchVideo = () => openNewTab(SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_PAYROLL);

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        dispatch(HomeActions.setSetupPayrollExpanded(isExpanded));
    };

    const onAddCycle = () => {
        addCycleDialog.open({
            onSuccessfulCreate: refetch
        });
    };

    const onAddRecurringTransaction = () => {
        addRecurringTransactionDialog.open({
            onSuccessfulCreate: refetch,
            category_id       : '',
            category_type     : 'debit',
            setDialogStyled   : true,
            setUpDriverSelect : true,
            enableChangeType  : true
        });
    };

    const onOpenSettingsRevenueTypes = () => navigateToPage('/settings/settlements/revenue-types');
    const onOpenSettingsDebitCategories = () =>
        navigateToPage('/settings/settlements/debit-categories');

    const progress = data
        ? [
            data.payrollCycleCreated,
            data.revenueTypesConfigured,
            data.debitCategoriesConfigured,
            data.recurringTransactionsAdded
        ].filter((item) => item).length
        : 0;

    return (
        <OnBoardingAccordion
            title="onboarding:side.left.item.setup_payroll.title"
            subTitle="onboarding:side.left.item.setup_payroll.sub_title"
            linkAnyQuestions={SYSTEM.ONBOARDING.ANY_QUESTION_LINKS.SETUP_PAYROLL}
            onChange={handleChange}
            icon={<VectorIcons.BankCardIcon />}
            expanded={expanded}
            progress={progress}
            total={4}
        >
            {SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_PAYROLL && (
                <OnBoardingAccordionDetailsRow
                    onClick={onClickWatchVideo}
                    isVideo
                />
            )}
            <OnBoardingAccordionDetailsRow
                onClick={onAddCycle}
                isCompleted={data?.payrollCycleCreated}
                label="onboarding:side.left.item.setup_payroll.label.create_cycle"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsRevenueTypes}
                isCompleted={data?.revenueTypesConfigured}
                label="onboarding:side.left.item.setup_payroll.label.revenue_types"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsDebitCategories}
                isCompleted={data?.debitCategoriesConfigured}
                label="onboarding:side.left.item.setup_payroll.label.debit_categories"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onAddRecurringTransaction}
                isCompleted={data?.recurringTransactionsAdded}
                label="onboarding:side.left.item.setup_payroll.label.add_recurring_transaction"
            />
        </OnBoardingAccordion>
    );
}
