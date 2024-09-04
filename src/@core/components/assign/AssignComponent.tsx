/* eslint-disable jsx-a11y/tabindex-no-positive */
import { DialogContent, IconButton, TextField, Collapse, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AssignComponentStyled from '@/@core/components/assign/AssignComponent.styled';
import { applyTestId } from '@/configs/tests';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import {
    useMemo,
    useState,
    type ReactNode,
    type ComponentType,
    type ChangeEvent,
    useRef,
    type KeyboardEvent,
    useCallback,
    useEffect,
    type MouseEvent
} from 'react';
import CloseButton from '@/@core/components/assign/components/CloseButton';
import AddButton from '@/@core/components/assign/components/AddButton';
import CreateListItem from '@/@core/components/assign/components/EmptyListItem';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import CloseIcon from '@mui/icons-material/Close';
import type AssignTypes from '@/@core/components/assign/types';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import InputAdornment from '@mui/material/InputAdornment';

type Props<Option> = {
    title: IntlMessageKey;
    titleTranslationOptions?: IntlOptions;
    confirmTestId?: string;
    children?: ReactNode;
    options: Option[];
    isLoading: boolean;
    buttonLabel?: IntlMessageKey;
    textFieldLabel: IntlMessageKey;
    handleSubmit: (optionId: string) => void;
    selectedId?: string;
    onClose: () => void;
    OptionComponent: ComponentType<AssignTypes.OptionProps<Option>>;
    optionHelpers: {
        getOptionId: (option: Option) => string;
        getOptionLabel: (option: Option) => string;
        getFilterOptions?: (option: Option) => string;
    };
    onAdd?: (event: MouseEvent<HTMLElement>) => void;
    noOptionsText: IntlMessageKey;
};

export default function AssignComponent<Option>({
    title,
    titleTranslationOptions,
    onClose,
    confirmTestId,
    children,
    options,
    textFieldLabel,
    isLoading,
    handleSubmit,
    selectedId,
    OptionComponent,
    optionHelpers,
    buttonLabel = 'common:button.assign',
    onAdd,
    noOptionsText
}: Props<Option>) {
    const [textFieldValue, setTextFieldValue] = useState('');
    const [selectedOptionId, setSelectedOptionId] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const optionRefs = useRef<(HTMLElement | null)[]>([]);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const { t } = useAppTranslation();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const clearField = () => {
        setTextFieldValue('');
        setSelectedOptionId('');
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (!value) {
            clearField();
            return;
        }
        setTextFieldValue(value);
    };

    const handleClickOption = useCallback(
        (option: Option) => {
            const optionId = optionHelpers.getOptionId(option);

            if (selectedId === optionId) return;

            setSelectedOptionId(optionId);
            setTextFieldValue(optionHelpers.getOptionLabel(option));
            inputRef.current?.focus();
        },
        [optionHelpers, selectedId]
    );

    const handleAssign = () => {
        handleSubmit(selectedOptionId);
    };

    const filteredOptions = useMemo(
        () =>
            options.filter((option) => {
                const value = textFieldValue.trim().toLowerCase();

                if (!optionHelpers.getFilterOptions) {
                    const label = optionHelpers.getOptionLabel(option);
                    return label.toLowerCase().includes(value);
                }

                return optionHelpers.getFilterOptions(option).toLowerCase().includes(value);
            }),
        [optionHelpers, options, textFieldValue]
    );

    const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
            onClose();
            return;
        }
        if (e.key === 'Enter' && selectedOptionId) {
            e.preventDefault();
            handleAssign();
            return;
        }
        if (e.key === 'Tab' && selectedOptionId) {
            return;
        }
        if ((e.key === 'ArrowDown' || e.key === 'Tab') && filteredOptions.length > 0) {
            e.preventDefault();
            optionRefs.current[0]?.focus();
        }
    };

    const handleKeyDownChange = useCallback(
        (option: Option, index: number) => (e: KeyboardEvent<HTMLElement>) => {
            e.stopPropagation();
            const prevIndex = (index - 1 + filteredOptions.length) % filteredOptions.length;

            switch (e.key) {
            case 'Enter':
                handleClickOption(option);
                break;
            case 'ArrowDown':
                if (index === filteredOptions.length - 1) break;
                if (index + 1 in optionRefs.current) {
                    optionRefs.current[index + 1]?.focus();
                }
                break;
            case 'ArrowUp':
                if (index === 0) {
                    inputRef.current?.focus();
                    break;
                }
                optionRefs.current[prevIndex]?.focus();
                break;
            case 'Escape':
                onClose();
                break;
            default:
                break;
            }
        },
        [filteredOptions.length, handleClickOption, onClose]
    );

    const setOptionRef = useCallback(
        (index: number) => (el: HTMLElement | null) => {
            optionRefs.current[index] = el;
        },
        []
    );

    return (
        <AssignComponentStyled.Wrapper>
            <CloseButton onClose={onClose} />
            <AssignComponentStyled.Header>
                <DialogTitle sx={{ padding: 0 }}>{t(title, titleTranslationOptions)}</DialogTitle>
                <LoadingButton
                    tabIndex={1}
                    sx={{ marginLeft: '20px', textTransform: 'uppercase' }}
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    ref={buttonRef}
                    disabled={!selectedOptionId}
                    onClick={handleAssign}
                    {...applyTestId(confirmTestId)}
                    aria-label="confirm_button"
                >
                    {t(buttonLabel)}
                </LoadingButton>
            </AssignComponentStyled.Header>

            <DialogContent sx={{ padding: 0 }}>
                {children}

                <TextField
                    fullWidth
                    autoFocus
                    inputRef={inputRef}
                    autoComplete="off"
                    sx={{ position: 'sticky' }}
                    label={t(textFieldLabel)}
                    variant="filled"
                    value={textFieldValue}
                    onChange={handleChangeInput}
                    onKeyDown={handleSearchKeyDown}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{ ml: 0 }}
                            >
                                {onAdd && (
                                    <AddButton
                                        onClick={onAdd}
                                        tooltipAddButton={noOptionsText}
                                    />
                                )}

                                {textFieldValue && (
                                    <IconButton
                                        onClick={clearField}
                                        aria-label="close_button"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        )
                    }}
                />

                <Collapse in={!selectedOptionId}>
                    <OverlayScrollbarsComponent
                        style={{
                            maxHeight   : '300px',
                            paddingRight: '4px'
                        }}
                    >
                        <AssignComponentStyled.ListOptions>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <OptionComponent
                                        key={optionHelpers.getOptionId(option)}
                                        option={option}
                                        onClickOption={handleClickOption}
                                        selectedOptionId={selectedId}
                                        onKeyDown={handleKeyDownChange(option, index)}
                                        setOptionRef={setOptionRef(index)}
                                    />
                                ))
                            ) : (
                                <CreateListItem
                                    onAdd={onAdd}
                                    noOptionsText={noOptionsText}
                                />
                            )}
                        </AssignComponentStyled.ListOptions>
                    </OverlayScrollbarsComponent>
                </Collapse>
            </DialogContent>
        </AssignComponentStyled.Wrapper>
    );
}
