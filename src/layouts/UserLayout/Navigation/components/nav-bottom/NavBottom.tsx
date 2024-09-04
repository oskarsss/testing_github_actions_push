import { LayoutSettingsType, SaveLayoutSettingsType } from '@/context/LayoutSettingsContext';
import { GroupName } from '@/layouts/UserLayout/Navigation/components/NavItems/permissions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import ChangeTheme from './ChangeTheme/ChangeTheme';
import UserLogout from './UserLogout/UserLogout';
import CollapseNav from './CollapseNav/CollapseNav';
import NavBottomStyled from './styled';

type Props = {
    isFullVisible: boolean;
    setGroupActive: (group: GroupName[]) => void;
    settings: LayoutSettingsType;
    saveSettings: SaveLayoutSettingsType;
};

export default function NavBottom({
    settings,
    saveSettings,
    isFullVisible,
    setGroupActive
}: Props) {
    const collapsed = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
    return (
        <NavBottomStyled.Wrapper>
            <ChangeTheme isFullVisible={isFullVisible} />
            <UserLogout isFullVisible={isFullVisible} />
            <NavBottomStyled.Divider />

            {!collapsed && (
                <CollapseNav
                    isFullVisible={isFullVisible}
                    setGroupActive={setGroupActive}
                    saveSettings={saveSettings}
                    settings={settings}
                />
            )}
        </NavBottomStyled.Wrapper>
    );
}
