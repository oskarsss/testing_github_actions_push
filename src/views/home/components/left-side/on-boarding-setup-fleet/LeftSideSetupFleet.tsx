import React from 'react';
import { VendorIcon } from '@/@core/icons/custom-nav-icons/icons';
import OnboardingGrpcService from '@/@grpcServices/services/onboarding.service';
import { useAddTruckDialog } from '@/views/fleet/trucks/dialogs/AddTruck/AddTruck';
import { useAddTrailerDialog } from '@/views/fleet/trailers/dialogs/AddTrailer/AddTrailer';
import { useCreateDriverDialog } from '@/views/fleet/drivers/dialogs/CreateDriver';
import { useAddVendorDialog } from '@/views/fleet/vendors/dialogs/AddVendor/AddVendor';
import OnBoardingAccordionDetailsRow from '@/views/home/components/left-side/components/OnBoardingAccodrionDetails/OnBoardingAccordionDetailsRow';
import OnBoardingAccordion from '@/views/home/components/left-side/components/OnBoardingAccordion/OnBoardingAccordion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { HomeActions } from '@/store/home/slice';
import openNewTab from '@/utils/openNewTab';
import SYSTEM from '@/@system';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useEditVendorDialog } from '@/views/fleet/vendors/dialogs/EditVendor/EditVendor';

export default function LeftSideSetupFleet() {
    const dispatch = useAppDispatch();
    const expanded = useAppSelector((state) => state.home.setupFleetExpanded);
    const {
        data,
        refetch
    } = OnboardingGrpcService.useGetOnboardingChecklistQuery({});

    const addTruckDialog = useAddTruckDialog();
    const addTrailerDialog = useAddTrailerDialog();
    const addDriverDialog = useCreateDriverDialog();
    const addVendorDialog = useAddVendorDialog();
    const editTruckDialog = useEditTruckDialog();
    const editTrailerDialog = useEditTrailerDialog();
    const editDriverDialog = useEditDriverDialog();
    const editVendorDialog = useEditVendorDialog();

    const onClickWatchVideo = () => openNewTab(SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_FLEET);

    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        dispatch(HomeActions.setSetupFleetExpanded(isExpanded));
    };

    const onAddTruck = () => {
        addTruckDialog.open({
            onSuccessfulCreate: (truck_id) => {
                editTruckDialog.open({ truck_id });
                refetch();
            }
        });
    };

    const onAddTrailer = () => {
        addTrailerDialog.open({
            onSuccessfulCreate: (trailer_id) => {
                editTrailerDialog.open({ trailer_id });
                refetch();
            }
        });
    };

    const onAddDriver = () => {
        addDriverDialog.open({
            onSuccessfulCreate: (driver_id) => {
                editDriverDialog.open({ driver_id });
                refetch();
            }
        });
    };

    const onAddVendor = () => {
        addVendorDialog.open({
            onAdded: (vendor_id) => {
                editVendorDialog.open({ vendor_id });
                refetch();
            }
        });
    };

    const progress = data
        ? [data.truckAdded, data.trailerAdded, data.driverAdded, data.vendorAdded].filter(
            (item) => item
        ).length
        : 0;

    return (
        <OnBoardingAccordion
            title="onboarding:side.left.item.setup_fleet.title"
            subTitle="onboarding:side.left.item.setup_fleet.sub_title"
            linkAnyQuestions={SYSTEM.ONBOARDING.ANY_QUESTION_LINKS.SETUP_FLEET}
            onChange={handleChange}
            icon={<VendorIcon />}
            expanded={expanded}
            progress={progress}
            total={4}
        >
            {SYSTEM.ONBOARDING.VIDEO_LINKS.SETUP_FLEET && (
                <OnBoardingAccordionDetailsRow
                    onClick={onClickWatchVideo}
                    isVideo
                />
            )}
            <OnBoardingAccordionDetailsRow
                onClick={onAddTruck}
                label="onboarding:side.left.item.setup_fleet.label.add_truck"
                isCompleted={data?.truckAdded}
            />
            <OnBoardingAccordionDetailsRow
                onClick={onAddTrailer}
                isCompleted={data?.trailerAdded}
                label="onboarding:side.left.item.setup_fleet.label.add_trailer"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onAddDriver}
                isCompleted={data?.driverAdded}
                label="onboarding:side.left.item.setup_fleet.label.add_driver"
            />
            <OnBoardingAccordionDetailsRow
                onClick={onAddVendor}
                isCompleted={data?.vendorAdded}
                label="onboarding:side.left.item.setup_fleet.label.add_vendor"
                isOptional
            />
        </OnBoardingAccordion>
    );
}
