import { useAppTranslation } from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import { PropsWithChildren } from 'react';
import ControlsStyled from '@/views/dispatch/manifests/components/controls/styled';

export default function NoDriver({ children }: PropsWithChildren) {
    const { t } = useAppTranslation('common');
    return (
        <ControlsStyled.Container>
            <Typography
                variant="body1"
                color="semantic.text.secondary"
                fontWeight={500}
                textAlign="center"
                width="100%"
            >
                {t('empty.no_driver')}
            </Typography>
            {children}
        </ControlsStyled.Container>
    );
}
