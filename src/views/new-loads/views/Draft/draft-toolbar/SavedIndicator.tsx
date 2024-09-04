import { Fade } from '@mui/material';
import { memo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import ToolbarStyled from './Toolbar.styled';

type Props = {
    Icon: React.FC;
    title: IntlMessageKey;
};

const SavedIndicator = ({
    Icon,
    title
}: Props) => {
    const { t } = useAppTranslation();
    return (
        <Fade in>
            <ToolbarStyled.DraftSavedRow>
                <Icon />
                {t(title)}
            </ToolbarStyled.DraftSavedRow>
        </Fade>
    );
};

export default memo(SavedIndicator);
