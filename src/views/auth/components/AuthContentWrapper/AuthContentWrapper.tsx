import { CSSProperties, ReactNode } from 'react';
import { Fade } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TestIDs, applyTestId } from '@/configs/tests';

type Props = {
    children: ReactNode;
    styles?: CSSProperties;
};

export default function AuthContentWrapper({
    children,
    styles = {}
}: Props) {
    return (
        <Fade
            in
            timeout={500}
        >
            <Card {...applyTestId(TestIDs.pages.login.areas.login)}>
                <CardContent sx={{ padding: '3rem 2.25rem 1.75rem !important', ...styles }}>
                    {children}
                </CardContent>
            </Card>
        </Fade>
    );
}
