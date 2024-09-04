import { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ChipsSelect from '@/@core/fields/select/ChipSelect';
import { useActiveDocumentTypes } from '@/store/documents/hooks';
import { SecondSubtitle, SecondTitle, StyledPaper } from '@/views/settings/components/styled';
import VectorIcons from '@/@core/icons/vector_icons';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditRevenueTypeDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/RevenueTypeDialog/EditRevenueTypeDialog';

type Props = {
    type: SettlementsTypes.RevenueTypes.RevenueType;
};

export default function Info({ type }: Props) {
    const { t } = useAppTranslation();
    const { documentTypes } = useActiveDocumentTypes();
    const editRevenueTypeDialog = useEditRevenueTypeDialog();
    const chips_options: { id: string; title: string }[] = [...documentTypes]
        .filter((v) => v.entityType === DocumentModel_DocumentEntityType.LOAD)
        .map((el) => ({ title: el.title, id: el.documentTypeId }));

    const handleEdit = () => {
        editRevenueTypeDialog.open({ type });
    };

    const attach_document_type_ids = useMemo(
        () =>
            chips_options
                .filter(({ id }) => type.attachDocumentTypeIds.includes(id))
                .map(({ id }) => id),
        [chips_options, type.attachDocumentTypeIds]
    );

    return (
        <Grid
            p={2}
            container
            spacing={5}
            direction="row"
        >
            <Grid
                item
                xs={4}
            >
                <StyledPaper
                    isHover
                    sx={{ width: '100%' }}
                    onClick={handleEdit}
                >
                    <Stack
                        spacing={2}
                        direction="column"
                        padding="8px 16px"
                    >
                        <VectorIcons.NavIcons.Gasoline
                            size={32}
                            style={{ fill: '#99A4B0' }}
                        />
                        <SecondSubtitle>
                            {t('settings:settlements.revenue_types.type.info.fuel.title')}
                        </SecondSubtitle>
                        <SecondTitle>
                            {t(type.deductFuel ? 'common:enabled' : 'common:disabled')}
                        </SecondTitle>
                    </Stack>
                </StyledPaper>
            </Grid>
            <Grid
                item
                xs={4}
            >
                <StyledPaper
                    isHover
                    sx={{ width: '100%' }}
                    onClick={handleEdit}
                >
                    <Stack
                        spacing={2}
                        direction="column"
                        padding="8px 16px"
                    >
                        <VectorIcons.NavIcons.Tolls />
                        <SecondSubtitle>
                            {t('settings:settlements.revenue_types.type.info.toll.title')}
                        </SecondSubtitle>
                        <SecondTitle>
                            {t(type.deductTolls ? 'common:enabled' : 'common:disabled')}
                        </SecondTitle>
                    </Stack>
                </StyledPaper>
            </Grid>
            <Grid
                item
                xs={4}
            >
                <ChipsSelect
                    readOnly
                    label="settings:settlements.revenue_types.type.info.documents.label"
                    options={chips_options}
                    name="attach_document_type_ids"
                    width="100%"
                    readOnlyValue={attach_document_type_ids}
                />
            </Grid>
        </Grid>
    );
}
