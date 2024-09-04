import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';
import OnBoardingChart from '@/views/home/components/right-side/on-boarding-chart/OnBoardingChart';
import OnBoardingInviteTeam from '@/views/home/components/right-side/on-boarding-invite-team/OnBoardingInviteTeam';
import OnBoardingContactUs from '@/views/home/components/right-side/on-boarding-contact-us/OnBoardingContactUs';
import OnBoardingMoreResources from '@/views/home/components/right-side/on-boarding-more-resources/OnBoardingMoreResources';
import OnBoardingFollowMedia from '@/views/home/components/right-side/on-boarding-follow-media/OnBoardingFollowMedia';
import OnBoardingTraining from '@/views/home/components/right-side/on-boarding-training/OnBoardingTraining';

export default function RightSide() {
    return (
        <RightSideComponents.Container>
            <OnBoardingChart />
            <OnBoardingInviteTeam />
            <OnBoardingContactUs />
            <OnBoardingMoreResources />
            <OnBoardingFollowMedia />
            <OnBoardingTraining />
        </RightSideComponents.Container>
    );
}
