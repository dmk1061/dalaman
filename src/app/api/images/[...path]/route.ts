import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const segments = params?.path;
    if (!Array.isArray(segments) || segments.length === 0) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    for (const seg of segments) {
      if (!seg || seg.includes('..') || seg.includes('\0') || seg.startsWith('.')) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }

    const baseDir = path.resolve(process.cwd(), 'content');
    const resolvedPath = path.resolve(baseDir, ...segments);

    if (!resolvedPath.startsWith(baseDir + path.sep)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
      return new NextResponse('Image Not Found', { status: 404 });
    }

    const imageBuffer = fs.readFileSync(resolvedPath);
    const mimeType = MIME_TYPES[ext] || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
