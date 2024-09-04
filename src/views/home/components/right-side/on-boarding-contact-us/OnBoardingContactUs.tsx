import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';
import { useIntercom } from 'react-use-intercom';
import SYSTEM from '@/@system';
import React from 'react';
import ScheduleCallButton from '@/views/home/components/right-side/on-boarding-contact-us/ScheduleCallButton';

export default function OnBoardingContactUs() {
    const { t } = useAppTranslation();
    const { show } = useIntercom();

    return (
        <>
            <RightSideComponents.Divider />
            <RightSideComponents.Wrapper>
                <RightSideComponents.TitleWrapper>
                    <RightSideComponents.Title>
                        {t('onboarding:side.right.item.contact_us.title')}
                    </RightSideComponents.Title>
                    <RightSideComponents.SubTitle>
                        {t('onboarding:side.right.item.contact_us.sub_title')}
                    </RightSideComponents.SubTitle>
                </RightSideComponents.TitleWrapper>
                <RightSideComponents.ControllersWrapper>
                    {SYSTEM.SCHEDULE_CALL_LINK && (
                        <ScheduleCallButton link={SYSTEM.SCHEDULE_CALL_LINK} />
                    )}
                    <RightSideComponents.Button
                        startIcon={<VectorIcons.ChatIcon />}
                        variant="outlined"
                        onClick={show}
                    >
                        {t('onboarding:side.right.item.contact_us.button.start_chat')}
                    </RightSideComponents.Button>
                </RightSideComponents.ControllersWrapper>
            </RightSideComponents.Wrapper>
        </>
    );
}
