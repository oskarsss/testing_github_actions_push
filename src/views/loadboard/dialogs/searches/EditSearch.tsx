/* eslint-disable react/jsx-props-no-multi-spaces */
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { LB_GetSearchesReply } from '@proto/loadboard';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchFields from './SearchFields';
import { LoadboardSearchDefaultValues, loadboardSchema } from './AddSearch';

export const useEditSearchDialog = hookFabric(EditSearch, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="650px"
        {...props}
    />
));

type Props = {
    search: LB_GetSearchesReply['searches'][0];
};

function EditSearch({ search }: Props) {
    const dialog = useEditSearchDialog();

    const [update, { isLoading }] = LoadboardGrpcService.useUpdateSearchMutation({});

    const {
        setValue,
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty,
            dirtyFields
        }
    } = useForm<LoadboardSearchDefaultValues>({
        defaultValues: {
            name       : search.name,
            destination: {
                address: `${search.destination?.city}, ${search.destination?.state}` ?? '',
                city   : search.destination?.city ?? '',
                state  : search.destination?.state ?? '',
                lat    : search.destination?.lat ?? 0,
                lon    : search.destination?.lon ?? 0
            },
            origin: {
                address: `${search.origin?.city}, ${search.origin?.state}` ?? '',
                city   : search.origin?.city ?? '',
                state  : search.origin?.state ?? '',
                lat    : search.origin?.lat ?? 0,
                lon    : search.origin?.lon ?? 0
            },
            truck_id          : search.truckId ?? '',
            destination_radius: search.destination?.radius ?? 0,
            origin_radius     : search.origin?.radius ?? 0,
            pickup_end_date   : search.pickupDateRange?.end ?? '',
            pickup_start_date : search.pickupDateRange?.start ?? '',
            max_length        : search.filters?.maxLength ?? 0

            // max_weight        : search.filters?.maxWeight ?? 0
        },

        resolver: yupResolver(loadboardSchema)
    });

    const submit = (data: LoadboardSearchDefaultValues) => {
        update({
            name               : data.name,
            searchId           : search.searchId,
            sortResultBy       : search.sortResultBy,
            sortResultDirection: search.sortResultDirection,
            pickupDateRange    : { end: data.pickup_end_date, start: data.pickup_start_date },
            truckId            : data.truck_id,
            filters            : {
                maxLength    : data.max_length,
                equipmentIds : search.filters?.equipmentIds ?? [],
                hasRate      : false,
                maxAgeMinutes: search.filters?.maxAgeMinutes ?? 0,

                maxRate: 0,
                minRate: 0,
                maxRpm : 0,

                minRpm     : 0,
                minLength  : 0,
                maxDistance: {
                    kilometers: 0,
                    miles     : 0
                },
                maxWeight: {
                    kilograms: 0,
                    pounds   : 0
                },
                minDistance: {
                    kilometers: 0,
                    miles     : 0
                },
                minWeight: {
                    kilograms: 0,
                    pounds   : 0
                },

                requiresTeam: false
            },
            destination: {
                city  : data.destination.city,
                state : data.destination.state,
                lat   : data.destination.lat,
                lon   : data.destination.lon,
                radius: data.destination_radius
            },
            origin: {
                city  : data.origin.city,
                state : data.origin.state,
                lat   : data.origin.lat,
                lon   : data.origin.lon,
                radius: data.origin_radius
            }
        })
            .unwrap()
            .then(() => {
                dialog.close();
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="loadboard:dialogs.searches.titles.edit" />
            <SearchFields
                control={control}
                errors={errors}
                setValue={setValue}
            />
            <DialogComponents.ActionsWrapper>
                <DialogComponents.DefaultActions
                    onCancel={dialog.close}
                    submitDisabled={!Object.keys(dirtyFields).length}
                    submitLoading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

export default EditSearch;
