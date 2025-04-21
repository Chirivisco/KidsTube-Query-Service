const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
require('dotenv').config();

// Importar modelos
require('./models');

// Importar esquemas y resolvers (los crearemos después)
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

async function startServer() {
    const app = express();

    // Conectar a la base de datos
    await connectDB();

    // Crear el servidor Apollo
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true, // Habilitar GraphQL Playground en desarrollo
    });

    // Iniciar el servidor Apollo
    await server.start();

    // Aplicar middleware de Apollo a Express
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor GraphQL corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer().catch(err => {
    console.error('Error al iniciar el servidor:', err);
}); 