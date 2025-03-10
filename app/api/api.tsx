const API_KEY = "0222669c-211d-4042-bc5a-851ed579f629";

export async function fetchAPI(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<any> {
    const url = new URL(`https://api.sncf.com/v1/coverage/sncf/${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, String(params[key])));

    console.log(API_KEY, url.toString());

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Basic ${API_KEY}`,
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
}

export async function searchForPtObject(query: string): Promise<any> {
    return fetchAPI("pt_objects", {q: query})
}