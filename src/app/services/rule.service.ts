// RULE Service
import { environment } from 'src/environments/environment.prod';
import { updateFetchHeader } from './reqOptions.service';

// Create Rule
export async function createRule(data: any): Promise<String> {
    const header = updateFetchHeader();
    
    const response = await fetch(environment.api + "/rule/create", { method: "POST", headers: { "Content-Type": "application/json", ...header }, body: data })
        .then(res => { return res.json() })
        .then(json => { return json })
        .catch(err => { return err })

    return response;
}