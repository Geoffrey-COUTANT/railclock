
export type Journey = {
    duration: number,
    departure_date_time: string
    arrival_date_time: string
    requested_date_time: string
    type: string
    status: string
    tags: string[]
    sections: JourneySection[]
}

export type JourneySection = {
    id: string,
    duration: number,
    departure_date_time: string,
    arrival_date_time: string,
    base_departure_date_time: string,
    base_arrival_date_time: string
    to: PtObjectStopPointArea,
    from: PtObjectStopPointArea
    type: string
}

export type PtObject = {
    id: string,
    name: string,
    quality: number
}

export type PtObjectStopPointArea = {
    id: string,
    name: string,
    quality: number,
    stop_point: StopPoint,
    stop_area: StopArea
}

export type StopPoint = {
    id: string,
    name: string,
    label: string,
    stop_area: StopArea,
}

export type StopArea = {
    id: string,
    name: string,
    label: string,
}