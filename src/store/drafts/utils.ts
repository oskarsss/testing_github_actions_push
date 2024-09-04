import DraftsTypes from '@/store/drafts/types';

export const isWaypointsInvalid = (waypoints: DraftsTypes.Waypoints, stops: DraftsTypes.Stops) => {
    const exist_locations = stops.filter((stop) => stop.locationIdAddress);
    if (exist_locations.length < stops.length) return false;
    if (waypoints.length < stops.length - 1) return true;
    const locations_did_not_changed = exist_locations.every((stop, index) => {
        const {
            locationIdLat: lat,
            locationIdLon: lon
        } = stop;

        return lat === waypoints[index]?.lat && lon === waypoints[index]?.lon;
    });
    if (locations_did_not_changed) {
        return false;
    }

    return false;
};
