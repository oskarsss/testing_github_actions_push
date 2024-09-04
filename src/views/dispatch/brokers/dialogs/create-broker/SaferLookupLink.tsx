import { Button, styled } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { applyTestId, TestIDs } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const LinkButton = styled(Link)(() => ({
    marginLeft: 'auto',
    button    : {
        fontWeight   : 500,
        fontSize     : 14,
        lineHeight   : '150%',
        textTransform: 'uppercase',
        whiteSpace   : 'nowrap',
        svg          : {
            weight     : 20,
            height     : 20,
            marginRight: 4
        }
    }
}));

export default function SaferLookupLink() {
    const { t } = useAppTranslation('modals');
    return (
        <LinkButton
            href="https://safer.fmcsa.dot.gov/CompanySnapshot.aspx"
            target="_blank"
            {...applyTestId(TestIDs.pages.brokerDialog.buttons.saferLookupLink)}
        >
            <Button
                variant="text"
                size="small"
            >
                {t('brokers.add.safer_lookup')}
            </Button>
        </LinkButton>
    );
}
