import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema.js";

const yoga = createYoga({
	schema,
	cors: {
		origin: "http://localhost:3000",
	},
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info("[Server: 4000] => http://localhost:4000/graphql");
});
