import { environment } from "src/environments/environment.prod";

// Check localstorage token
export function isLocalStorageToken(): boolean {
    const token:any = localStorage.getItem('token');
    if(token){ return true; }
    return false;
}

// check if is true and store the token on the localstorage
export function checkAndStoreToken(token: string): void {
    if (token) {
        localStorage.setItem('token', token);
    }
}

// Auth, check if the email is ont the database
export async function auth(email: string): Promise<String> {
    const options = {
        method: 'POST',
        body: JSON.stringify({ "email": email }),
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

    checkAndStoreToken(response.body.token);

    return response;
}

// Register
export async function login(data: string): Promise<String> {
    const options = {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetch(environment.api + "/login", options)
        .then((res) => { return res.json() })
        .then((json) => { return json; })
        .catch(err => { return "error"; });

    checkAndStoreToken(response.body.token);

    return response;
}
