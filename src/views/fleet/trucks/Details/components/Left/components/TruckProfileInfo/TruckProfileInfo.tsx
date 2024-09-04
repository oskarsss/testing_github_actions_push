import Item from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/Item';
import Fuel from '@/views/fleet/trucks/Details/components/Left/components/TruckProfileInfo/Fuel';
import VectorIcons from '@/@core/icons/vector_icons';
import TrucksTypes from '@/store/fleet/trucks/types';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import {
    PlateCompanyIcon,
    PlateIcon,
    TollTransponderIcon,
    TransmissionIcon,
    TrucksIcon,
    VINIcon
} from '@/@core/icons/custom-nav-icons/icons';
import EntityDocuments from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/EntityDocuments';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { useTheme } from '@mui/material';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { usePlatesMap } from '@/store/hash_maps/hooks';

type Props = {
    truck: TruckModel_Truck;
};

export default function TruckProfileInfo({ truck }: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const tab_id = useAppSelector((state) => state.trucks.tab_id);
    const { palette } = useTheme();
    const plate = usePlatesMap(truck?.plateId);
    const plateCompany = usePlatesMap(plate?.plateCompanyId);

    const refresh = () => {};

    // dispatch(
    //     TrucksGrpcService.endpoints.retrieveTruck.initiate(
    //         {
    //             truckId: truck.truckId
    //         },
    //         {
    //             forceRefetch: true
    //         }
    //     )
    // );

    const { documents } = useGetDocumentsByEntityType({
        entityId  : truck.truckId,
        entityType: DocumentModel_DocumentEntityType.TRUCK
    });

    return (
        <LeftStyled.NewCardContent>
            <PerfectScrollbar>
                <Item
                    title="common:make_and_model"
                    icon={<TrucksIcon />}
                    isCopy
                    text={`${truck.make} ${truck.model}`}
                />

                <Item
                    title="trucks:profile.left.info.transmission.title"
                    icon={<TransmissionIcon />}
                    text={t('trucks:profile.left.info.transmission.text')}
                />

                <Fuel
                    fuel_discounts_enabled={truck.fuelDiscountsEnabled}
                    icon={(
                        <VectorIcons.NavIcons.Gasoline
                            style={{ fill: palette.semantic.foreground.primary }}
                        />
                    )}
                />

                <Item
                    title="common:vin"
                    icon={<VINIcon />}
                    isCopy
                    text={truck.vin}
                />

                <Item
                    isCopy
                    title="entity:plate"
                    icon={<PlateIcon />}
                    text={
                        plate && plate.number
                            ? `${plate.state}-${plate.number}`
                            : t('common:empty.no_plate')
                    }
                />

                <Item
                    title="trucks:profile.left.info.plate_company"
                    icon={<PlateCompanyIcon />}
                    text={
                        plateCompany ? plateCompany.ownerName : t('common:empty.no_plate_company')
                    }
                />

                <Item
                    title="trucks:profile.left.info.toll_transponder"
                    icon={TollTransponderIcon()}
                    isCopy
                    text={
                        truck.tollTransponder
                            ? String(truck.tollTransponder)
                            : t('common:not_provided')
                    }
                />

                <EntityDocuments
                    entity_type={DocumentModel_DocumentEntityType.TRUCK}
                    entity_id={truck.truckId}
                    documents={documents}
                    tab_id={tab_id}
                    refresh={refresh}
                />
            </PerfectScrollbar>
        </LeftStyled.NewCardContent>
    );
}
