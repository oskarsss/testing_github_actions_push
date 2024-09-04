import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import Item from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/Item';
import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import {
    PlateCompanyIcon,
    PlateIcon,
    TrailerIcon,
    VINIcon
} from '@/@core/icons/custom-nav-icons/icons';
import CalendarTodaySharpIcon from '@mui/icons-material/CalendarTodaySharp';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import EntityDocuments from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/EntityDocuments';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { usePlatesMap, useTrailerCompaniesMap } from '@/store/hash_maps/hooks';
import TypeBlock from './TypeBlock';

type Props = {
    trailer: TrailerModel_Trailer;
};

export default function TrailerProfileInfo({ trailer }: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const tab_id = useAppSelector((state) => state.trailers.tab_id);
    const plate = usePlatesMap(trailer.plateId);
    const trailerCompany = useTrailerCompaniesMap(trailer.trailerCompanyId);

    const refresh = () => {};

    // dispatch(
    //     TrailersGrpcService.endpoints.retrieveTrailer.initiate(
    //         {
    //             trailerId: trailer.trailerId
    //         },
    //         {
    //             forceRefetch: true
    //         }
    //     )
    // );

    const { documents } = useGetDocumentsByEntityType({
        entityId  : trailer.trailerId,
        entityType: DocumentModel_DocumentEntityType.TRAILER
    });

    return (
        <LeftStyled.NewCardContent>
            <PerfectScrollbar>
                <Item
                    title="common:make_and_model"
                    icon={TrailerIcon()}
                    isCopy
                    text={`${trailer.make} ${trailer.model}`}
                />

                <Item
                    title="trailers:profile.left.info.year"
                    icon={<CalendarTodaySharpIcon color="secondary" />}
                    text={trailer.year || ''}
                />

                <TypeBlock trailerTypeId={trailer.trailerTypeId} />

                <Item
                    title="common:vin"
                    icon={VINIcon()}
                    isCopy
                    text={trailer.vin}
                />

                <Item
                    title="entity:plate"
                    icon={PlateIcon()}
                    text={
                        plate && plate.number
                            ? `${plate.state}-${plate.number}`
                            : t('common:empty.no_plate')
                    }
                />

                <Item
                    title="trailers:profile.left.info.plate_company"
                    icon={PlateCompanyIcon()}
                    text={trailerCompany ? trailerCompany.name : t('common:empty.no_plate_company')}
                />

                <EntityDocuments
                    entity_type={DocumentModel_DocumentEntityType.TRAILER}
                    entity_id={trailer.trailerId}
                    documents={documents}
                    tab_id={tab_id}
                    refresh={refresh}
                />
            </PerfectScrollbar>
        </LeftStyled.NewCardContent>
    );
}
