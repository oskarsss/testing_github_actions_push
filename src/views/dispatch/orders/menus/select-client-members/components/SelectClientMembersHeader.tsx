import { Typography, Stack } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    clientName: string;
    orderFriendlyId: string;
};

export default function SelectClientMembersHeader({
    clientName,
    orderFriendlyId
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack>
            <Typography
                fontSize="20px"
                fontWeight={600}
                lineHeight={1.3}
                color={(theme) => theme.palette.semantic.text.secondary}
            >
                <Typography
                    component="span"
                    fontSize="inherit"
                    fontWeight="inherit"
                    lineHeight="inherit"
                    color={(theme) => theme.palette.semantic.text.primary}
                >
                    {t('common:loads.friendlyId', { friendlyId: orderFriendlyId })}
                </Typography>
                {` | ${clientName}`}
            </Typography>
            <Typography
                fontSize="20px"
                fontWeight={600}
                lineHeight={1.3}
                color={(theme) => theme.palette.semantic.text.secondary}
            >
                {t('modals:loads.client_members.title')}
            </Typography>
        </Stack>
    );
}
