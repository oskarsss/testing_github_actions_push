import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Notes from '@/@core/components/notes/Notes';
import Documents from '@/@core/components/documents/Documents';
import editCustomerUtils, {
    type DefaultValues
} from '@/views/dispatch/customers/dialogs/EditCustomer/edit-customer-utils';
import FullDialog from '@/@core/ui-kits/full-dialog';
import { useEditCustomerDialog } from '@/views/dispatch/customers/dialogs/EditCustomer/EditCustomer';
import { useCallback, useEffect, useMemo } from 'react';
import EditCustomerHeader from '@/views/dispatch/customers/dialogs/EditCustomer/components/EditCustomerHeader';
import EditCustomerFields from '@/views/dispatch/customers/dialogs/EditCustomer/components/EditCustomerFiels';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import CustomersGrpcService from '@/@grpcServices/services/customers.service';
import type { CustomerModel_Customer } from '@proto/models/model_customer';

export const useEditCustomerForm = () => useFormContext<DefaultValues>();

type Props = {
    refetch: () => void;
    customer: CustomerModel_Customer;
    document_id: string;
};

export default function EditCustomerForm({
    refetch,
    customer,
    document_id
}: Props) {
    const [updateCustomer, { isLoading }] = CustomersGrpcService.useUpdateCustomerMutation();
    const editCustomerDialog = useEditCustomerDialog(true);

    const values: DefaultValues = useMemo(
        () => ({
            name                 : customer.name,
            shortName            : customer.shortName,
            contactName          : customer.contactName,
            contactPhone         : customer.contactPhone,
            contactFax           : customer.contactFax,
            contactEmail         : customer.contactEmail,
            billingEmail         : customer.billingEmail,
            addressLine1         : customer.addressLine1,
            addressLine2         : customer.addressLine2,
            addressCity          : customer.addressCity,
            addressState         : customer.addressState,
            addressPostalCode    : customer.addressPostalCode,
            customerPortalEnabled: customer.customerPortalEnabled,
            customerPortalId     : customer.customerPortalId
        }),
        [
            customer.name,
            customer.shortName,
            customer.contactName,
            customer.contactPhone,
            customer.contactFax,
            customer.contactEmail,
            customer.billingEmail,
            customer.addressLine1,
            customer.addressLine2,
            customer.addressCity,
            customer.addressState,
            customer.addressPostalCode
        ]
    );

    const methods = useForm<DefaultValues>({
        defaultValues: editCustomerUtils.defaultValues,
        values,
        resolver     : yupResolver<DefaultValues>(editCustomerUtils.editCustomerSchema),
        mode         : 'onBlur'
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const save = useCallback(
        (payload: DefaultValues) =>
            updateCustomer({
                customer: {
                    customerId        : customer.customerId,
                    ...payload,
                    address           : customer.address,
                    createdAt         : customer.createdAt,
                    customerFriendlyId: customer.customerFriendlyId,
                    deleted           : false
                }
            }),
        [customer?.customerId, updateCustomer]
    );

    useEffect(() => {
        editCustomerDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [editCustomerDialog.confirmDialog, handleSubmit, isDirty, save]);

    return (
        <FullDialog.Form
            save={save}
            methods={methods}
        >
            <EditCustomerHeader
                customer={customer}
                isMutationLoading={isLoading}
                onClose={editCustomerDialog.close}
            />

            <FullDialog.RowContent width="1650px">
                <FullDialog.ColumnContent maxWidth="600px">
                    <EditCustomerFields />
                    <Notes
                        entity_type="customer"
                        entity_id={customer.customerId}
                        variant="outlined"
                        size="normal"
                        slots={{
                            container: {
                                props: {
                                    style: {
                                        minHeight: '350px'
                                    }
                                }
                            }
                        }}
                    />
                </FullDialog.ColumnContent>

                <Documents
                    title={customer.name}
                    entityType={DocumentModel_DocumentEntityType.CUSTOMER}
                    entityId={customer.customerId}
                    documentId={document_id}

                    // location={`customers/${customer.customer_id}/documents`}
                    // refresh={refetch}
                    // documents={customer.documents}
                    // document_id={selectDocument(customer.documents, document_id)}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
