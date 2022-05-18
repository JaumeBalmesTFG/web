// RULE Service
import {environment} from 'src/environments/environment.prod';
import {updateFetchHeader} from './reqOptions.service';

/** RULE SCHEMA
 * ufId
 * title
 * percentage
 */

// Create Rule
export async function createRule(data: any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + "/rule/create", {
        method: "POST",
        headers: {"Content-Type": "application/json", ...header},
        body: data
    })
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

// Get Rule
export async function getRule(data: any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + `/rule/${data}`, {method: "GET", headers: {...header}})
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

// Get All Rules From Uf
export async function getAllRules(data: any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + `/rule/uf/${data}`, {method: "GET", headers: {...header}})
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

// Edit Rule
export async function updateRule(data: any): Promise<String> {
    const header = updateFetchHeader();
    const ruleId = data.ruleId;
    delete data.ruleId;

    data = JSON.stringify(data);

    const response = await fetch(environment.api + `/rule/${ruleId}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json", ...header},
        body: data
    })
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

// Delete Rule
export async function deleteRule(data: any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + `/rule/${data}/delete`, {
        method: "DELETE", headers: {...header}
    })
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
