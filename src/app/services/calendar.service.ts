// Calendar Service
import {environment} from 'src/environments/environment.prod';
import {updateFetchHeader} from './reqOptions.service';

// Get calendar
export async function getCalendar(): Promise<String> {
    const header = updateFetchHeader();
    const response = await fetch(environment.api + "/calendar", {method: "GET", headers: {...header}})
        .then(res => {
            return res.json()
        })
        .then(json => {
            return json
        })
        .catch(err => {
            return err
        })

    return response;
}
