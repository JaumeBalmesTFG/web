// Task Functions
import { environment } from 'src/environments/environment.prod';
import { updateFetchHeader } from './reqOptions.service';

/** TRUANCY SCHEMA
*   ufId: ufId,
*   date: date,
*   reason: reason,
*   hours: hours
 */

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