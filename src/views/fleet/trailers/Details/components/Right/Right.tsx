import { PerfectScrollbar } from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { Fade } from '@mui/material';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { TrailerProps } from '@/views/fleet/trailers/Details/types';
import GPSTracking from '@/views/fleet/trailers/Details/components/Right/components/GPSTracking/GPSTracking';
import { TestIDs } from '@/configs/tests';
import Truck from '@/views/fleet/trailers/Details/components/Right/components/Truck';
import TrailerIcon from '@/views/fleet/drivers/Details/components/Center/tabs/Map/icons/trailer_icon.png';
import { useTrailerLocation } from '@/store/streams/events/hooks';
import Profiles from '@/@core/ui-kits/profiles';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import { useTrailerCompaniesMap } from '@/store/hash_maps/hooks';
import Company from './components/Company';

export default function Details({ trailer }: TrailerProps) {
    const trailerLocation = useTrailerLocation(trailer.trailerId);
    const trailerCompany = useTrailerCompaniesMap(trailer?.trailerCompanyId || '');
    const [updateTrailerParkingLocation, {
        isSuccess,
        reset
    }] =
        TrailersGrpcService.endpoints.updateTrailerParkingLocation.useMutation();

    const updateGarageLocation = (parkingLocation: string) => {
        updateTrailerParkingLocation({
            trailerId: trailer.trailerId,
            parkingLocation
        });
    };

    return (
        <Fade in>
            <RightStyled.Container>
                <PerfectScrollbar>
                    <RightStyled.Box>
                        <Truck trailer={trailer} />

                        <Company
                            id={trailer.trailerId}
                            company_id={trailer.trailerCompanyId}
                            name={trailerCompany?.name || ''}
                        />

                        <Profiles.GarageLocation
                            isSuccess={isSuccess}
                            reset={reset}
                            parking_location={trailer.parkingLocation}
                            isLoading={false}
                            onUpdateLocation={updateGarageLocation}
                            testOptions={{
                                garageLocation: TestIDs.pages.trailerProfile.fields.garageLocation,
                                saveGarageLocation:
                                    TestIDs.pages.trailerProfile.buttons.saveGarageLocation
                            }}
                        />

                        <GPSTracking
                            lat={trailerLocation?.lat}
                            lon={trailerLocation?.lon}
                            integration_provide_id={trailerLocation?.integrationProviderId}
                            timestamp={trailerLocation?.timestamp}
                            icon={TrailerIcon.src}
                        />
                    </RightStyled.Box>
                </PerfectScrollbar>
            </RightStyled.Container>
        </Fade>
    );
}
