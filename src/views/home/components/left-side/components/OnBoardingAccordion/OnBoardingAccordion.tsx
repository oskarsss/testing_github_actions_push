import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Fade } from '@mui/material';
import { AccordionProps } from '@mui/material/Accordion';
import OnBoardingAccordionComponents from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordionComponents';
import OnBoardingAccordionDetails from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetails';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';
import { IntlMessageKey } from '@/@types/next-intl';
import CircleProgressBar from '@/@core/components/circle-progress-bar';

type Props = {
    title: IntlMessageKey;
    subTitle?: IntlMessageKey;
    icon: React.ReactNode;
    expanded: boolean;
    linkAnyQuestions: string;
    onChange: AccordionProps['onChange'];
    progress: number;
    total: number;
    customSubTitle?: React.ReactNode;
    children?: React.ReactNode;
};

export default function OnBoardingAccordion({
    title,
    subTitle,
    icon,
    expanded,
    progress,
    total,
    linkAnyQuestions,
    onChange,
    customSubTitle,
    children
}: Props) {
    const [hover, setHover] = React.useState<boolean>(false);
    const { t } = useAppTranslation();

    const onClickAnyQuestions = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openNewTab(linkAnyQuestions || SYSTEM.HELP_LINK);
    };

    return (
        <OnBoardingAccordionComponents.Accordion
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            expanded={expanded}
            onChange={onChange}
        >
            <OnBoardingAccordionComponents.Container>
                <OnBoardingAccordionComponents.WrapperLeft>
                    <OnBoardingAccordionComponents.IconContainer>
                        {icon}
                    </OnBoardingAccordionComponents.IconContainer>
                    <OnBoardingAccordionComponents.TextWrapper>
                        <OnBoardingAccordionComponents.Title>
                            {t(title)}
                        </OnBoardingAccordionComponents.Title>
                        {subTitle ? (
                            <OnBoardingAccordionComponents.Text>
                                {t(subTitle)}
                            </OnBoardingAccordionComponents.Text>
                        ) : (
                            customSubTitle
                        )}
                    </OnBoardingAccordionComponents.TextWrapper>
                </OnBoardingAccordionComponents.WrapperLeft>
                <OnBoardingAccordionComponents.WrapperRight>
                    {(linkAnyQuestions || SYSTEM.HELP_LINK) && (
                        <Fade in={hover}>
                            <OnBoardingAccordionComponents.AdditionalButton
                                endIcon={<VectorIcons.QuestionIcon />}
                                onClick={onClickAnyQuestions}
                            >
                                {t('onboarding:side.left.item.button.questions')}
                            </OnBoardingAccordionComponents.AdditionalButton>
                        </Fade>
                    )}
                    <OnBoardingAccordionComponents.Text>
                        {t('onboarding:side.left.item.progress', { progress, total })}
                    </OnBoardingAccordionComponents.Text>
                    <CircleProgressBar
                        value={Math.round((progress / total) * 100)}
                        size={24}
                    />
                    <OnBoardingAccordionComponents.IconButton expanded={expanded}>
                        <VectorIcons.ChevronUpIcon />
                    </OnBoardingAccordionComponents.IconButton>
                </OnBoardingAccordionComponents.WrapperRight>
            </OnBoardingAccordionComponents.Container>
            <OnBoardingAccordionDetails>{children}</OnBoardingAccordionDetails>
        </OnBoardingAccordionComponents.Accordion>
    );
}
