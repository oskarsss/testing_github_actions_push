import { ComponentProps, CSSProperties, ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import TooltipStyled from '@/@core/components/table-tooltips/ui-elements/TableTooltip.styled';
import { getAvatarProps } from '@/utils/get-avatar-props';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type TextProps = {
    fullName: string;
    time: string;
    selfie: string | null;
    avatarProps?: ComponentProps<typeof Avatar>;
};

const Text = ({
    fullName,
    time,
    selfie,
    avatarProps
}: TextProps) => {
    const [firstName, lastName] = fullName ? fullName.split(' ') : ['', ''];
    const full_name = `${firstName} ${lastName ? lastName.slice(0, 1) : ''}`;

    return (
        <>
            <Avatar
                {...getAvatarProps(fullName, selfie)}
                {...avatarProps}
            />
            {full_name} {time ? <span>{time}</span> : ''}
        </>
    );
};

type Props = {
    children: ReactNode;
    fullName: string;
    isOnline: boolean;
    onlineAge: string;
    selfie: string | null;
    avatarProps?: ComponentProps<typeof Avatar>;
    tooltipProps?: Partial<ComponentProps<typeof TooltipStyled.Tooltip>>;
    containerStyle?: CSSProperties;
};

export default function Tooltip({
    children,
    fullName,
    isOnline,
    onlineAge,
    selfie,
    avatarProps,
    tooltipProps,
    containerStyle
}: Props) {
    const { t } = useAppTranslation('core');
    const time = isOnline ? t('basic.page_headers.avatars.tooltips.online') : onlineAge;

    return (
        <TooltipStyled.Tooltip
            disableInteractive
            isOnline={isOnline}
            title={(
                <Text
                    fullName={fullName}
                    time={time}
                    selfie={selfie}
                    avatarProps={avatarProps}
                />
            )}
            {...tooltipProps}
        >
            <div style={containerStyle}>{children}</div>
        </TooltipStyled.Tooltip>
    );
}
