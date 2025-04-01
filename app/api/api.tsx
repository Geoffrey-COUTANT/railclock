import { Buffer } from 'buffer'
import {Journey, PtObject, VehicleJourney} from "@/app/api/types";
const API_KEY = "0222669c-211d-4042-bc5a-851ed579f629";

export async function fetchAPI(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
    const url = new URL(`https://api.sncf.com/v1/coverage/sncf/${endpoint}`);
    const authUsername = API_KEY;
    const authPassword = "";
    let authString = Buffer.from(`${authUsername}:${authPassword}`, 'utf-8').toString("base64");
    Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));

    console.log("GET", url.toString());

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Basic ${authString}`,
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

export async function searchForPtObject(query: string): Promise<any> {
    return fetchAPI("pt_objects", {q: query})
}

export async function getPtObject(query: string): Promise<PtObject | undefined> {
    let object = await fetchAPI("pt_objects", {q: query})
    if (!object) return undefined;

    return object.pt_objects[0];
}

export async function getVehicleJourney(id: string): Promise<VehicleJourney | undefined> {
    let object = await fetchAPI("vehicle_journeys/" + id)
    if (!object) return undefined;

    return object.vehicle_journeys[0];
}

export async function getJourneys(departure: string, arrival: string): Promise<Journey[]> {
    let now = new Date();
    let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    let secondsToEndOfDay = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
    console.log(secondsToEndOfDay);

    try {
        let object = await fetchAPI("journeys", {from: departure, to: arrival, timeframe_duration: secondsToEndOfDay})
        return object.journeys;
    } catch (e) {
        console.error(e);
        return [];
    }
}