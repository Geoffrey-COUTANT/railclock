import {Journey, JourneySection} from "@/app/api/types";

let currentJourney : {
    journey: Journey;
    section: JourneySection;
    depart: string;
    arrival: string;
} | undefined = undefined

export function getCurrentJourney() {
    return currentJourney;
}

export function setCurrentJourney(journey: Journey, section: JourneySection, depart: string, arrival: string) {
    currentJourney = {
        journey: journey,
        section: section,
        depart: depart,
        arrival: arrival
    }
}

export function formatTimestamp(timestamp: string): string {
    const date = timestamp.split("T")[1];
    const hours = date.slice(0, 2);
    const minutes = date.slice(2, 4);

    return `${hours}:${minutes}`;
}

export function formatTime(timestamp: string): string {
    const hours = timestamp.slice(0, 2);
    const minutes = timestamp.slice(2, 4);

    return `${hours}:${minutes}`;
}

export function getLinkId(section: JourneySection, type: string) : string | undefined {
    for (let i = 0; i < section.links.length; i++) {
        if (section.links[i].type === type) {
            return section.links[i].id;
        }
    }

    return undefined;
}