// Subject Request Functions
import { environment } from 'src/environments/environment.prod';
import { updateFetchHeader } from './reqOptions.service';

// Get all subjects
export async function getAll(): Promise<String> {
  const header = updateFetchHeader();
  const response = await fetch(environment.api + "/module/all/ufs", { method: "GET", headers: { ...header } })
    .then(res => { return res.json() })
    .then(json => { return json })
    .catch(err => { return err })

  return response;
}

// Create Subject
export async function createSubject(data: any): Promise<String> {
  const header = updateFetchHeader();
  const response = await fetch(environment.api + "/module", {
    method: "POST", headers: { 'Content-Type': 'application/json', ...header }, body: data
  })
    .then(res => { return res.json() })
    .then(json => { return json })
    .catch(err => { return err })

  return response;
}

// Update Subject
export async function updateSubject(data: any): Promise<String> {
  const header = updateFetchHeader();
  const authorId = data.authorId;
  
  delete data.authorId;
  
  data = JSON.stringify(data);

  const response = await fetch(environment.api + `/module/${authorId}`, {
    method: "PUT", headers: { 'Content-Type': 'application/json', ...header }, body: data
  })
    .then(res => { return res.json() })
    .then(json => { return json })
    .catch(err => { return err })

  return response;
}