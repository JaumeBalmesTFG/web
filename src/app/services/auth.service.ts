import { environment } from "src/environments/environment.prod";

// Auth, check if the email is ont the database 
export async function auth(email: string): Promise<String> {
  const options = {
    method: 'POST',
    body: JSON.stringify({"email": email}),
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(environment.api + "/auth", options)
    .then((res) => { return res.json() })
    .then((json) => { return json; })
    .catch(err => { return "error"; });

  return response;
}

// Register
export async function register(data: string): Promise<String> {
  const options = {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(environment.api + "/register", options)
    .then((res) => { return res.json() })
    .then((json) => { return json; })
    .catch(err => { return "error"; });

  return response;
}
