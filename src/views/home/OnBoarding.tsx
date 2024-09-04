import PerfectScrollbar from 'react-perfect-scrollbar';
import OnBoardingComponents from '@/views/home/components/OnBoardingComponents';
import RightSide from '@/views/home/components/right-side/RightSide';
import LeftSide from '@/views/home/components/left-side/LeftSide';
import OnBoardingHeader from '@/views/home/components/OnBoardingHeader';
import { Fade } from '@mui/material';

export default function OnBoarding() {
    return (
        <OnBoardingComponents.MainContainer>
            <OnBoardingHeader />

            <PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false
                }}
            >
                <Fade
                    in
                    timeout={300}
                >
                    <OnBoardingComponents.ContentContainer>
                        <LeftSide />
                        <RightSide />
                    </OnBoardingComponents.ContentContainer>
                </Fade>
            </PerfectScrollbar>
        </OnBoardingComponents.MainContainer>
    );
}
