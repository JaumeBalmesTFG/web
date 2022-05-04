// UF Service
import { environment } from 'src/environments/environment.prod';
import { updateFetchHeader } from './reqOptions.service';

// Create UF
export async function createUf(data: any): Promise<String> {
    const header = updateFetchHeader();
    
    const response = await fetch(environment.api + "/uf/create", { method: "POST", headers: { "Content-Type": "application/json", ...header }, body: data })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}

// Get UF
export async function getUf(data:any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + `/uf/${data}`, { method: "GET", headers: { ...header } })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}

// Edit UF
export async function updateUf(data:any): Promise<String> {
    const header = updateFetchHeader();
    const ufId = data.ufId;
    delete data.ufId;

    data = JSON.stringify(data);

    const response = await fetch(environment.api + `/uf/${ufId}/edit`, { method: "PUT", headers: { "Content-Type": "application/json", ...header }, body: data })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    console.log(response);

    return response;
}

// Delete UF
export async function deleteUf(data:any): Promise<String> {
    const header = updateFetchHeader();

    const response = await fetch(environment.api + `/uf/${data}/delete`, { method: "DELETE", headers: { ...header }})
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    console.log(response);

    return response;
}
