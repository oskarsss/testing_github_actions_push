import LoadOverviewStyled from '@/views/dispatch/orders/Details/sections/load-overview/LoadOverview.styled';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    onClick: () => void;
    tooltip_title?: IntlMessageKey;
};

export default function ArrowButton({
    onClick,
    tooltip_title = 'common:tooltips.open_in_new_tab'
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Tooltip
            disableInteractive
            title={t(tooltip_title)}
        >
            <LoadOverviewStyled.IconButton onClick={onClick}>
                <KeyboardArrowRightIcon />
            </LoadOverviewStyled.IconButton>
        </Tooltip>
    );
}
