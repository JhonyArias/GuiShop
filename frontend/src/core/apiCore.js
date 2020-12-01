import { API } from '../config';

export const getInstruments = () => {
    return fetch(
        `${API}/instrument/instruments`,
        {
            method: 'GET'
        }
    )
    .then(response => {
        console.log(response)
        return response.json()
    })
    .catch(err => console.log(err))
}   