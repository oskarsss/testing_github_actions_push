import TableTypes from '@/@core/components/table/types';
import { CustomerModel_Customer } from '@proto/models/model_customer';

namespace Customers {
    export interface CustomerRow extends TableTypes.Row, CustomerModel_Customer {
        address_state: string;
        contact_email: string;
        contact_fax: string;
        contact_name: string;
        contact_phone: string;
        created_at: string;
        short_name: string;
    }
}

export default Customers;
