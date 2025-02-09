import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors"
import axios from "axios";

async function startServer() {
    const app = express();

    const typeDefs = `
        type Todo {
            id: ID!
            name: String!
            title: String!
            completed: Boolean
        }

        type Query {
            getTodo: [Todo]
        }
    `
    const resolvers = {
        Query : {
            getTodo: async ()=> (await axios.get("https://jsonplaceholder.typicode.com/todos")).data
        }
    }
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()

    app.use(bodyParser.json())
    app.use(cors())
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server running at http://localhost:8000/graphql")
    })

}

startServer()