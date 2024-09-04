/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
import { AutocompleteRenderOptionState, Grid, IconButton, Stack, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { React } from 'mdi-material-ui';
import VectorIcons from '@/@core/icons/vector_icons';
import { Content, Description, Divider, IconWrapper, Title } from './styled';

export type Option = {
    id: string;
    name: string;
    mc: number;
    nameAndMc: string;
    phoneNumber: string;
    address: string;
    email: string;
    active: boolean;
    dot: number;
    added: boolean;
};

type Props = {
    option: Option;
    inputValue: AutocompleteRenderOptionState['inputValue'];
    onEditBroker: (brokerId: string) => void;
};

function getParts(text: string, inputValue: string) {
    const matches = match(text || '', inputValue, { insideWords: true });
    const parts = parse(text || '', matches);

    return parts.map((part) => (
        <Typography
            component="span"
            fontSize="inherit"
            fontWeight="inherit"
            lineHeight="inherit"
            sx={{
                color: (theme) =>
                    part.highlight ? theme.palette.semantic.text.brand.primary : 'inherit'
            }}
        >
            {part.text}
        </Typography>
    ));
}

function BrokerSelectOption({
    option,
    inputValue,
    onEditBroker
}: Props) {
    const nameParts = getParts(option.name, inputValue);
    const mcParts = getParts(option.mc.toString(), inputValue);
    const dotParts = getParts(option.dot.toString(), inputValue);
    const addressParts = getParts(option.address, inputValue);
    const phoneParts = getParts(option.phoneNumber, inputValue);

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="space-between"
        >
            <Content item>
                <Stack
                    paddingBottom={1}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                >
                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        flexWrap="wrap"
                        gap="5px"
                    >
                        <Title variant="body2">{nameParts}</Title>
                        <IconWrapper sx={{ justifyContent: 'flex-start' }}>
                            <VectorIcons.MCIcon
                                sx={{
                                    color: ({ palette }) => palette.semantic.foreground.primary
                                }}
                            />
                            <Typography
                                fontSize="10px"
                                variant="body2"
                                component="span"
                            >
                                {mcParts}
                            </Typography>
                        </IconWrapper>
                    </Stack>
                </Stack>

                <Description>
                    <IconWrapper sx={{ minWidth: 60, justifyContent: 'flex-start' }}>
                        <VectorIcons.DOTIcon
                            sx={{
                                color: ({ palette }) => palette.semantic.foreground.primary
                            }}
                        />
                        <Typography
                            fontSize="10px"
                            variant="body2"
                        >
                            {dotParts}
                        </Typography>
                    </IconWrapper>
                    <Divider />
                    <IconWrapper
                        style={{ overflow: 'hidden', width: '100%', justifyContent: 'flex-start' }}
                    >
                        <LocationOnIcon
                            sx={{
                                color: ({ palette }) => palette.semantic.foreground.primary
                            }}
                        />
                        <Typography
                            fontSize="10px"
                            variant="body2"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >
                            {addressParts}
                        </Typography>
                    </IconWrapper>
                    {option.phoneNumber && (
                        <>
                            <Divider />
                            <IconWrapper>
                                <LocalPhoneSharpIcon
                                    sx={{
                                        color: ({ palette }) => palette.semantic.foreground.primary
                                    }}
                                />
                                <Typography
                                    fontSize="10px"
                                    variant="body2"
                                    noWrap
                                >
                                    {phoneParts}
                                </Typography>
                            </IconWrapper>
                        </>
                    )}
                </Description>
            </Content>
            {!option.added && (
                <Tooltip
                    title="Add Broker to Company"
                    placement="top"
                >
                    <IconButton
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.semantic.foreground.brand.secondary
                        }}
                    >
                        <AddIcon color="primary" />
                    </IconButton>
                </Tooltip>
            )}
            {option.added && (
                <Tooltip
                    title="Edit Broker"
                    placement="top"
                >
                    <IconButton
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.semantic.foreground.brand.secondary,
                            ml: '4px'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEditBroker(option.id);
                        }}
                    >
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
            )}
        </Grid>
    );
}

export default BrokerSelectOption;
