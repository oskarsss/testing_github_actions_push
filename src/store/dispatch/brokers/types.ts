import TableTypes from '@/@core/components/table/types';
import { BrokerGetReply_Broker } from '@proto/brokers';

/** Brokers */
namespace BrokersTypes {
    export interface BrokerRow extends TableTypes.Row, BrokerGetReply_Broker {
        phone_number: string;
        short_name: string;
    }
}

export default BrokersTypes;
