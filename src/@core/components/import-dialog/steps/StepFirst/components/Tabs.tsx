import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import Import from '@/store/import/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ImportActions } from '@/store/import/slice';
import Icons from '../../../components/Icons';
import { TabsContainer, Tabs, Tab } from '../../../components/styled';

type Props = {
    categories: Import.Category[];
};
export default function DialogTabs({ categories }: Props) {
    const category_id = useAppSelector((state) => state.import.category_id);
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const handleChange = (event: React.SyntheticEvent, value: Import.CategoryId) => {
        dispatch(ImportActions.UpdateCategoryId({ category_id: value }));
    };

    return (
        <Fade
            in
            timeout={500}
        >
            <TabsContainer>
                <h5>{t('core:import.step.first.title')}</h5>
                <Tabs
                    value={category_id}
                    onChange={handleChange}
                    aria-label="tabs"
                >
                    {categories.map(({
                        categoryId,
                        name
                    }) => {
                        if (categoryId === 'loads') {
                            return (
                                <Tooltip
                                    title={t('common:coming_soon')}
                                    disableInteractive
                                >
                                    <span>
                                        <Tab
                                            disableRipple
                                            value={categoryId}
                                            icon={<Icons type={categoryId} />}
                                            iconPosition="start"
                                            label={name}
                                            key={categoryId}
                                            disabled
                                        />
                                    </span>
                                </Tooltip>
                            );
                        }

                        return (
                            <Tab
                                disableRipple
                                value={categoryId}
                                icon={<Icons type={categoryId} />}
                                iconPosition="start"
                                label={name}
                                key={categoryId}
                            />
                        );
                    })}
                </Tabs>
            </TabsContainer>
        </Fade>
    );
}
