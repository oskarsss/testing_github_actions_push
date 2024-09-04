import { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { applyTestId } from '@/configs/tests';
import { Control, Path, useController } from 'react-hook-form';
import { LoadDraftFields } from '@proto/load_drafts';
import Input from '@mui/material/Input';

type CategoryItemComponentProps = {
    category: {
        category_id: string;
        name: string;
    };
};

type Props = {
    categories: { category_id: string; name: string }[];
    testID?: string;
    optionTestID?: string;
    control: Control<LoadDraftFields, any>;
    name: Path<LoadDraftFields>;
    CategoryItemComponent: FC<CategoryItemComponentProps>;
};

function TableSelect({
    categories,
    testID,
    optionTestID,
    control,
    name,
    CategoryItemComponent
}: Props) {
    const {
        field: {
            onChange,
            value
        }
    } = useController({ name, control });

    return (
        <Select
            size="medium"
            variant="standard"
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={value as string}
            fullWidth
            input={<Input disableUnderline />}
            sx={{
                borderRadius                        : 0,
                fontSize                            : 'inherit',
                fontWeight                          : 'inherit',
                '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: 0
                },
                '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: (theme) => theme.palette.semantic.text.disabled
                },
                '& .MuiInputBase-input': {
                    padding: 0
                },
                '& .MuiInputBase-input:after': {
                    borderBottom: 'none'
                }
            }}
            onChange={onChange}
            inputProps={{
                ...applyTestId(testID)
            }}
        >
            {categories.map((el) => (
                <MenuItem
                    key={el.category_id}
                    value={el.category_id}
                    {...applyTestId(optionTestID)}
                >
                    <CategoryItemComponent category={el} />
                </MenuItem>
            ))}
        </Select>
    );
}

export default TableSelect;
