import { styled } from '@mui/material';
import React, { useMemo } from 'react';
import ManifestDetailsLoads from '@/views/dispatch/manifests/details/sections/tables/loads/ManifestDetailsLoads';
import { useAppSelector } from '@/store/hooks';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { useManifestLoads } from '@/store/dispatch/manifests/hooks';
import TabLabel from '@/views/dispatch/manifests/details/sections/tables/ui-elements/Tabs';
import ManifestDetailsStopsTable from './stops';
import ManifestDetailsDriverPayTable from './driver-pay';
import BorderConnect from './border-connect';

const Container = styled('div')(({ theme }) => ({
    height       : '100%',
    overflow     : 'hidden',
    flex         : '3 1 0',
    flexDirection: 'column',
    display      : 'flex'
}));

type Props = {
    manifest: ManifestModel_Manifest;
    onCloseDialog?: () => void;
};

export default function ManifestDetailsTable({
    manifest,
    onCloseDialog
}: Props) {
    const selectedTab = useAppSelector((state) => state.manifests.selectedManifestDetailsTab);
    const { loads } = useManifestLoads(manifest.stops);

    const countsItemsTab = useMemo(
        () => ({
            stops: manifest?.stops?.length || 0,
            loads: loads?.length || 0
        }),
        [manifest?.stops?.length, loads?.length]
    );

    return (
        <Container>
            <TabLabel
                selectedTab={selectedTab}
                countsItemsTab={countsItemsTab}
            />
            <>
                {selectedTab === 'stops' && (
                    <ManifestDetailsStopsTable
                        onCloseDialog={onCloseDialog}
                        manifestId={manifest?.manifestId || ''}
                        stops={manifest?.stops || []}
                        truckId={manifest?.truckId || ''}
                        driverId={manifest?.primaryDriverId || ''}
                    />
                )}
                {selectedTab === 'loads' && (
                    <ManifestDetailsLoads manifestId={manifest?.manifestId || ''} />
                )}
                {selectedTab === 'driverPay' && (
                    <ManifestDetailsDriverPayTable
                        truckId={manifest?.truckId || ''}
                        manifestId={manifest?.manifestId || ''}
                    />
                )}
                {selectedTab === 'borderConnect' && (
                    <BorderConnect manifestId={manifest?.manifestId || ''} />
                )}
            </>
        </Container>
    );
}
