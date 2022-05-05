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

// Edit task
export async function updateTask(data: any): Promise<String> {
    const header = updateFetchHeader();
    const taskId = data.taskId;

    delete data.taskId;

    data = JSON.stringify(data);

    const response = await fetch(environment.api + `/task/${taskId}/edit`, {
        method: "PUT", headers: { 'Content-Type': 'application/json', ...header }, body: data
    })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}

// Delete UF
export async function deleteTask(data:any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + `/task/${data}/delete`, { method: "DELETE", headers: { ...header }})
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}