import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# ignatieff (@ignxblog)

Личный блог о сетевой безопасности, разработке цифровых помощников, создании контента с помощью нейросетей, ремонте и создании электроники..

## Навигация

- [Обо мне](/about.md)
- [Все записи](/posts.md)
- [RSS](/rss.xml)

## Ссылки

- Telegram: [@ignxblog](https://t.me/ignxblog)
- GitHub: [@ignx-l](https://github.com/ignx-l)
- VK: [ignx](https://vk.com/ignx)`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
