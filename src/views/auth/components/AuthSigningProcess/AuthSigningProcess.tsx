import { useAppTranslation } from '@/hooks/useAppTranslation';
import AuthProcessing from '@/@core/ui-kits/basic/auth-processing';
import styles from './AuthSigningProcess.module.scss';

const AuthSigningProcess = () => {
    const { t } = useAppTranslation();

    return (
        <AuthProcessing
            text={t('auth:signing_in')}
            className={styles.container}
        />
    );
};

export default AuthSigningProcess;
