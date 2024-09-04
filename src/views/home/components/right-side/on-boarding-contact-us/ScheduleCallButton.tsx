import { useAppTranslation } from '@/hooks/useAppTranslation';
import RightSideComponents from '@/views/home/components/right-side/components/RightSideComponents';
import VectorIcons from '@/@core/icons/vector_icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PopupModal } from 'react-calendly';
import { useState } from 'react';

type Props = {
    link: string;
};

export default function ScheduleCallButton({ link }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useAppTranslation();
    return (
        <div>
            <RightSideComponents.Button
                startIcon={<VectorIcons.VideoIcon />}
                variant="outlined"
                onClick={() => setIsOpen(true)}
            >
                {t('onboarding:side.right.item.contact_us.button.schedule_call')}
            </RightSideComponents.Button>
            <PopupModal
                url={link}
                onModalClose={() => setIsOpen(false)}
                open={isOpen}
                rootElement={document.body}
            />
        </div>
    );
}
