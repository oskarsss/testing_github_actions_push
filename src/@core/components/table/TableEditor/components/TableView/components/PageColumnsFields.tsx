import { FieldGetReply_Field } from '@proto/field';
import Checkbox from '@/@core/components/table/TableEditor/reused-components/Checkbox';
import { Text } from '@/@core/components/table/TableEditor/TableEditorComponents';
import Stack from '@mui/material/Stack';

type Props = {
    fields: FieldGetReply_Field[];
    emptyText: string;
    selectedViewColumnsIds: string[];
    updateCheckedInColumns: (unique_key: string, checked: boolean) => void;
    openEditFieldMenu: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        field: FieldGetReply_Field
    ) => void;
};

export default function PageColumnsFields({
    fields,
    emptyText,
    selectedViewColumnsIds,
    updateCheckedInColumns,
    openEditFieldMenu
}: Props) {
    return (
        <Stack
            spacing={{
                xs: 1,
                sm: 2
            }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            sx={{ padding: '12px 14px 24px 24px' }}
        >
            {fields.length ? (
                fields.map((field) => (
                    <div
                        key={field.fieldId}
                        onContextMenu={(event) => {
                            event.preventDefault();
                            openEditFieldMenu(event, field);
                        }}
                    >
                        <Checkbox
                            name={field.name}
                            unique_key={field.fieldId}
                            isChecked={selectedViewColumnsIds.includes(field.fieldId)}
                            onChange={updateCheckedInColumns}
                            sx={{ pr: '8px' }}
                        />
                    </div>
                ))
            ) : (
                <Text>{emptyText}</Text>
            )}
        </Stack>
    );
}
