// ** Next/React Imports
import { useState } from 'react';
import Image from 'next/image';

// ** MUI
import { Button, Popover, TextField } from '@mui/material';

// ** additional
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { GetServerSidePropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import image404 from '../../public/images/pages/404.svg';

type ReportIssueProps = {
    onClose: () => void;
};

// ----------------- Component ReportIssue -----------------------
const ReportIssue = ({ onClose }: ReportIssueProps) => {
    const [comment, setComment] = useState('');
    const { t } = useAppTranslation();
    const onSubmit = () => {
        if (comment.length === 0) return;
        setComment('');
        onClose();
    };

    return (
        // eslint-disable-next-line no-use-before-define
        <div style={styles.reportWrap}>
            <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                label={t('error:btn.report_issue')}
                multiline
                rows={3}
            />
            <Button
                onClick={onSubmit}
                variant="contained"
                sx={{ width: '100%', height: 42 }}
            >
                {t('error:btn.submit')}
            </Button>
        </div>
    );
};

// ----------------- STYLES -----------------------
const styles: Record<string, React.CSSProperties> = {
    container: {
        width : '100%',
        height: '100vh',

        // backgroundColor: '#F4F5FA',
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        justifyContent: 'center'
    },
    image: {
        position: 'relative',
        left    : 125
    },
    title: {
        fontSize     : 66,
        fontWeight   : 600,
        lineHeight   : 1.43,
        letterSpacing: '0.17px',
        margin       : '58px 0 8px'
    },
    desc: {
        fontSize     : 24,
        fontWeight   : 500,
        letterSpacing: '0.17px',
        lineHeight   : 1.43,
        color        : '#71737E',
        margin       : 0
    },
    bottom: {
        marginTop : 50,
        display   : 'flex',
        alignItems: 'center',
        gap       : 30
    },
    button: {
        width : 180,
        height: 42
    },
    reportWrap: {
        padding        : 20,
        width          : 300,
        backgroundColor: '#fff',
        display        : 'flex',
        flexDirection  : 'column',
        gap            : 15
    }
};

const Error404 = () => {
    const [anchorEl, setAnchorEl] = useState<null |(EventTarget & HTMLButtonElement)>(null);

    const { t } = useAppTranslation();

    const closeMenu = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.background.primary
            }}
            style={styles.container}
        >
            {/* ---------------------------- IMAGE ----------------------------*/}
            <Image
                src={image404}
                height={288}
                width={1081}
                alt="error image"
                loading="eager"
                style={styles.image}
            />

            {/* ---------------------------- TITLE AND DESC ----------------------------*/}
            <h3 style={styles.title}>{t('error:404.title')}</h3>

            <Typography
                variant="body1"
                fontSize="24px"
                fontWeight={500}
                sx={{
                    color : (theme) => theme.palette.semantic.foreground.quarterary,
                    margin: 0
                }}
            >
                {t('error:404.desc_first')}
            </Typography>

            <Typography
                variant="body1"
                fontSize="24px"
                fontWeight={500}
                sx={{
                    color : (theme) => theme.palette.semantic.foreground.quarterary,
                    margin: 0
                }}
            >
                {t('error:404.desc_second')}
            </Typography>

            {/* ---------------------------- BOTTOM ----------------------------*/}
            <div style={styles.bottom}>
                <Button
                    variant="outlined"
                    sx={styles.button}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    {t('error:btn.report_issue')}
                </Button>
            </div>

            {/* ---------------------------- MENU ----------------------------*/}
            <Popover
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                anchorEl={anchorEl}
            >
                <ReportIssue onClose={closeMenu} />
            </Popover>
        </Box>
    );
};

// Error404.getLayout = (page) => <UserLayout>{page}</UserLayout>;
export default Error404;

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
    return {
        props: {
            messages: await getTranslation(locale, ['error'])
        }
    };
}
