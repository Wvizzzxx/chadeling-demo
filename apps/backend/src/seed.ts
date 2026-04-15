import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from './config/env';
import User from './models/User';
import Product from './models/Product';
import type { ProductInput } from '@waystea/types';

const products: ProductInput[] = [
  // Чёрный чай
  {
    name: 'Ассам Золотой',
    description: 'Классический индийский чёрный чай с насыщенным вкусом и золотистым настоем. Идеален для утреннего чаепития.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d294?w=400',
    category: 'black',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Дарджилинг First Flush',
    description: 'Элитный чай из региона Дарджилинг с нежным цветочным ароматом и лёгкой терпкостью.',
    price: 1490,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6799e?w=400',
    category: 'black',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Цейлонский Премиум',
    description: 'Высокогорный цейлонский чай с ярким вкусом и красноватым настоем. Отлично подходит с молоком.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    category: 'black',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Кения GFOP',
    description: 'Африканский чёрный чай с крепким вкусом и тёмным настоем. Бодрит лучше кофе.',
    price: 590,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d294?w=400',
    category: 'black',
    weight: 100,
    inStock: true,
  },
  // Зелёный чай
  {
    name: 'Лунцзин (Колодец Дракона)',
    description: 'Знаменитый китайский зелёный чай с ореховым ароматом и сладким послевкусием.',
    price: 1890,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'green',
    weight: 50,
    inStock: true,
  },
  {
    name: 'Сенча Японская',
    description: 'Классический японский зелёный чай с травянистым вкусом и изумрудным настоем.',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8b8586e4?w=400',
    category: 'green',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Ганпаудер (Порох)',
    description: 'Китайский зелёный чай, скрученный в шарики. Крепкий настой с дымным ароматом.',
    price: 690,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
    category: 'green',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Чай Жасминовый',
    description: 'Зелёный чай с цветами жасмина. Нежный цветочный аромат и мягкий вкус.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1563822249366-3e00b75e9545?w=400',
    category: 'green',
    weight: 100,
    inStock: true,
  },
  // Белый чай
  {
    name: 'Бай Хао Инь Чжень (Серебряные Иглы)',
    description: 'Элитный белый чай из почек с нежным сладким вкусом и цветочным ароматом.',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400',
    category: 'white',
    weight: 50,
    inStock: true,
  },
  {
    name: 'Бай Му Дань (Белый Пион)',
    description: 'Белый чай с более насыщенным вкусом, чем Серебряные Иглы. Медовый аромат.',
    price: 1790,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
    category: 'white',
    weight: 50,
    inStock: true,
  },
  // Улун
  {
    name: 'Те Гуань Инь (Железная Богиня)',
    description: 'Легендарный улун с цветочным ароматом и сладким послевкусием. Многократное заваривание.',
    price: 1990,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'oolong',
    weight: 50,
    inStock: true,
  },
  {
    name: 'Да Хун Пао (Большой Красный Халат)',
    description: 'Легендарный утёсный улун с глубоким вкусом и нотами шоколада и сухофруктов.',
    price: 3490,
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d294?w=400',
    category: 'oolong',
    weight: 50,
    inStock: true,
  },
  {
    name: 'Молочный Улун (Най Сян)',
    description: 'Улун с нежным сливочным ароматом. Мягкий вкус, идеален для начинающих.',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8b8586e4?w=400',
    category: 'oolong',
    weight: 100,
    inStock: true,
  },
  // Пуэр
  {
    name: 'Шу Пуэр 2015 (Юньнань)',
    description: 'Выдержанный шу пуэр из Юньнани. Землистый вкус с нотами ореха и шоколада.',
    price: 2190,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
    category: 'puerh',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Шен Пуэр 2018 (Бань Чжан)',
    description: 'Молодой шен пуэр с ярким вкусом и горчинкой. Потенциал для выдержки.',
    price: 2890,
    image: 'https://images.unsplash.com/photo-1563822249366-3e00b75e9545?w=400',
    category: 'puerh',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Пуэр в мандарине',
    description: 'Шу пуэр, выдержанный в кожуре мандарина. Цитрусовый аромат и мягкий вкус.',
    price: 1590,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400',
    category: 'puerh',
    weight: 100,
    inStock: true,
  },
  // Травяной
  {
    name: 'Иван-чай (Кипрей)',
    description: 'Русский травяной чай с медовым ароматом. Не содержит кофеина.',
    price: 490,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6799e?w=400',
    category: 'herbal',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Ройбуш Классический',
    description: 'Южноафриканский травяной чай с карамельным вкусом. Без кофеина, богат антиоксидантами.',
    price: 590,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    category: 'herbal',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Мятный чай (Марокканский)',
    description: 'Смесь зелёного чая с мятой. Освежающий вкус по марокканскому рецепту.',
    price: 690,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    category: 'herbal',
    weight: 100,
    inStock: true,
  },
  {
    name: 'Каркаде (Гибискус)',
    description: 'Чай из цветков гибискуса с кисловатым вкусом и рубиновым цветом. Богат витамином C.',
    price: 390,
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8b8586e4?w=400',
    category: 'herbal',
    weight: 100,
    inStock: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB подключён');

    // Очистка
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  База очищена');

    // Создание админа (pre-save хук сам хеширует passwordHash)
    await User.create({
      name: 'Администратор',
      email: 'admin@waystea.ru',
      passwordHash: 'admin123',
      role: 'admin',
    });
    console.log('👤 Админ создан (admin@waystea.ru / admin123)');

    // Создание пользователя
    await User.create({
      name: 'Иван Петров',
      email: 'user@waystea.ru',
      passwordHash: 'user123',
      role: 'customer',
    });
    console.log('👤 Пользователь создан (user@waystea.ru / user123)');

    // Создание товаров
    await Product.insertMany(products);
    console.log(`📦 Создано ${products.length} товаров`);

    console.log('✅ Seed завершён!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка seed:', error);
    process.exit(1);
  }
}

seed();