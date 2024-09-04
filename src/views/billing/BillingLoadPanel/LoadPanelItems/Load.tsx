import { Avatar, Stack, TextField, Typography } from '@mui/material';
import LoadStatusChipSelect from '@/@core/fields/chip-select/LoadStatusChipSelect';
import { LoadStatus } from '@/models/loads/load';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';
import { useAllEquipmentTypes } from '@/store/equipments/hooks';
import BillingLoadPanelComponents from '../BillingLoadPanelComponents';

type Props = {
    loadId: string;
    loadStatus: LoadStatus;
    dispatcherId: string;
    loadTypeId: string;
    equipmentId: string;
    weight: string;
    commodity: string;
    note: string;
};

function Load({
    loadId,
    loadStatus,
    dispatcherId,
    loadTypeId,
    equipmentId,
    weight,
    commodity,
    note
}: Props) {
    const { t } = useAppTranslation();
    const { users } = useAllUsers();
    const { equipment_types } = useAllEquipmentTypes();

    const loadTypes = LoadTypesGrpcService.useGetLoadTypesQuery({});

    const dispatcher = users.find((user) => user.userId === dispatcherId);
    const equipment = equipment_types.find((eq) => eq.equipmentTypeId === equipmentId);

    const loadType =
        loadTypes.data?.loadTypes.find((loadType) => loadType.loadTypeId === loadTypeId)?.name ||
        t('common:not_provided');

    return (
        <BillingLoadPanelComponents.Card.Container>
            <BillingLoadPanelComponents.Card.Row>
                <BillingLoadPanelComponents.Card.Title
                    title={t('entity:load')}
                    icon={<VectorIcons.FullDialogIcons.Load />}
                />
                <LoadStatusChipSelect
                    load_status={loadStatus}
                    load_id={loadId}
                />
            </BillingLoadPanelComponents.Card.Row>
            <BillingLoadPanelComponents.Card.Row justifyContent="flex-start">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                >
                    <Avatar
                        sx={{
                            width   : '32px',
                            height  : '32px',
                            fontSize: '14px'
                        }}
                    >
                        {dispatcher
                            ? `${dispatcher?.firstName?.charAt(0)}${dispatcher?.lastName?.charAt(
                                0
                            )}`
                            : t('common:not_provided')}
                    </Avatar>

                    <Stack>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize="14px"
                        >
                            {dispatcher
                                ? `${dispatcher?.firstName} ${dispatcher?.lastName}`
                                : t('common:not_provided')}
                        </Typography>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                            fontSize="12px"
                        >
                            {t('billing:panel.title.dispatcher')}
                        </Typography>
                    </Stack>
                </Stack>
            </BillingLoadPanelComponents.Card.Row>
            <BillingLoadPanelComponents.Card.Row>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="5px"
                >
                    <BillingLoadPanelComponents.Card.IconWrapper>
                        <VectorIcons.LoadIcons.OrderTypeIcon />
                    </BillingLoadPanelComponents.Card.IconWrapper>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        fontWeight={600}
                        fontSize="14px"
                    >
                        {t('billing:panel.title.load_type')}
                    </Typography>
                </Stack>

                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="14px"
                >
                    {loadType}
                </Typography>
            </BillingLoadPanelComponents.Card.Row>

            <BillingLoadPanelComponents.Card.Row>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="5px"
                >
                    <BillingLoadPanelComponents.Card.IconWrapper>
                        <VectorIcons.LoadIcons.Commodity />
                    </BillingLoadPanelComponents.Card.IconWrapper>

                    <Typography
                        variant="body1"
                        fontWeight={600}
                        color="text.secondary"
                        fontSize="14px"
                    >
                        {t('billing:panel.title.commodity')}
                    </Typography>
                </Stack>

                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="14px"
                >
                    {commodity}
                </Typography>
            </BillingLoadPanelComponents.Card.Row>

            <BillingLoadPanelComponents.Card.Row>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="5px"
                >
                    <BillingLoadPanelComponents.Card.IconWrapper>
                        <VectorIcons.LoadIcons.Weight />
                    </BillingLoadPanelComponents.Card.IconWrapper>

                    <Typography
                        variant="body1"
                        fontWeight={600}
                        color="text.secondary"
                        fontSize="14px"
                    >
                        {t('billing:panel.title.weight')}
                    </Typography>
                </Stack>

                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="14px"
                >
                    {weight}
                </Typography>
            </BillingLoadPanelComponents.Card.Row>

            <BillingLoadPanelComponents.Card.Row>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap="5px"
                >
                    <BillingLoadPanelComponents.Card.IconWrapper>
                        <VectorIcons.LoadIcons.EquipmentTypeIcon />
                    </BillingLoadPanelComponents.Card.IconWrapper>
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        color="text.secondary"
                        fontSize="14px"
                    >
                        {t('billing:panel.title.equipment_type')}
                    </Typography>
                </Stack>

                <Typography
                    variant="body1"
                    fontWeight={500}
                    fontSize="14px"
                >
                    {equipment?.name || t('common:not_provided')}
                </Typography>
            </BillingLoadPanelComponents.Card.Row>

            <Stack
                paddingX="24px"
                paddingY="10px"
            >
                <TextField
                    variant="filled"
                    placeholder={t('fields:note.placeholder')}
                    label={t('fields:note.label')}
                    InputProps={{
                        readOnly: true
                    }}
                    multiline
                    value={note}
                    sx={{ pointerEvents: 'none' }}
                />
            </Stack>
        </BillingLoadPanelComponents.Card.Container>
    );
}

export default React.memo(Load);
