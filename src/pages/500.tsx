// ** Next/React Imports
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// ** MUI
import { Button, Popover, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

// ** additional
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { GetServerSidePropsContext } from 'next';
import getTranslation from '@/utils/getTranslation';
import image500 from '../../public/images/pages/500.svg';

const styles: Record<string, React.CSSProperties> = {
    container: {
        width          : '100%',
        height         : '100vh',
        backgroundColor: '#F4F5FA',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center'
    },
    wrap: {
        display      : 'flex',
        alignItems   : 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize     : 96,
        fontWeight   : 600,
        lineHeight   : 1.43,
        letterSpacing: '0.17px',
        margin       : '0 0 8px'
    },
    desc: {
        fontSize     : 25,
        fontWeight   : 500,
        letterSpacing: '0.17px',
        lineHeight   : 1.43,
        color        : '#71737E',
        margin       : 0
    },
    bottom: {
        display   : 'flex',
        alignItems: 'center',
        gap       : 30,
        marginTop : 56
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
    },
    image: {
        maxWidth: '45%',
        width   : '100%'
    }
};

type ReportIssueProps = {
    onClose: () => void;
};

const ReportIssue = ({ onClose }: ReportIssueProps) => {
    const [comment, setComment] = useState('');
    const { t } = useAppTranslation();
    const onSubmit = () => {
        if (comment.length === 0) return;
        setComment('');
        onClose();
    };

    return (
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

const Error500 = () => {
    const [anchorEl, setAnchorEl] = useState<null |(EventTarget & HTMLButtonElement)>(null);
    const { t } = useAppTranslation();
    const router = useRouter();

    const closeMenu = () => setAnchorEl(null);
    const onBackHome = () => {
        // localStorage.clear()
        router.replace('/');
    };

    return (
        <div style={styles.container}>
            {/* ---------------------------- TITLE AND DESC ----------------------------*/}
            <div style={styles.wrap}>
                <h3 style={styles.title}>{t('error:500.title')}</h3>
                <p style={styles.desc}>{t('error:500.desc_first')}</p>
                <p style={styles.desc}>{t('error:500.desc_second')}</p>

                {/* ---------------------------- BUTTON ----------------------------*/}
                <div style={styles.bottom}>
                    <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        sx={styles.button}
                        onClick={onBackHome}
                    >
                        {t('error:btn.back_home')}
                    </Button>
                    <Button
                        variant="outlined"
                        sx={styles.button}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    >
                        {t('error:btn.report_issue')}
                    </Button>
                </div>
            </div>

            {/* ---------------------------- IMAGE ----------------------------*/}
            <Image
                src={image500}
                height={632}
                width={843}
                alt="error image"
                loading="eager"
                style={styles.image}
            />

            {/* ---------------------------- MENU ----------------------------*/}
            <Popover
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                anchorEl={anchorEl}
            >
                <ReportIssue onClose={closeMenu} />
            </Popover>
        </div>
    );
};

// Error500.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
export default Error500;

// ----------------- Component ReportIssue -----------------------
export async function getStaticProps({ locale }: GetServerSidePropsContext) {
    return {
        props: {
            messages: await getTranslation(locale, ['error'])
        }
    };
}
