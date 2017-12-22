// const baseUrl = process.env.NODE_ENV === 'development'
// ? `http://localhost:${process.env.REACT_APP_SERVER_PORT}/`
// : process.env.PUBLIC_URL;

const baseUrl='http://localhost:3001/';

function call(url, params, method, body, handle) {
    console.log(handle);
    
const validBody = body ? JSON.stringify(body) : undefined;
console.log(`Execute ${method} ${baseUrl + url} ${validBody ? 'with ' + validBody : ''}`);
return fetch(baseUrl + url, 
    { 
        method,
        body: validBody,
        headers: new Headers({
            'Content-Type': 'application/json'
        }) 
    })
    .then(data => data.json())
    .catch(err => {
        console.error(err);
    })
    .then(response => handle(response));
}

export function get(url, params, handle) {
return call(url, params, 'GET', null, handle);
}

export function post(url, params, body, handle) {
return call(url, params, 'POST', body, handle);
}

export function put(url, params, body, handle) {
return call(url, params, 'PUT', body, handle);
}

export function remove(url, params, handle) {
return call(url, params, 'DELETE', null, handle);
}