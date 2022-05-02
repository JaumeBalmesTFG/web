import { environment } from "src/environments/environment.prod";

// Auth, check if the email is ont the database
export async function auth(email: String): Promise<String> {

  const options = {
    method: 'POST',
    body: JSON.stringify({"email": email}),
    headers: { 'Content-Type': 'application/json' }
  };

  const data = await fetch(environment.api + "/auth", options)
    .then((response) => { return response.json() })
    .then((json) => { return json; })
    .catch(err => { return "error"; });

  return data;
}
