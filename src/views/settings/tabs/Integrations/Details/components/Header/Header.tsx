import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SettingIcons from '@/views/settings/icons/icons';
import { SettingsIcon } from '@/@core/icons/custom-nav-icons/icons';
import { BreadcrumbsItem } from '@/views/settings/tabs/Integrations/Details/components/Header/BreadcrumbsItem';

const default_route = [
    {
        icon : <SettingsIcon isActive={false} />,
        title: 'settings:integrations.details.route.settings',
        link : '/settings'
    },
    {
        icon : <SettingIcons.Integrations />,
        title: 'settings:integrations.details.route.integrations',
        link : '/settings/integrations'
    }
] as const;

export default function Header({ name }: { name: string }) {
    return (
        <Breadcrumbs
            separator={(
                <NavigateNextIcon
                    sx={{
                        width : '16px',
                        height: '16px',
                        color : (theme) => theme.palette.semantic.foreground.primary
                    }}
                />
            )}
            aria-label="breadcrumb"
            sx={{
                marginBottom: '16px',
                position    : 'relative',
                zIndex      : 10
            }}
        >
            {default_route.map((config) => (
                <BreadcrumbsItem
                    key={config.title}
                    icon={config.icon}
                    title={config.title}
                    link={config.link}
                />
            ))}
            <BreadcrumbsItem
                active
                title={<span>{name}</span>}
            />
        </Breadcrumbs>
    );
}
