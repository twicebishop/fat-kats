import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'menu.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const menu = JSON.parse(fileContents);
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read menu data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    // Basic validation
    if (!data.categories) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Menu updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu data' }, { status: 500 });
  }
}
