import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';

export default function OnBoardingTraining() {
    const { t } = useAppTranslation('onboarding');

    if (!SYSTEM.SCHEDULE_SESSION_LINK) return null;
    return (
        <>
            <RightSideComponents.Divider />
            <RightSideComponents.Wrapper>
                <RightSideComponents.TitleWrapper>
                    <RightSideComponents.Title>
                        {t('side.right.item.personalized_training.title')}
                    </RightSideComponents.Title>
                    <RightSideComponents.SubTitle>
                        {t('side.right.item.personalized_training.sub_title')}
                    </RightSideComponents.SubTitle>
                </RightSideComponents.TitleWrapper>
                <RightSideComponents.ControllersWrapper>
                    <RightSideComponents.Button
                        startIcon={<VectorIcons.GraduationCapIcon />}
                        variant="outlined"
                        onClick={() => openNewTab(SYSTEM.SCHEDULE_SESSION_LINK)}
                    >
                        {t('side.right.item.personalized_training.button.schedule_session')}
                    </RightSideComponents.Button>
                </RightSideComponents.ControllersWrapper>
            </RightSideComponents.Wrapper>
        </>
    );
}
