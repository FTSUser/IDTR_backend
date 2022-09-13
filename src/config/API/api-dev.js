const protocol = "https";
const host = "api.honda.rejoicehub.com/api/v1";

// const protocol = "https";
// const host = "908d-2405-201-200d-1a0b-5c6-6417-cf5c-cb63.ngrok.io/api/v1";
// const host = "localhost:8001/api/v1";




const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
