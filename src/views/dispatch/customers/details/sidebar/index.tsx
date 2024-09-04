import { CustomersIcon } from '@/@core/icons/custom-nav-icons/icons';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { Avatar, Box, CardContent, styled, Typography } from '@mui/material';
import type { CustomerModel_Customer } from '@proto/models/model_customer';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import EntityDocuments from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/EntityDocuments';
import { useAppSelector } from '@/store/hooks';
import { customersSelectors } from '@/store/dispatch/customers/slice';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import FaxIcon from '@mui/icons-material/Fax';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import { formatPhoneNumber } from '@/utils/formatting';
import InfoItem from './InfoItem';
import { useEditCustomerDialog } from '../../dialogs/EditCustomer/EditCustomer';

type Props = {
    customer: CustomerModel_Customer;
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

export default function CustomerSidebar({ customer }: Props) {
    const tabId = useAppSelector(customersSelectors.getSelectedTab);
    const editDialog = useEditCustomerDialog();
    const { t } = useTranslation();
    const edit = () => {
        editDialog.open({ customerId: customer.customerId });
    };

    const { documents } = useGetDocumentsByEntityType({
        entityId  : customer.customerId,
        entityType: DocumentModel_DocumentEntityType.CUSTOMER
    });

    return (
        <CardContentHeader>
            <Header>
                <HeaderContentInfo>
                    <div style={{ position: 'relative' }}>
                        <AvatarStyle alt={customer.name}>
                            <CustomersIcon />
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
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {customer.name}
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
                    icon={<PersonIcon color="action" />}
                    text={customer.contactName}
                    title="Contact Name"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<PhoneInTalkIcon color="action" />}
                    text={formatPhoneNumber(customer.contactPhone)}
                    title="Phone Number"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<EmailIcon color="action" />}
                    text={customer.contactEmail}
                    title="Contact Email"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<FaxIcon color="action" />}
                    text={formatPhoneNumber(customer.contactFax)}
                    title="Contact Fax"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<EmailIcon color="action" />}
                    text={customer.billingEmail}
                    title="Billing Email"
                    variant="body2"
                    isCopy
                />
                <InfoItem
                    icon={<LocationOnIcon color="action" />}
                    text={customer.address}
                    title="Address"
                    variant="body2"
                    isCopy
                />
            </ItemsWrapper>
            <EntityDocuments
                entity_type={DocumentModel_DocumentEntityType.CUSTOMER}
                entity_id={customer.customerId}
                documents={documents}
                tab_id={tabId}
                refresh={() => {}}
            />
        </CardContentHeader>
    );
}
