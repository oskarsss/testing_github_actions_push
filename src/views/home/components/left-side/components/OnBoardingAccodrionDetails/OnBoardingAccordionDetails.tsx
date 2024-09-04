import Divider from '@mui/material/Divider';
import React from 'react';
import OnBoardingAccordionDetailsComponents from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsComponents';

type Props = {
    children: React.ReactNode;
};

export default function OnBoardingAccordionDetails({ children }: Props) {
    return (
        <OnBoardingAccordionDetailsComponents.Container>
            <Divider sx={{ margin: '0px 0px 20px' }} />
            <OnBoardingAccordionDetailsComponents.RowsContainer>
                {children}
            </OnBoardingAccordionDetailsComponents.RowsContainer>
        </OnBoardingAccordionDetailsComponents.Container>
    );
}
