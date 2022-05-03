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

  console.log(response);

  return response;
}

// Get One Subject
export async function getOneSubject(data:any): Promise<String> {
  const header = updateFetchHeader();
  const response = await fetch(environment.api + `/module/${data.moduleId}`, { method: "GET", headers: { ...header } })
    .then(res => { return res.json() })
    .then(json => { return json })
    .catch(err => { return err })

  console.log(response);

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
  const moduleId = data.moduleId;
  
  delete data.moduleId;
  
  data = JSON.stringify(data);

  const response = await fetch(environment.api + `/module/${moduleId}`, {
    method: "PUT", headers: { 'Content-Type': 'application/json', ...header }, body: data
  })
    .then(res => { return res.json() })
    .then(json => { return json })
    .catch(err => { return err })

  return response;
}

// Archive/Dearchive Subject
export async function archiveOrDearchiveSubject(data: any): Promise<String> {
  const header = updateFetchHeader();
  const moduleId = data.moduleId;
  
  delete data.moduleId;
  data = JSON.stringify(data);

  const response = await fetch(environment.api + `/module/${moduleId}/archive`, {
    method: "PUT", headers: { 'Content-Type': 'application/json', ...header }, body: data
  })
    .then(res => { return res.json() })
    .then(json => { return json })
    .catch(err => { return err })

  return response;
}