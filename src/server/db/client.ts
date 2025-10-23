import {GetAllCity, GetAllCityOptions} from './queries/get-all-city'
import {GetAllCountry, GetAllCountryOptions} from './queries/get-all-country'
import {GetAllPlace, GetAllPlaceOptions} from './queries/get-all-place'
import {GetAllPlaceTag} from './queries/get-all-place-tag'
import {GetAllPlaceType} from './queries/get-all-place-type'
import {GetCity, GetCityOptions} from './queries/get-city'
import {GetPlace, GetPlaceOptions} from './queries/get-place'
import {SearchAll} from './queries/search-all'
import {SearchCityFilter} from './queries/search-city-filter'
import {SearchPlaceFilter} from './queries/search-place-filter'

export {GetAllCountryOptions, GetAllCityOptions, GetAllPlaceOptions, GetCityOptions, GetPlaceOptions}

export const db = {
    country: {
        getAll: GetAllCountry,
    },
    city: {
        getAll: GetAllCity,
        get: GetCity,
    },
    place: {
        getAll: GetAllPlace,
        get: GetPlace,
    },
    placeTag: {
        getAll: GetAllPlaceTag,
    },
    placeType: {
        getAll: GetAllPlaceType,
    },
    search: {
        all: SearchAll,
        cityFilter: SearchCityFilter,
        placeFilter: SearchPlaceFilter,
    },
}
