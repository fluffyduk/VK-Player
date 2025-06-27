const BASE_URL = 'http://127.0.0.1:8000';

export const getToken = (login, password) => {
    const response = fetch(`${BASE_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });
    return response
}

export const getUserSongs = (user_id) => {
    const response = fetch(`${BASE_URL}/user_songs?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}