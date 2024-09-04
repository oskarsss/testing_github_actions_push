/* eslint-disable no-nested-ternary */

import VectorIcons from '@/@core/icons/vector_icons';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import OnBoardingAccordionDetailsComponents from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsComponents';
import { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    label?: IntlMessageKey;
    isVideo?: boolean;
    isOptional?: boolean;
    isCompleted?: boolean;
    onClick?: () => void;
};

export default function OnBoardingAccordionDetailsRow({
    label = 'onboarding:side.left.item.label.watch_video',
    isVideo,
    isOptional,
    isCompleted,
    onClick
}: Props) {
    const { t } = useAppTranslation();
    return (
        <OnBoardingAccordionDetailsComponents.RowContainer onClick={onClick}>
            <OnBoardingAccordionDetailsComponents.RowWrapper>
                {isVideo ? (
                    <VectorIcons.OnBoardingIcons.VideoCircleIcon color="primary" />
                ) : isCompleted ? (
                    <VectorIcons.CircleCheckIcon />
                ) : (
                    <VectorIcons.CircleDashedIcon />
                )}

                <OnBoardingAccordionDetailsComponents.RowLabel>
                    {t(label)}
                </OnBoardingAccordionDetailsComponents.RowLabel>

                {isOptional && (
                    <OnBoardingAccordionDetailsComponents.OptionalChipLabel>
                        {t('onboarding:side.left.item.label.optional')}
                    </OnBoardingAccordionDetailsComponents.OptionalChipLabel>
                )}
            </OnBoardingAccordionDetailsComponents.RowWrapper>
            <VectorIcons.ChevronUpIcon className="chevronUpIcon" />
        </OnBoardingAccordionDetailsComponents.RowContainer>
    );
}
