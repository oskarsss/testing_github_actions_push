import TooltipComponent from '@/@core/components/avatar-tooltip-info/AvatarTooltipInfo';
import { BadgeOnlineContainer } from '@/@core/ui-kits/page-headers/components/AvatarGroup/styled';

// import { getPublicURL } from '@/configs/storage';
import Avatar from '@mui/material/Avatar';
import { useUsersPings } from '@/store/streams/events/hooks';
import moment from 'moment-timezone';
import { Stack } from '@mui/material';
import { FormattedRow } from '@/@grpcServices/services/users-service/hooks';
import { useRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { getPublicURL } from '@/configs/storage';

type Props = {
    row: FormattedRow;
};

export default function MembersNameCell({ row }: Props) {
    const users_ping = useUsersPings();
    const user_ping = users_ping.find((ping) => ping.userId === row.userId);
    const online = user_ping ? Date.now() - user_ping.timestamp < 1000 * 60 * 3 : false;
    const online_age = user_ping ? moment(user_ping.timestamp).fromNow() : '';

    const { data } = useRetrieveFileStream(row.selfieThumbUrl);

    const url = getPublicURL(row.selfieThumbUrl);
    return (
        <TooltipComponent
            fullName={row.fullName}
            selfie={row.selfieThumbUrl}
            online={online}
            online_age={online_age}
            avatar_props={{
                sx: {
                    bgcolor: (theme) => theme.palette.semantic.background.secondary
                }
            }}
            tooltip_props={{
                placement: 'bottom-start'
            }}
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="10px"
            >
                <BadgeOnlineContainer isOnline={online}>
                    <Avatar
                        alt={row.fullName}
                        src={url}
                        sx={{
                            width   : '24px',
                            height  : '24px',
                            fontSize: '12px'
                        }}
                    >
                        {row.firstName[0]}
                        {row.lastName[0]}
                    </Avatar>
                </BadgeOnlineContainer>
                {row.fullName}
            </Stack>
        </TooltipComponent>
    );
}
