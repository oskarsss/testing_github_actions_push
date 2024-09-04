import { Badge, Stack } from '@mui/material';
import MoreDriversTooltip from '@/@core/components/overview-driver-avatar/MoreDriversTooltip';

type Props = {
    children: React.ReactNode;
    driverIds: string[];
};

export default function MoreDriversBadge({
    children,
    driverIds
}: Props) {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            invisible={driverIds.length < 1}
            badgeContent={(
                <MoreDriversTooltip driverIds={driverIds}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        width="16px"
                        height="16px"
                        fontSize="9px"
                        fontWeight={600}
                        lineHeight={1}
                        borderRadius="50%"
                        sx={{
                            backgroundColor: (theme) => theme.palette.semantic.background.white,
                            border         : (theme) =>
                                `1px solid ${theme.palette.semantic.border.secondary}`
                        }}
                    >
                        {`+${driverIds.length}`}
                    </Stack>
                </MoreDriversTooltip>
            )}
        >
            {children}
        </Badge>
    );
}
