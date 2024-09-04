import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Tooltip from '@mui/material/Tooltip';
import Import from '@/store/import/types';
import CopyText from '@/@core/components/copy-text/CopyText';
import OverflowTooltip from '@/@core/ui-kits/basic/overflow-tooltip/OverflowTooltip';
import Errors from './Errors';
import { BodyCell } from './styled';
import { ImportResult_Row_Cell_Status } from '../../../../../../proto_data/ts/v1/import';

const icons = {
    success: (
        <CheckCircleIcon
            sx={{ fontSize: 24 }}
            color="success"
        />
    ),
    error: (
        <RemoveCircleIcon
            sx={{ fontSize: 24 }}
            color="error"
        />
    )
};

const default_error = {
    value      : '',
    label      : 'Error!!!',
    description: 'Failed data'
};

type Props = {
    width: number;
    cell: Import.Cell;
    column_name: string;
};

export default function TableBodyCell({
    width,
    cell,
    column_name
}: Props) {
    const {
        status,
        errors,
        value
    } = cell;

    const renderCellContent = () => {
        if (status === ImportResult_Row_Cell_Status.ERROR) {
            return (
                <div>
                    <Tooltip
                        title={<Errors errors={errors || [default_error]} />}
                        followCursor
                        PopperProps={{
                            sx: {
                                '& .MuiTooltip-tooltip': {
                                    padding        : '16px',
                                    borderRadius   : '6px',
                                    color          : (theme) => theme.palette.semantic.text.primary,
                                    backgroundColor: (theme) =>
                                        theme.palette.semantic.background.white,
                                    boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)'
                                }
                            }
                        }}
                    >
                        <BodyCell
                            width={width}
                            error
                        >
                            {column_name === 'status'
                                ? icons[String(value) as keyof typeof icons]
                                : value}
                        </BodyCell>
                    </Tooltip>
                </div>
            );
        }

        return (
            <BodyCell width={width}>
                {column_name === 'status' ? (
                    icons[String(value) as keyof typeof icons]
                ) : (
                    <OverflowTooltip>{value}</OverflowTooltip>
                )}
            </BodyCell>
        );
    };

    return <CopyText text={String(value)}>{renderCellContent()}</CopyText>;
}
