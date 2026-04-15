import mongoose from 'mongoose';
import { config } from '../config/env';

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB подключен успешно');
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
}