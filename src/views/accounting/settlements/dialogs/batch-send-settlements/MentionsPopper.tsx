import { Fade, Paper, Popper, Typography, styled } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    open: boolean;
    anchorEl: HTMLElement | null;
    setMention: (mention: string) => void;
};

export const MentionsConfig = {
    recipient   : '{recipient}',
    settlementId: '{settlementId}',
    email       : '{email}',
    phoneNumber : '{phoneNumber}'
};

const Mention = styled('span')(({ theme }) => ({
    // color: theme.palette.primary.main
    fontWeight: 500
}));

function MentionsPopper({
    anchorEl,
    open,
    setMention
}: Props) {
    const { t } = useAppTranslation('modals');
    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="top"
            transition
            sx={{
                borderRadius: 1,
                zIndex      : 4400
            }}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                    <Paper
                        elevation={0}
                        sx={{
                            cursor: 'pointer',

                            border: ({ palette }) =>
                                `1px solid ${palette.semantic.border.secondary}`
                        }}
                    >
                        <Typography
                            onClick={() => setMention('recipient}')}
                            sx={{ p: 2 }}
                        >
                            <Mention>{MentionsConfig.recipient}</Mention> -{' '}
                            {t('settlements.batch_send_settlements.mentions.name')}
                        </Typography>
                        <Typography
                            onClick={() => setMention('settlementId}')}
                            sx={{ p: 2 }}
                        >
                            <Mention>{MentionsConfig.settlementId}</Mention> -{' '}
                            {t('settlements.batch_send_settlements.mentions.settlement_id')}
                        </Typography>
                        <Typography
                            onClick={() => setMention('email}')}
                            sx={{ p: 2 }}
                        >
                            <Mention>{MentionsConfig.email}</Mention> -{' '}
                            {t('settlements.batch_send_settlements.mentions.email')}
                        </Typography>
                        <Typography
                            onClick={() => setMention('phoneNumber}')}
                            sx={{ p: 2 }}
                        >
                            <Mention>{MentionsConfig.phoneNumber}</Mention> -{' '}
                            {t('settlements.batch_send_settlements.mentions.phone_number')}
                        </Typography>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}

export default MentionsPopper;
