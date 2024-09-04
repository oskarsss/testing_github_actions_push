import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { ComponentProps, CSSProperties, ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import { getAvatarProps } from '@/utils/get-avatar-props';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const TooltipStyled = styled(
    ({
        className = '',
        children,
        online,
        ...props
    }: TooltipProps & { online?: boolean }) => (
        <Tooltip
            {...props}
            classes={{ tooltip: className }}
        >
            {children}
        </Tooltip>
    )
)(({
    theme,
    online
}) => ({
    backgroundColor: theme.palette.semantic.background.white,
    color          : theme.palette.semantic.text.secondary,
    fontWeight     : 500,
    fontSize       : '12px',
    display        : 'flex',
    alignItems     : 'center',
    gap            : '8px',
    boxShadow      : '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    borderRadius   : '32px',
    padding        : '4px 12px',

    '& .MuiAvatar-root': {
        fontSize: '10px',
        width   : '18px',
        height  : '18px'
    },

    span: {
        position  : 'relative',
        marginLeft: '4px',
        color     : online
            ? theme.palette.semantic.border.success.primary
            : theme.palette.semantic.text.secondary
    },

    'span:before': {
        content        : '""',
        display        : 'block',
        borderRadius   : '2px',
        width          : '4px',
        height         : '4px',
        backgroundColor: online
            ? theme.palette.semantic.border.success.primary
            : theme.palette.semantic.text.secondary,
        position: 'absolute',
        left    : '-8px',
        top     : '7px'
    }
}));

type Props = {
    children: ReactNode;
    fullName: string;
    online: boolean;
    online_age: string;
    selfie: string | null;
    avatar_props?: ComponentProps<typeof Avatar>;
    tooltip_props?: Partial<ComponentProps<typeof TooltipStyled>>;
    container_style?: CSSProperties;
};

export default function TooltipComponent({
    children,
    fullName,
    online,
    online_age,
    selfie,
    avatar_props,
    tooltip_props,
    container_style
}: Props) {
    const [first_name, last_name] = fullName ? fullName.split(' ') : ['', ''];
    const { t } = useAppTranslation('common');

    const full_name = `${first_name} ${last_name ? last_name.slice(0, 1) : ''}`;
    const time = online ? t('online') : online_age;
    const text = (
        <>
            <Avatar
                {...getAvatarProps(fullName, selfie)}
                {...avatar_props}
            />
            {full_name} {time ? <span>{time}</span> : ''}
        </>
    );
    return (
        <TooltipStyled
            disableInteractive
            online={online}
            title={text}
            {...tooltip_props}
        >
            <div style={container_style}>{children}</div>
        </TooltipStyled>
    );
}
