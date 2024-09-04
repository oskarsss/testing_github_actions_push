import { Stack } from '@mui/material';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useAssignTollMenu } from '@/views/accounting/tolls/menus/assign-toll-to-equipment/AssignTollMenu';

type Props = {
    tollId: string;
};

function TollAssignEquipment({ tollId }: Props) {
    const assignToll = useAssignTollMenu();
    const { t } = useAppTranslation('common');

    return (
        <Stack
            direction="row"
            spacing={1}
            paddingX={3}
            alignItems="center"
            color={(theme) => theme.palette.semantic.foreground.brand.primary}
            fontWeight={500}
            onClick={assignToll.open({ tollId })}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                assignToll.open({ tollId })(e);
            }}
        >
            <ControlPointDuplicateIcon
                color="primary"
                style={{ marginRight: '6px', fontSize: '20px' }}
            />
            {t('button.assign')}
        </Stack>
    );
}

export default TollAssignEquipment;
