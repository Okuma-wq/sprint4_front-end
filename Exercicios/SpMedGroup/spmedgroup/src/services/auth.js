export const usuarioAutenticado = () => localStorage.getItem('token') !== null;

export const parseJwt = () => {
    let base64 = localStorage.getItem('token').split('.')[1]

    return JSON.parse(window.atob(base64));
}

export const token = () => {
    return localStorage.getItem('token')
}