import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = path.join(process.cwd(), 'content', ...params.path);
    
    // Проверяем, что файл существует
    if (!fs.existsSync(imagePath)) {
      return new NextResponse('Изображение не найдено', { status: 404 });
    }

    // Читаем файл
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Определяем MIME тип по расширению файла
    const ext = path.extname(imagePath).toLowerCase();
    let mimeType = 'image/jpeg';
    
    switch (ext) {
      case '.png':
        mimeType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        mimeType = 'image/jpeg';
        break;
      case '.webp':
        mimeType = 'image/webp';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000', // Кешируем на год
      },
    });
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
  }
} 