import { Client } from "pg";

const client = new Client({
  user: "typemonkey",
  host: "localhost",
  database: "typemonkeydb",
  password: "typemonkey123",
  port: 6000,
});

await client.connect();
export default client;