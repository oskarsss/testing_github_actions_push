/* eslint-disable default-case */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const chroma = require('chroma-js');
const StyleDictionary = require('style-dictionary');

const OUTPUT_DIR = './src/@system/themes/configs/';

const PARSER_CONFIG = [
    {
        sources : './style-dictionary/properties/vektor.json',
        fileName: 'vektor'
    }

    // {
    //     sources : './style-dictionary/properties/route-mate.json',
    //     fileName: 'route-mate'
    // },
    // {
    //     sources : './style-dictionary/properties/fiol.json',
    //     fileName: 'test-brand'
    // },
    // {
    //     sources : './style-dictionary/properties/hero.json',
    //     fileName: 'hero'
    // }
];

// @ts-ignore
const colorTransform = (token) => {
    const { value } = token;
    const modifies = token.$extensions?.['studio.tokens']?.modify
        ? [token.$extensions['studio.tokens'].modify]
        : [];

    let color = chroma(value);

    modifies.forEach(({
        type,
        value,
        space
    }) => {
        const amount = parseFloat(value);
        if (space === 'hsl') {
            const hsl = color.hsl();
            switch (type) {
            case 'lighten':
                hsl[2] += amount * (1 - hsl[2]);
                break;
            case 'darken':
                hsl[2] -= amount * hsl[2];
                break;
            }
            color = chroma.hsl(...hsl);
        } else if (typeof color[type] === 'function') {
            color = color[type](amount);
        } else {
            console.warn(`Unsupported modification type: ${type}`);
        }
    });

    return color.hex();
};

const sdList = PARSER_CONFIG.map((el) =>
    StyleDictionary.extend({
        source   : [el.sources],
        transform: {
            colorTransform: {
                type      : 'value',
                transitive: true,

                // @ts-ignore
                matcher    : (token) => token.attributes?.category === 'color' || token.$extensions,
                transformer: colorTransform
            },
            'color/scss': { ...StyleDictionary.transform['color/scss'], transitive: true }
        },
        platforms: {
            json: {
                transformGroup: 'json',
                transforms    : ['attribute/cti', 'name/cti/kebab', 'colorTransform'],
                buildPath     : OUTPUT_DIR,
                files         : [
                    {
                        destination: `${el.fileName}.json`,
                        format     : 'json/nested'
                    }
                ]
            },
            scss: {
                transformGroup: 'scss',
                prefix        : 'sd',
                transforms    : ['attribute/cti', 'name/cti/kebab', 'colorTransform'],
                buildPath     : OUTPUT_DIR,
                files         : [
                    {
                        destination: '_colors.scss',
                        format     : 'scss/variables'
                    }
                ]
            }
        }
    }));

sdList.forEach((sd) => {
    sd.buildAllPlatforms();
});
