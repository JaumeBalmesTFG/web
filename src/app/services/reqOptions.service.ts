// Update fetch api header options
export function updateFetchHeader(): any {
    const token: any = localStorage.getItem('token');
    if (token) {
        return {'Authorization': `Bearer ${token}`};
    }
    return "";
}
