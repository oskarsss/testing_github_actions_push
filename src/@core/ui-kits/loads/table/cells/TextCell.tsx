import clsx from 'clsx';
import styles from './VUIKOrdersTableCells.module.scss';

type Props = {
    title: string;
    description: string;
    descriptionSize?: 'small' | 'medium';
};

export const OrdersTableTextCell = ({
    description,
    title,
    descriptionSize = 'small'
}: Props) => (
    <div className={styles.container}>
        <p className={styles.title}>{title}</p>
        <p
            className={clsx(styles.description, {
                [styles.descriptionSmall] : descriptionSize === 'small',
                [styles.descriptionMedium]: descriptionSize === 'medium'
            })}
        >
            {description}
        </p>
    </div>
);
