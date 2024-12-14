import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb');
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar no MongoDB', error);
        process.exit(1); // Encerra a aplicação em caso de erro
    }
};
