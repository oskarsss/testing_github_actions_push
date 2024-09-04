import Typography from '@mui/material/Typography';
import CenterStyled from '@/views/fleet/drivers/Details/components/Center/styled';
import { ReactNode } from 'react';

type PopUpProps = {
    icon: ReactNode;
    title: string;
};

export default function MapPopup({
    icon,
    title
}: PopUpProps) {
    return (
        <CenterStyled.PopupWrapper>
            {icon}
            <Typography
                variant="body1"
                fontWeight={500}
                color="text.primary"
            >
                {title}
            </Typography>
        </CenterStyled.PopupWrapper>
    );
}
