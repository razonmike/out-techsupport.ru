/**
 * Скачивает изображение из Figma (slide 01.2) в assets/images/slide_01.2.png
 * 
 * Использование:
 * 1. Получите Figma Access Token: Figma → Settings → Account → Personal access tokens
 * 2. Запустите: FIGMA_ACCESS_TOKEN=ваш_токен node scripts/fetch-figma-image.js
 *    Windows PowerShell: $env:FIGMA_ACCESS_TOKEN="ваш_токен"; node scripts/fetch-figma-image.js
 */

const FILE_KEY = '7lelypbdTtDb0f5vkOjPOg';
const NODE_ID = '28:597'; // slide 01.2
const OUTPUT = './assets/images/slide_01.2.png';

async function fetchFigmaImage() {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error('Укажите FIGMA_ACCESS_TOKEN в переменных окружения.');
    console.error('PowerShell: $env:FIGMA_ACCESS_TOKEN="ваш_токен"; node scripts/fetch-figma-image.js');
    process.exit(1);
  }

  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(NODE_ID)}&format=png&scale=2`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token }
  });

  if (!res.ok) {
    console.error('Ошибка Figma API:', res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();
  const imageUrl = data?.images?.[NODE_ID];
  if (!imageUrl) {
    console.error('Изображение не найдено:', data);
    process.exit(1);
  }

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    console.error('Ошибка загрузки изображения:', imgRes.status);
    process.exit(1);
  }

  const fs = await import('fs');
  const path = await import('path');
  const dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT, Buffer.from(await imgRes.arrayBuffer()));
  console.log('Сохранено:', OUTPUT);
}

fetchFigmaImage().catch(e => { console.error(e); process.exit(1); });
