import { Avatar, Box, CardContent, styled, Typography } from '@mui/material';
import type { BrokerRetrieveReply_Broker } from '@proto/brokers';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { BrokersIcon } from '@/@core/icons/custom-nav-icons/icons';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import EditIcon from '@mui/icons-material/Edit';
import InfoItem from '@/views/dispatch/customers/details/sidebar/InfoItem';
import EntityDocuments from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/EntityDocuments';
import { useAppSelector } from '@/store/hooks';
import { brokersSelectors } from '@/store/dispatch/brokers/slice';
import OverflowTooltip from '@/@core/ui-kits/basic/overflow-tooltip/OverflowTooltip';
import EmailIcon from '@mui/icons-material/Email';
import { formatPhoneNumber } from '@/utils/formatting';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VectorIcons from '@/@core/icons/vector_icons';
import { useEditBrokerDialog } from '../../dialogs/EditBroker/EditBroker';

type Props = {
    broker: BrokerRetrieveReply_Broker;
};

const CardContentHeader = styled(CardContent)(() => ({
    display      : 'flex',
    flexDirection: 'column',
    position     : 'relative',
    padding      : 0
}));

const Header = styled('div')(({ theme }) => ({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-around',
    position      : 'relative',
    padding       : '36px 24px 0px 24px',
    '&::before'   : {
        content     : '""',
        position    : 'absolute',
        top         : 0,
        right       : 24,
        width       : 'calc(100% - 48px)',
        height      : 84,
        background  : theme.palette.semantic.foreground.tertiary,
        borderRadius: '0 0 8px 8px'
    }
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    width       : 120,
    height      : 120,
    borderRadius: '8px 8px 48px 8px',
    border      : `4px solid ${theme.palette.semantic.border.primary}`,
    fontSize    : '4.5rem',
    background  : theme.palette.semantic.foreground.secondary,
    svg         : {
        width : 70,
        height: 70,
        fill  : theme.palette.semantic.text.secondary
    }
}));

const HeaderContentInfo = styled('div')({
    display   : 'flex',
    alignItems: 'end',
    gap       : 16,
    marginLeft: 10,
    overflow  : 'hidden',
    flex      : 4
});

const Button = styled('div')({
    width         : 48,
    minWidth      : 48,
    maxWidth      : 48,
    flex          : 1,
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 4,
    marginRight   : 10
});

const ItemsWrapper = styled('div')(({ theme }) => ({
    display               : 'flex',
    flexDirection         : 'column',
    overflow              : 'auto',
    borderTop             : `1px solid ${theme.palette.semantic.border.secondary}`,
    marginTop             : 20,
    '.scrollbar-container': {
        width        : '100%',
        paddingBottom: 36
    }
}));

export default function BrokerSidebar({ broker }: Props) {
    const tabId = useAppSelector(brokersSelectors.getSelectedTab);
    const editDialog = useEditBrokerDialog();
    const { t } = useAppTranslation();

    const edit = () => {
        editDialog.open({ brokerId: broker.brokerId });
    };

    const { documents } = useGetDocumentsByEntityType({
        entityId  : broker.brokerId,
        entityType: DocumentModel_DocumentEntityType.BROKER
    });
    return (
        <CardContentHeader>
            <Header>
                <HeaderContentInfo>
                    <div style={{ position: 'relative' }}>
                        <AvatarStyle alt={broker.name}>
                            <BrokersIcon />
                        </AvatarStyle>
                    </div>
                    <Box overflow="hidden">
                        <Box
                            display="flex"
                            alignItems="end"
                            gap="5px"
                            marginBottom="5px"
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                overflow="hidden"
                            >
                                <OverflowTooltip textOverflow="ellipsis">
                                    {broker.name}
                                </OverflowTooltip>
                            </Typography>
                        </Box>
                    </Box>
                </HeaderContentInfo>
                <Button>
                    <LeftStyled.IconButton onClick={edit}>
                        <EditIcon color="primary" />
                    </LeftStyled.IconButton>

                    <Typography
                        variant="body1"
                        fontWeight={500}
                    >
                        {t('common:button.edit')}
                    </Typography>
                </Button>
            </Header>
            <ItemsWrapper>
                <InfoItem
                    icon={<VectorIcons.MCIcon />}
                    text={broker.mc || 'N/A'}
                    title="MC"
                    variant="body2"
                    isCopy={!!broker.mc}
                />
                <InfoItem
                    icon={<VectorIcons.DOTIcon />}
                    text={broker.dot || 'N/A'}
                    title="DOT"
                    variant="body2"
                    isCopy={!!broker.dot}
                />
                <InfoItem
                    icon={<PhoneInTalkIcon color="action" />}
                    text={formatPhoneNumber(broker.phoneNumber)}
                    title="Phone Number"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<EmailIcon color="action" />}
                    text={broker.billingEmail}
                    title="Billing Email"
                    variant="body2"
                    isCopy
                />

                <InfoItem
                    icon={<EmailIcon color="action" />}
                    text={broker.email}
                    title="Email"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<LocationOnIcon color="action" />}
                    text={broker.address}
                    title="Address"
                    variant="body2"
                    isCopy
                />
            </ItemsWrapper>

            <EntityDocuments
                entity_type={DocumentModel_DocumentEntityType.BROKER}
                entity_id={broker.brokerId}
                documents={documents}
                tab_id={tabId}
                refresh={() => {}}
            />
        </CardContentHeader>
    );
}
