import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

async function getSightData(location: string, sightName: string) {
    // Ищем в папках ruine, ruines, todo или напрямую в папке достопримечательности
    const possiblePaths = [
        path.join(process.cwd(), 'content', 'locations', location, 'ruine', sightName),
        path.join(process.cwd(), 'content', 'locations', location, 'ruines', sightName),
        path.join(process.cwd(), 'content', 'locations', location, 'todo', sightName),
        path.join(process.cwd(), 'content', 'locations', location, sightName)
    ];
    
    let sightDirectory: string | null = null;
    
    // Находим существующую папку
    for (const dirPath of possiblePaths) {
        if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
            sightDirectory = dirPath;
            break;
        }
    }
    
    if (!sightDirectory) {
        return null;
    }

    try {
        // Читаем содержимое папки
        const files = fs.readdirSync(sightDirectory);
        
        // Ищем текстовый файл с описанием
        const textFile = files.find(file => file.endsWith('.txt'));
        let description = '';
        let title = sightName;
        
        if (textFile) {
            const textContent = fs.readFileSync(path.join(sightDirectory, textFile), 'utf8');
            const lines = textContent.split('\n');
            title = lines[0] || sightName; // Первая строка как заголовок
            description = lines.slice(1).join('\n').trim(); // Остальное как описание
        }

        // Получаем все изображения
        const pathSegment = sightDirectory.includes('ruine') ? 'ruine' : 
                          sightDirectory.includes('ruines') ? 'ruines' : 
                          sightDirectory.includes('todo') ? 'todo' : '';
        
        const images = files
            .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
            .map(file => `/api/images/locations/${location}/${pathSegment}/${sightName}/${file}`);

        return {
            title,
            description,
            images,
            sightName
        };
    } catch (error) {
        console.error(`Could not read sight data for ${location}/${sightName}:`, error);
        return null;
    }
}

type SightPageProps = {
    params: {
        location: string;
        sightName: string;
    }
}

const SightPage = async ({ params }: SightPageProps) => {
    const { location, sightName } = params;
    const sightData = await getSightData(location, sightName);

    if (!sightData) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4">Достопримечательность не найдена</h1>
                    <p>К сожалению, мы не смогли найти информацию о достопримечательности '{sightName}' в {location}.</p>
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
                    <h1 className="text-4xl font-bold mb-6">{sightData.title}</h1>
                    
                    {/* Галерея изображений */}
                    {sightData.images.length > 0 && (
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {sightData.images.map((image, index) => (
                                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                        <Image
                                            src={image}
                                            alt={`${sightData.sightName} - фото ${index + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Описание достопримечательности */}
                    <div className="prose lg:prose-xl max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {sightData.description}
                        </div>
                    </div>

                    {/* Кнопка назад */}
                    <div className="mt-8 pt-8 border-t">
                        <a 
                            href={`/${location}/sights`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors underline"
                        >
                            ← Все достопримечательности {location}
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
            
            // Проверяем папки ruine, ruines, todo и прямые папки достопримечательностей
            const possibleSightDirs = ['ruine', 'ruines', 'todo'];
            
            for (const sightDir of possibleSightDirs) {
                const sightPath = path.join(locationDirectory, sightDir);
                if (fs.existsSync(sightPath) && fs.statSync(sightPath).isDirectory()) {
                    const sightItems = fs.readdirSync(sightPath);
                    
                    const sightDirectories = sightItems.filter(item => {
                        const itemPath = path.join(sightPath, item);
                        return fs.statSync(itemPath).isDirectory();
                    });

                    for (const sightName of sightDirectories) {
                        paths.push({
                            location: location,
                            sightName: sightName
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.log('Could not generate static params for sights:', error);
    }

    return paths;
}

export default SightPage; 