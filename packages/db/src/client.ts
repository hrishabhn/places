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
import {SearchInputSchema} from './types'

export const db = {
    country: {
        getAll: {input: GetAllCountryOptions, query: GetAllCountry},
    },
    city: {
        getAll: {input: GetAllCityOptions, query: GetAllCity},
        get: {input: GetCityOptions, query: GetCity},
    },
    place: {
        getAll: {input: GetAllPlaceOptions, query: GetAllPlace},
        get: {input: GetPlaceOptions, query: GetPlace},
    },
    placeTag: {
        getAll: {query: GetAllPlaceTag},
    },
    placeType: {
        getAll: {query: GetAllPlaceType},
    },
    search: {
        all: {input: SearchInputSchema, query: SearchAll},
        cityFilter: {input: SearchInputSchema, query: SearchCityFilter},
        placeFilter: {input: SearchInputSchema, query: SearchPlaceFilter},
    },
} as const
