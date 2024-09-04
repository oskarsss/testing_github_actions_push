import React from 'react';
import * as yup from 'yup';
import DateInput from '@/@core/fields/inputs/DateInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment-timezone';
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const format = 'YYYY-MM-DD HH:mm:ss';

export const formatTime = (time?: moment.MomentInput) => {
    if (!time) return '';
    if (!moment(time).isValid()) return '';
    return moment(time).format(format);
};

type FormValues = {
    date: string;
};

type Types = 'arrivedAt' | 'checkedInAt' | 'checkedOutAt';

const titles: Record<Types, IntlMessageKey> = {
    checkedInAt : 'state_info:stop.check_in',
    checkedOutAt: 'state_info:stop.check_out',
    arrivedAt   : 'state_info:stop.arrived'
};

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    date: yup.string().required()
});

function isValidTime(time?: string | null) {
    if (!time) return '';
    if (time.includes('1970')) return '';
    if (!moment(time).isValid()) return '';
    return time;
}

type Stop = {
    arrivedAt: string;
    checkedInAt: string;
    checkedOutAt: string;
};

type Props = {
    stop: Stop;
    default_time?: string | null;
    type: Types;
    updateStop: (type: Types, time: string) => Promise<any>;
};

export const useCheckInOutMenu = menuHookFabric(CheckInOut, { cleanContentOnClose: true });

function CheckInOut({
    stop,
    default_time,
    type,
    updateStop
}: Props) {
    const checkInOutMenu = useCheckInOutMenu(true);
    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [clearLoading, setClearLoading] = React.useState(false);
    const { t } = useAppTranslation();

    const {
        control,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm<FormValues>({
        values: {
            date: moment(isValidTime(stop[type]) || isValidTime(default_time)).format(format)
        },
        resolver: yupResolver<FormValues>(schema)
    });

    const onSubmit = async (body: FormValues) => {
        setSubmitLoading(true);
        try {
            updateStop(type, formatTime(body.date));
            checkInOutMenu.close();
        } catch (error) {
            console.error(error);
        }
        setSubmitLoading(false);
    };

    const clearDate = async () => {
        setClearLoading(true);
        try {
            await updateStop(type, '');
            checkInOutMenu.close();
        } catch (error) {
            console.error(error);
        }
        setClearLoading(false);
    };

    const isValidStopTime = isValidTime(stop[type]);

    return (
        <MenuComponents.Form
            onSubmit={handleSubmit(onSubmit)}
            width="422px"
        >
            <MenuComponents.FormHeader
                text={`modals:loads.check_in_out.titles.${isValidStopTime ? 'update' : 'add'}`}
                translateOptions={{ title: t(titles[type]) }}
            />

            <MenuComponents.Fields>
                <MenuComponents.Field xs={12}>
                    <DateInput
                        control={control}
                        width="100%"
                        name="date"
                        label={titles[type]}
                        errors={errors}
                        AMPMTime={false}
                    />
                </MenuComponents.Field>

                <MenuComponents.ActionsWrapper>
                    {!!isValidTime(stop[type]) && (
                        <MenuComponents.DeleteButton
                            onClick={clearDate}
                            loading={clearLoading}
                            disabled={submitLoading}
                            text="common:button.clear"
                        />
                    )}
                    <MenuComponents.CancelButton onCancel={checkInOutMenu.close} />
                    <MenuComponents.SubmitButton
                        text={`common:button.${isValidStopTime ? 'update' : 'save'}`}
                        loading={submitLoading}
                        disabled={(isValidStopTime ? !isDirty : false) || clearLoading}
                    />
                </MenuComponents.ActionsWrapper>
            </MenuComponents.Fields>
        </MenuComponents.Form>
    );
}
