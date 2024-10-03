const hostname = window.location.hostname;

export const environment = {
    production: true,
    endpoint: `http://${hostname}:8000/api`,
};
