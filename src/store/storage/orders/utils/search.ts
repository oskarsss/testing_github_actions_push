import { LOAD_STATUS_GRPC_ENUM } from '@/models/loads/load-mappings';
import { BrokerGetReply_Broker } from '@proto/brokers';
import { LoadData_Load } from '@proto/loads';
import { CustomerModel_Customer } from '@proto/models/model_customer';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { TruckModel_Truck } from '@proto/models/model_truck';
import moment from 'moment-timezone';

const convertTimeFormat = (dateString: string) => {
    // Parse the input date string
    const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss');

    // Format the date to the desired format
    const formattedDate = date.format('M/D HH:mm');

    return formattedDate;
};

export const searchFilter =
    (
        search: string,
        orders: LoadData_Load[],
        trucksMap: Record<string, TruckModel_Truck>,
        driverMap: Record<string, DriverModel_Driver>,
        brokersMap: Record<string, BrokerGetReply_Broker>,
        customersMap: Record<string, CustomerModel_Customer>
    ) =>
        (array: number[]): number[] => {
            if (!search.length) return array;
            const searchArray = search.split(':');
            const key = searchArray[0];
            const value = searchArray[1];
            if (key === 'order_id' && value) {
                return array.filter((index) => {
                    const order = orders[index];
                    return order.friendlyId === value.trim();
                });
            }
            if (key === 'ref_id' && value) {
                return array.filter((index) => {
                    const order = orders[index];
                    return order.referenceId === value.trim();
                });
            }
            return array.filter((index) => {
                const order = orders[index];

                const driverIds = order.manifests.flatMap((manifest) => manifest.driverIds);
                const truckIds = order.manifests.map((manifest) => manifest.truckId);
                const orderStops = order.manifests.flatMap((manifest) =>
                    manifest.stops.filter((stop) => stop.loadId === order.loadId));

                const trucksSearch = truckIds
                    .map((truckId) => trucksMap[truckId]?.referenceId)
                    .join('');
                const driversSearch = driverIds
                    .map(
                        (driverId) =>
                            (driverMap[driverId]?.firstName || '') +
                        (driverMap[driverId]?.lastName || '')
                    )
                    .join('');
                const originStop = orderStops[0];
                const destinationStop = orderStops[orderStops.length - 1];
                const manifestsFriendlyIdsSearch = order.manifests
                    .map((manifest) => manifest.friendlyId)
                    .join('');

                const broker = brokersMap[order.brokerId];
                const customer = customersMap[order.customerId];

                const brokerSearch = broker?.name || '';
                const customerSearch = customer?.name || '';

                const originSearchLocation = originStop.location
                    ? `${originStop.location.city} ${originStop.location.state}`
                    : '';

                const originTime = convertTimeFormat(originStop.appointmentStartAtLocal);

                const destinationTime = convertTimeFormat(destinationStop.appointmentEndAtLocal);
                const destinationSearchLocation = destinationStop.location
                    ? `${destinationStop.location.city} ${destinationStop.location.state}`
                    : '';

                const searches =
                ` ${originSearchLocation} ${trucksSearch} ${driversSearch} ${originTime} ${destinationSearchLocation} ${destinationTime} ${manifestsFriendlyIdsSearch} ${
                    order.friendlyId
                } ${order.referenceId} ${customerSearch} ${brokerSearch} ${order.grossAmount} ${
                    order.loadedMiles
                } ${LOAD_STATUS_GRPC_ENUM[order.status]}`
                    .trim()
                    .toLowerCase();

                return searches.includes(search.toLowerCase());
            });
        };
