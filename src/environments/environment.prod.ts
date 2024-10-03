const hostname = window.location.hostname;

export const environment = {
    production: true,
    endpoint: `${hostname}:8000/api`,
};
