import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RecyclingSharpIcon from '@mui/icons-material/RecyclingSharp';
import PhoneNumber from '@/views/fleet/drivers/Details/components/Left/components/PhoneNumber/PhoneNumber';
import VectorIcons from '@/@core/icons/vector_icons';
import EntityDocuments from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/EntityDocuments';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { useAppSelector } from '@/store/hooks';
import { formatPhoneNumber } from '@/utils/formatting';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { DriverModel_Driver, DriverModel_Status } from '@proto/models/model_driver';
import { useActiveCyclesMap, useRevenueTypesMap } from '@/store/hash_maps/hooks';
import Item from './Item';

type Props = {
    driver: DriverModel_Driver;
};

export default function DriverProfileInfo({ driver }: Props) {
    const { t } = useAppTranslation();
    const tab_id = useAppSelector((state) => state.drivers.tab_id);
    const refresh = () => {};

    const settlementRevenueType = useRevenueTypesMap(driver.settlementRevenueTypeId);
    const settlementCycle = useActiveCyclesMap(driver.settlementCycleId);

    const { documents } = useGetDocumentsByEntityType({
        entityId  : driver.driverId,
        entityType: DocumentModel_DocumentEntityType.DRIVER
    });

    const full_address = `${driver.addressLine1 ? driver.addressLine1 : ''} ${
        driver.addressLine2 ? driver.addressLine2 : ''
    }${driver.addressCity ? `, ${driver.addressCity}` : ''}${
        driver.addressState ? `, ${driver.addressState}` : ''
    } ${driver.addressPostalCode ? driver.addressPostalCode : ''}`;

    return (
        <LeftStyled.NewCardContent>
            <PerfectScrollbar>
                {full_address.trim().length > 0 ? (
                    <Item
                        icon={<LocationOnIcon color="action" />}
                        title="drivers:profile.left.info.address.title"
                        isCopy
                        text={full_address}
                    />
                ) : (
                    <Item
                        icon={<LocationOnIcon color="action" />}
                        title="drivers:profile.left.info.address.title"
                        text={t('drivers:profile.left.info.address.no_address')}
                    />
                )}

                {driver.phoneNumber ? (
                    <PhoneNumber text={formatPhoneNumber(driver.phoneNumber)} />
                ) : (
                    <Item
                        icon={<PhoneInTalkIcon color="action" />}
                        title="drivers:profile.left.info.phone_number.title"
                        text={t('drivers:profile.left.info.phone_number.no_phone_number')}
                    />
                )}
                {driver.email ? (
                    <Item
                        icon={<EmailIcon color="action" />}
                        title="drivers:profile.left.info.email.title"
                        isCopy
                        text={driver.email}
                    />
                ) : (
                    <Item
                        icon={<EmailIcon color="action" />}
                        title="drivers:profile.left.info.email.title"
                        text={t('drivers:profile.left.info.email.no_email')}
                    />
                )}

                <Item
                    icon={<VectorIcons.DetailsIcons.Revenue />}
                    title="drivers:profile.left.info.revenue.title"
                    text={
                        settlementRevenueType
                            ? settlementRevenueType.name
                            : t('drivers:profile.left.info.revenue.no_revenue')
                    }
                />

                <Item
                    icon={<RecyclingSharpIcon color="action" />}
                    title="drivers:profile.left.info.cycle.title"
                    text={
                        settlementCycle
                            ? settlementCycle.name
                            : t('drivers:profile.left.info.cycle.no_cycle')
                    }
                />

                <EntityDocuments
                    entity_type={DocumentModel_DocumentEntityType.DRIVER}
                    entity_id={driver.driverId}
                    documents={documents}
                    disabledAddNewDocument={driver.status === DriverModel_Status.DELETED}
                    tab_id={tab_id}
                    refresh={refresh}
                />
            </PerfectScrollbar>
        </LeftStyled.NewCardContent>
    );
}
