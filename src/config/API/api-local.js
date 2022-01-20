const protocol = "http";
// const host = "api.honda.rejoicehub.com/api/v1";
const host = "192.168.29.102:8001/api/v1";

// const protocol = "https";
// const host = "api.canna.rejoicehub.com/api/v1";

const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
