import Link from 'next/link';
import AuthLogoStyled from '@/views/auth/components/AuthLogo/styled';
import { Box } from '@mui/material';
import SYSTEM from '@/@system';

const { LargeLogo } = SYSTEM.ASSETS;

const isRouteMate = process.env.NEXT_PUBLIC_SYSTEM_THEME_TOKEN === 'ROUTE_MATE';

export default function AuthLogo({ login = false }) {
    return (
        <Link
            href="/login"
            passHref
        >
            <AuthLogoStyled.Container>
                <Box
                    display="flex"
                    justifyContent="flex-start"
                    sx={{
                        svg: isRouteMate
                            ? {
                                width : '250px !important',
                                height: '78px !important'
                            }
                            : {
                                width : 180,
                                height: 58
                            }
                    }}
                >
                    <LargeLogo />
                </Box>
            </AuthLogoStyled.Container>
        </Link>
    );
}
