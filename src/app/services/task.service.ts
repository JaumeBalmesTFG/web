// Task Functions
import { environment } from 'src/environments/environment.prod';
import { updateFetchHeader } from './reqOptions.service';

/** TASK SCHEMA
 * ufId:
 * ruleId:
 * name:
 * grade:
 * description:
 * dueDate:
 */

// Create Task
export async function createTask(data: any): Promise<String> {
    const header = updateFetchHeader();
    const response = await fetch(environment.api + "/task/create", {
        method: "POST", headers: { 'Content-Type': 'application/json', ...header }, body: data
    })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}