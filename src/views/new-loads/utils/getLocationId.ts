// /* eslint-disable consistent-return */

// let Geocoder: google.maps.Geocoder;
// let AutocompleteService: google.maps.places.AutocompleteService;

// const getLocationId = async (address: string) => {
//     if (!window.google) return;

//     if (!Geocoder) {
//         Geocoder = new window.google.maps.Geocoder();
//     }

//     try {
//         const { results } = await Geocoder.geocode({ address });

//         if (!AutocompleteService) {
//             AutocompleteService = new window.google.maps.places.AutocompleteService();
//         }
//         const location = await AutocompleteService.getPlacePredictions(
//             { input: address },
//             (results) => results
//         );

//         const location_id = location.predictions.find((el) =>
// el.place_id === results[0].place_id);

//         return {
//             location_id
//         };
//     } catch (error) {
//         console.error('GEOCODER CONVERTER:', error);
//         return {
//             location_id: {}
//         };
//     }
// };

// export default getLocationId;
