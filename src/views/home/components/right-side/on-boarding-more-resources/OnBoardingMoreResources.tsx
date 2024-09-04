import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';
import SYSTEM from '@/@system';
import openNewTab from '@/utils/openNewTab';
import { useRequestIntegrationDialog } from '@/views/settings/tabs/Integrations/dialogs/RequestIntegration/RequestIntegration';

export default function OnBoardingMoreResources() {
    const { t } = useAppTranslation('onboarding');
    const requestIntegrationDialog = useRequestIntegrationDialog();

    return (
        <>
            <RightSideComponents.Divider />
            <RightSideComponents.Wrapper>
                <RightSideComponents.TitleWrapper>
                    <RightSideComponents.Title>
                        {t('side.right.item.more_resources.title')}
                    </RightSideComponents.Title>
                    <RightSideComponents.SubTitle>
                        {t('side.right.item.more_resources.sub_title')}
                    </RightSideComponents.SubTitle>
                </RightSideComponents.TitleWrapper>
                <RightSideComponents.ControllersWrapper>
                    {SYSTEM.HELP_LINK && (
                        <RightSideComponents.Button
                            onClick={() => openNewTab(SYSTEM.HELP_LINK)}
                            color="primary"
                            endIcon={<VectorIcons.OpenNewWindowIcon />}
                        >
                            {t('side.right.item.more_resources.button.help_center')}
                        </RightSideComponents.Button>
                    )}
                    {SYSTEM.CHANGE_LOG_LINK && (
                        <RightSideComponents.Button
                            onClick={() => openNewTab(SYSTEM.CHANGE_LOG_LINK)}
                            color="primary"
                            endIcon={<VectorIcons.OpenNewWindowIcon />}
                        >
                            {t('side.right.item.more_resources.button.update_changelog')}
                        </RightSideComponents.Button>
                    )}
                    {SYSTEM.FEEDBACK_EMAIL && (
                        <RightSideComponents.Button
                            href={`mailto:${SYSTEM.FEEDBACK_EMAIL}`}
                            color="primary"
                            endIcon={<VectorIcons.OpenNewWindowIcon />}
                        >
                            {t('side.right.item.more_resources.button.submit_feedback')}
                        </RightSideComponents.Button>
                    )}
                    <RightSideComponents.Button
                        onClick={requestIntegrationDialog.open}
                        color="primary"
                        endIcon={<VectorIcons.OpenNewWindowIcon />}
                    >
                        {t('side.right.item.more_resources.button.request_integration')}
                    </RightSideComponents.Button>
                </RightSideComponents.ControllersWrapper>
            </RightSideComponents.Wrapper>
        </>
    );
}
