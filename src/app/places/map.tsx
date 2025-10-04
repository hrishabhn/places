'use client'

import {getPlaceIcon} from '../views/place/place-icon'

import {Dialog} from '@headlessui/react'
import {AnimatePresence, motion} from 'motion/react'

import {type Place} from '@/server/types'

import {MapView} from '@/components/views/map'

type PlaceWithCoordinates = Place & {lat: number; lon: number}
const isPlaceWithCoordinates = (place: Place): place is PlaceWithCoordinates => place.lat !== null && place.lon !== null

export function PlacesMapModal({isOpen, onClose, allPlace}: {isOpen: boolean; onClose: () => void; allPlace: Place[]}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog static open={isOpen} onClose={() => onClose()} className="relative z-50">
                    <motion.button
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, transition: {duration: 0.1}}}
                        transition={{ease: 'easeInOut', duration: 0.2}}
                        className="fixed inset-0 size-full bg-black/40 backdrop-blur"
                        onClick={() => onClose()}
                    />
                    <motion.div
                        initial={{translateY: 100, opacity: 0}}
                        animate={{translateY: 0, opacity: 1}}
                        exit={{translateY: 100, opacity: 0, transition: {duration: 0.1}}}
                        transition={{ease: 'easeInOut', duration: 0.2}}
                        className="fixed inset-x-0 bottom-0 z-50 h-4/5 overflow-hidden rounded-t-xl bg-layer-0 ring-1 ring-line dark:bg-layer-0-dark dark:ring-line-dark"
                    >
                        <MapView
                            onClose={onClose}
                            allPlace={allPlace.filter(isPlaceWithCoordinates).map(place => ({
                                id: place.id,
                                title: place.name,
                                subtitle: place.type.at(0),
                                lat: place.lat,
                                lon: place.lon,
                                icon: getPlaceIcon(place.type.at(0)),
                            }))}
                        />
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
