import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import { useCreateFactoringCompanyDialog } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/CreateFactoringCompany';
import OnBoardingAccordionDetailsRow from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsRow';
import OnBoardingAccordion from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { HomeActions } from '@/store/home/slice';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';
import navigateToPage from '@/utils/navigateToPage';

export default function LeftSideSetupProfile() {
    const dispatch = useAppDispatch();
    const expanded = useAppSelector((state) => state.home.setupProfileExpanded);
    const {
        data,
        refetch
    } = OnboardingGrpcService.useGetOnboardingChecklistQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const createFactoringCompanyDialog = useCreateFactoringCompanyDialog();

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        dispatch(HomeActions.setSetupProfileExpanded(isExpanded));
    };

    const onClickWatchVideo = () => openNewTab(SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_PROFILE);
    const onOpenSettingsCompanyProfile = () => navigateToPage('/settings/company');
    const onOpenSettingsSettlement = () => navigateToPage('/settings/settlements');
    const onOpenSettingsInvoicing = () => navigateToPage('/settings/invoicing');
    const onCreateFactoringCompany = () => {
        createFactoringCompanyDialog.open({
            onSuccessfulCreate: refetch
        });
    };

    const progress = data
        ? [
            data.companyProfileComplete,
            data.factoringCompanyAdded,
            data.settlementsPersonalized,
            data.invoiceCustomized
        ].filter((item) => item).length
        : 0;

    return (
        <OnBoardingAccordion
            title="onboarding:side.left.item.setup_profile.title"
            subTitle="onboarding:side.left.item.setup_profile.sub_title"
            linkAnyQuestions={SYSTEM.ONBOARDING.ANY_QUESTION_LINKS.SETUP_PROFILE}
            onChange={handleChange}
            icon={<VectorIcons.OnBoardingIcons.ProfileIcon />}
            expanded={expanded}
            progress={progress}
            total={4}
        >
            {SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_PROFILE && (
                <OnBoardingAccordionDetailsRow
                    onClick={onClickWatchVideo}
                    isVideo
                />
            )}
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsCompanyProfile}
                label="onboarding:side.left.item.setup_profile.label.complete_company_profile"
                isCompleted={data?.companyProfileComplete}
            />
            <OnBoardingAccordionDetailsRow
                onClick={onCreateFactoringCompany}
                label="onboarding:side.left.item.setup_profile.label.add_factoring_company"
                isCompleted={data?.factoringCompanyAdded}
                isOptional
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsSettlement}
                isCompleted={data?.settlementsPersonalized}
                label="onboarding:side.left.item.setup_profile.label.personalize_settlements"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsInvoicing}
                isCompleted={data?.invoiceCustomized}
                label="onboarding:side.left.item.setup_profile.label.cusomize_invoice"
            />
        </OnBoardingAccordion>
    );
}
