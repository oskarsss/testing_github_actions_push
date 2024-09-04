/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import { Fade, Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { MouseEvent } from 'react';

type Props = {
    onClickAddBankAccount: (event: MouseEvent<HTMLElement>) => void;
};

export default function BankAccountEmptyScreen({ onClickAddBankAccount }: Props) {
    const { t } = useAppTranslation();

    return (
        <Fade
            in
            timeout={500}
        >
            <Stack
                width="100%"
                height="150px"
                pl="20px"
                pt="20px"
                alignItems="center"
                justifyContent="center"
            >
                <VectorIcons.BankIcon sx={{ fontSize: '40px', mb: '8px' }} />
                <Typography
                    fontSize="18px"
                    fontWeight={600}
                    lineHeight={1.4}
                    mb="2px"
                >
                    {t('modals:payouts.bank_account.empty.title')}
                </Typography>
                <Typography
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight={1.4}
                    width="190px"
                    color="text.secondary"
                    textAlign="center"
                    sx={{
                        span: {
                            color      : 'primary.main',
                            cursor     : 'pointer',
                            transaction: 'opacity 0.2s',

                            '&:hover': {
                                opacity: 0.8
                            }
                        }
                    }}
                >
                    <span onClick={onClickAddBankAccount}>
                        {t('modals:payouts.bank_account.empty.button')}
                    </span>
                    {` ${t('modals:payouts.bank_account.empty.text_after_btn')}`}
                </Typography>
            </Stack>
        </Fade>
    );
}
