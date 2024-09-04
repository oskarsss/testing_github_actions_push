import { ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import Loading from '@/@core/components/page/Loading';
import { useTheme } from '@mui/material';
import styles from './Charts.module.scss';

type Props = {
    header: ReactNode;
    children: ReactNode;
    isLoading: boolean;
    styleContent?: object;
};

export default function ChartContainer({
    header,
    children,
    isLoading,
    styleContent
}: Props) {
    const { palette } = useTheme();
    return (
        <Paper
            elevation={0}
            className={styles.Section}
            sx={{
                backgroundColor: palette.semantic.foreground.white.tertiary,
                border         : `1px solid ${palette.semantic.border.primary}`
            }}
        >
            <div
                className={styles.Header}
                style={{
                    borderBottom: `1px solid ${palette.semantic.border.secondary}`
                }}
            >
                {header}
            </div>
            <div
                className={styles.Content}
                style={styleContent}
            >
                {isLoading ? <Loading /> : children}
            </div>
        </Paper>
    );
}
