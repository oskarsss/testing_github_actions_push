import type { MouseEvent } from 'react';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import Typography from '@mui/material/Typography';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';

type Props = {
    full_name: string;
    src: string;
    last_seen: string;
    onOpenOptionsMenu: (e: MouseEvent<HTMLButtonElement>) => void;
    onClick?: (e?: MouseEvent) => void;
    is_hover_exist?: boolean;
};

export default function UserMarkup({
    full_name,
    src,
    last_seen,
    onOpenOptionsMenu,
    onClick,
    is_hover_exist
}: Props) {
    return (
        <RightStyled.UserWrapper
            onClick={onClick}
            is_hover_exist={is_hover_exist}
        >
            <RightStyled.UserBlock>
                <RightStyled.AvatarStyled
                    alt={full_name}
                    src={src}
                />
                <RightStyled.UserInfo>
                    <Typography variant="h6">{full_name}</Typography>

                    <Typography
                        variant="body2"
                        fontWeight={500}
                    >
                        {last_seen}
                    </Typography>
                </RightStyled.UserInfo>

                <RightStyled.Icon onClick={onOpenOptionsMenu}>
                    <MoreVertSharpIcon color="secondary" />
                </RightStyled.Icon>
            </RightStyled.UserBlock>
        </RightStyled.UserWrapper>
    );
}
