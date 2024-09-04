import { MouseEvent } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavHeaderStyled from '../styled';

type Props = {
    navCollapsed: boolean;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function NavHeaderButton({
    navCollapsed,
    onClick
}: Props) {
    const menuCollapsedStyles = navCollapsed ? { opacity: 0, display: 'none' } : { opacity: 1 };

    return (
        <NavHeaderStyled.ButtonIcon
            onClick={onClick}
            sx={menuCollapsedStyles}
        >
            <KeyboardArrowDownIcon />
        </NavHeaderStyled.ButtonIcon>
    );
}
