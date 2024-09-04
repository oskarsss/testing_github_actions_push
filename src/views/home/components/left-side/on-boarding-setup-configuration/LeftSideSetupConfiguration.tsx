import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import OnBoardingAccordionDetailsRow from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsRow';
import OnBoardingAccordion from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { HomeActions } from '@/store/home/slice';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';
import navigateToPage from '@/utils/navigateToPage';

export default function LeftSideSetupConfiguration() {
    const dispatch = useAppDispatch();
    const expanded = useAppSelector((state) => state.home.setupConfigurationExpanded);

    const { data } = OnboardingGrpcService.useGetOnboardingChecklistQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        dispatch(HomeActions.setSetupConfigurationExpanded(isExpanded));
    };

    const onOpenSettingsDriverType = () => navigateToPage('/settings/drivers/types');
    const onOpenSettingsRoles = () => navigateToPage('/settings/roles');
    const onOpenSettingsDocTypes = () => navigateToPage('/settings/documents');
    const onOpenSettingsInvoiceItems = () =>
        navigateToPage('/settings/loads/invoice-item-categories');
    const onClickWatchVideo = () => openNewTab(SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_CONFIGURATIONS);

    const progress = data
        ? [
            data.itemsShownToDriverConfigured,
            data.userRolesPermissionsReviewed,
            data.documentTypesReviewed,
            data.invoiceItemsReviewed
        ].filter((item) => item).length
        : 0;

    return (
        <OnBoardingAccordion
            title="onboarding:side.left.item.setup_configurations.title"
            subTitle="onboarding:side.left.item.setup_configurations.sub_title"
            linkAnyQuestions={SYSTEM.ONBOARDING.ANY_QUESTION_LINKS.SETUP_CONFIGURATIONS}
            icon={<VectorIcons.SettingsIcon />}
            onChange={handleChange}
            expanded={expanded}
            progress={progress}
            total={4}
        >
            {SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_CONFIGURATIONS && (
                <OnBoardingAccordionDetailsRow
                    onClick={onClickWatchVideo}
                    isVideo
                />
            )}
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsDriverType}
                isCompleted={data?.itemsShownToDriverConfigured}
                label="onboarding:side.left.item.setup_configurations.label.shown_to_driver"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsRoles}
                isCompleted={data?.userRolesPermissionsReviewed}
                label="onboarding:side.left.item.setup_configurations.label.roles_and_permissions"
                isOptional
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsDocTypes}
                isCompleted={data?.documentTypesReviewed}
                label="onboarding:side.left.item.setup_configurations.label.doc_types"
                isOptional
            />
            <OnBoardingAccordionDetailsRow
                onClick={onOpenSettingsInvoiceItems}
                isCompleted={data?.invoiceItemsReviewed}
                label="onboarding:side.left.item.setup_configurations.label.invoice_items"
                isOptional
            />
        </OnBoardingAccordion>
    );
}
