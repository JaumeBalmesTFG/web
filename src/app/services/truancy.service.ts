// Task Functions
import { environment } from 'src/environments/environment.prod';
import { updateFetchHeader } from './reqOptions.service';

/** TRUANCY SCHEMA
*   ufId: ufId,
*   date: date,
*   reason: reason,
*   hours: hours
 */

// Create Truancy
export async function createTruancy(data:any): Promise<String> {
    const header = updateFetchHeader();
    const response = await fetch(environment.api + "/truancy/create", {
        method: "POST", headers: { 'Content-Type': 'application/json', ...header }, body: data
    })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}

// Edit Truancy
export async function updateTruancy(data: any): Promise<String> {
    const header = updateFetchHeader();
    const truancyId = data.truancyId;

    delete data.truancyId;

    data = JSON.stringify(data);

    const response = await fetch(environment.api + `/truancy/${truancyId}/edit`, {
        method: "PUT", headers: { 'Content-Type': 'application/json', ...header }, body: data
    })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}

