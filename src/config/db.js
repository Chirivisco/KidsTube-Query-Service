const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('Intentando conectar a MongoDB con URI:', process.env.MONGODB_URI);
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('Nombre de la base de datos:', conn.connection.name);
        
        // Verificar las colecciones disponibles
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('Colecciones en la base de datos:', collections.map(c => c.name));
        
        // Verificar el número de documentos en cada colección
        for (const collection of collections) {
            const count = await conn.connection.db.collection(collection.name).countDocuments();
            console.log(`Número de documentos en ${collection.name}: ${count}`);
        }
        
    } catch (error) {
        console.error(`Error de conexión a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 