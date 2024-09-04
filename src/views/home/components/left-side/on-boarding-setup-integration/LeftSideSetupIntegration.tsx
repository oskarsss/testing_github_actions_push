import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import { useRequestIntegrationDialog } from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/RequestIntegration';
import OnBoardingAccordionComponents from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordionComponents';
import OnBoardingAccordionDetailsRow from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsRow';
import OnBoardingAccordion from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { HomeActions } from '@/store/home/slice';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';
import { useIntercom } from 'react-use-intercom';
import navigateToPage from '@/utils/navigateToPage';
import { IntegrationProvider_Category } from '@proto/integrations';

export default function LeftSideSetupIntegration() {
    const { t } = useAppTranslation('onboarding');
    const dispatch = useAppDispatch();
    const { show } = useIntercom();
    const expanded = useAppSelector((state) => state.home.setupIntegrationExpanded);
    const { data } = OnboardingGrpcService.useGetOnboardingChecklistQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const requestIntegrationDialog = useRequestIntegrationDialog();

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        dispatch(HomeActions.setSetupIntegrationExpanded(isExpanded));
    };

    const onClickRequestIntegration = (e: React.MouseEvent) => {
        e.stopPropagation();
        requestIntegrationDialog.open({});
    };

    const onClickChatWithUs = (e: React.MouseEvent) => {
        e.stopPropagation();
        show();
    };

    const progress = data
        ? [
            data.gpsEldProviderConnected,
            data.fuelConnected,
            data.tollTransponderConnected,
            data.quickbooksConnected,
            data.loadboardsBrokersConnected
        ].filter((item) => item).length
        : 0;

    const onClickWatchVideo = () => openNewTab(SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_INTEGRATIONS);
    const onClickConnectEld = () =>
        navigateToPage('/settings/integrations', undefined, {
            viewId: IntegrationProvider_Category.ELD
        });
    const onClickConnectFuel = () =>
        navigateToPage('/settings/integrations', undefined, {
            viewId: IntegrationProvider_Category.Fuel
        });
    const onClickConnectToll = () =>
        navigateToPage('/settings/integrations', undefined, {
            viewId: IntegrationProvider_Category.Tolls
        });
    const onClickConnectQB = () =>
        navigateToPage('/settings/integrations', undefined, {
            viewId: IntegrationProvider_Category.Accounting
        });
    const onClickConnectLoadboard = () =>
        navigateToPage('/settings/integrations', undefined, {
            viewId: IntegrationProvider_Category.Loadboard
        });

    return (
        <OnBoardingAccordion
            title="onboarding:side.left.item.integration.title"
            icon={<VectorIcons.OnBoardingIcons.IntegrationIcon />}
            linkAnyQuestions={SYSTEM.ONBOARDING.ANY_QUESTION_LINKS.SETUP_INTEGRATIONS}
            onChange={handleChange}
            expanded={expanded}
            progress={progress}
            total={5}
            customSubTitle={(
                <OnBoardingAccordionComponents.Text>
                    {t('side.left.item.integration.sub_title_1')}
                    <OnBoardingAccordionComponents.Link onClick={onClickRequestIntegration}>
                        {` ${t('side.left.item.integration.sub_title_2')} `}
                    </OnBoardingAccordionComponents.Link>
                    {t('side.left.item.integration.sub_title_3')}
                    <OnBoardingAccordionComponents.Link onClick={onClickChatWithUs}>
                        {` ${t('side.left.item.integration.sub_title_4')} `}
                    </OnBoardingAccordionComponents.Link>
                    {t('side.left.item.integration.sub_title_5')}
                </OnBoardingAccordionComponents.Text>
            )}
        >
            {SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_INTEGRATIONS && (
                <OnBoardingAccordionDetailsRow
                    onClick={onClickWatchVideo}
                    isVideo
                />
            )}
            <OnBoardingAccordionDetailsRow
                onClick={onClickConnectEld}
                isCompleted={data?.gpsEldProviderConnected}
                label="onboarding:side.left.item.integration.label.connect_eld"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onClickConnectFuel}
                isCompleted={data?.fuelConnected}
                label="onboarding:side.left.item.integration.label.connect_fuel"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onClickConnectToll}
                isCompleted={data?.tollTransponderConnected}
                label="onboarding:side.left.item.integration.label.connect_toll"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onClickConnectQB}
                isCompleted={data?.quickbooksConnected}
                label="onboarding:side.left.item.integration.label.connect_qb"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onClickConnectLoadboard}
                isCompleted={data?.loadboardsBrokersConnected}
                label="onboarding:side.left.item.integration.label.connect_loadboard"
            />
        </OnBoardingAccordion>
    );
}
