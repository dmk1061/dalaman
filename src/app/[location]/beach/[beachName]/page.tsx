import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

async function getBeachData(location: string, beachName: string) {
    const beachDirectory = path.join(process.cwd(), 'content', 'locations', location, 'beach', beachName);
    
    try {
        // Проверяем существование папки пляжа
        if (!fs.existsSync(beachDirectory)) {
            return null;
        }

        // Читаем содержимое папки
        const files = fs.readdirSync(beachDirectory);
        
        // Ищем текстовый файл с описанием
        const textFile = files.find(file => file.endsWith('.txt'));
        let description = '';
        let title = beachName;
        
        if (textFile) {
            const textContent = fs.readFileSync(path.join(beachDirectory, textFile), 'utf8');
            const lines = textContent.split('\n');
            title = lines[0] || beachName; // Первая строка как заголовок
            description = lines.slice(1).join('\n').trim(); // Остальное как описание
        }

        // Получаем все изображения
        const images = files
            .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
            .map(file => `/api/images/locations/${location}/beach/${beachName}/${file}`);

        return {
            title,
            description,
            images,
            beachName
        };
    } catch (error) {
        console.error(`Could not read beach data for ${location}/${beachName}:`, error);
        return null;
    }
}

type BeachPageProps = {
    params: {
        location: string;
        beachName: string;
    }
}

const BeachPage = async ({ params }: BeachPageProps) => {
    const { location, beachName } = params;
    const beachData = await getBeachData(location, beachName);

    if (!beachData) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4">Пляж не найден</h1>
                    <p>К сожалению, мы не смогли найти информацию о пляже '{beachName}' в {location}.</p>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">{beachData.title}</h1>
                    
                    {/* Галерея изображений */}
                    {beachData.images.length > 0 && (
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {beachData.images.map((image, index) => (
                                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                        <Image
                                            src={image}
                                            alt={`${beachData.beachName} - фото ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Описание пляжа */}
                    <div className="prose lg:prose-xl max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {beachData.description}
                        </div>
                    </div>

                    {/* Кнопка назад */}
                    <div className="mt-8 pt-8 border-t">
                        <a 
                            href={`/${location}/beaches`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors underline"
                        >
                            ← Все пляжи {location}
                        </a>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export async function generateStaticParams() {
    const locationsDirectory = path.join(process.cwd(), 'content', 'locations');
    const paths = [];

    try {
        const locations = fs.readdirSync(locationsDirectory).filter(item =>
            fs.statSync(path.join(locationsDirectory, item)).isDirectory()
        );

        for (const location of locations) {
            const locationDirectory = path.join(locationsDirectory, location);
            const beachDirectory = path.join(locationDirectory, 'beach');
            
            // Проверяем, существует ли папка beach
            if (fs.existsSync(beachDirectory) && fs.statSync(beachDirectory).isDirectory()) {
                const beachItems = fs.readdirSync(beachDirectory);

                // Ищем папки пляжей
                const beachDirectories = beachItems.filter(item => {
                    const itemPath = path.join(beachDirectory, item);
                    return fs.statSync(itemPath).isDirectory();
                });

                for (const beachName of beachDirectories) {
                    paths.push({
                        location: location,
                        beachName: beachName
                    });
                }
            }
        }
    } catch (error) {
        console.log('Could not generate static params for beaches:', error);
    }

    return paths;
}

export default BeachPage; 