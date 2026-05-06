---
title: From Chaos Logs to Useful Tools
titleRu: От хаотичных логов к полезным инструментам
pubDatetime: 2026-05-06T14:30:00+00:00
description: Ditching rigid docs for a living dev journal that spawns real micro-tools.
descriptionRu: Как я забил на жесткую документацию и завел живой дневник разработки, который рождает микро-утилиты.
tags: ["blogging", "dev-journal", "tooling", "workflow", "selfhosted"]
---

<div data-i18n-block="en">

Memory is volatile. My `/docs` folder became a graveyard for dead ideas. I’d write a perfect spec, then the code would diverge in a week. The docs lied. The code was the only truth, but reading raw commits to remember *why* I built a garbage collector for my downloads folder was pain.

The fix? I stopped writing docs and started writing a **dev journal**. A single `LOG.md` inside the project root. No structure, no templates, just raw stream of consciousness while I pipe `curl` into `jq`.

This naturally evolved into a public blog. But I don't write articles. I publish annotated logs. Here’s the stack and the hard lessons.

## The "Log, Then Blog" Pipeline

My rule: if it takes more than 15 minutes to document, the tooling sucks.

**Source of Truth:** Markdown files in the project repo. No external CMS. I keep it stupid.

**Structure:**
```text
project-root/
├── src/
├── logs/
│   ├── 2026-05-01_async-queue-debug.md
│   └── 2026-05-06_switching-to-sqlite.md
```
*   *Why this works*: The context is literally next to the bug. Future-me can `grep` the log and the source in the same terminal window.

**Translation & Publishing:**
I write in a messy mix of Russian and English. Tech terms stay in English. Always.
I built a tiny Go script (yeah, a wheel-reinventor, I know) that:
1. Parses my Markdown.
2. Wraps English/Russian blocks in `<div>` tags for the i18n switcher.
3. Converts frontmatter to the format Astro needs.

```go
// sanitize.go — keeps tech terms intact regardless of language
func processLine(line string) string {
    // Systemd, Kubernetes, namespaces — never translate
    re := regexp.MustCompile(`(\b(?:systemd|k8s|api|json|yaml|http|sql)\b)`)
    return re.ReplaceAllString(line, `<span class="no-translate">$1</span>`)
}
```
*Doing it yourself means you control the edge cases. Translation APIs choke on `kubectl exec`.*

## Tools I Built Because of the Blog

Writing about problems forces you to solve them properly. No more "it works on my machine" duct tape.

### 1. ClipWipe (Context cleaner)
*Problem:* While writing a post about my clipboard hijacking macOS, I kept pasting API keys into the draft.
*Tool:* A daemon that watches the clipboard and wipes anything matching a regex pattern (AWS keys, JWT tokens) within 5 seconds.
```bash
# Not a joke. Saved me from leaking a PAT twice this month.
clipwipe --patterns "sk-[a-zA-Z0-9]{20,}" --timeout 5
```

### 2. Snippet Vault
*Problem:* I described a complex `jq` transformation in a blog post. Three months later, I needed it again and couldn't find it.
*Tool:* A CLI snippet manager. I type `snip how-to-flatten-json` and it spits out the code directly to stdout so I can pipe it.
```bash
snip flatten-json | pbcopy
# No browser, no mouse, no scrolling through old articles.
```

## The Graveyard of Mistakes

Here’s where the journal becomes a survival tool.

**Grabl: The "Dual Language" DOM Mess**
When I set up the bilingual plugin, I used `style="display:none"` and `style="display:block"` via JavaScript toggle.
*What happened:* Cumulative Layout Shift (CLS) on the Astro static build. The hidden English block would load, then vanish, pushing the content up. A white flash of death.

*The Fix:*
Don't mess with display.
```css
/* Hide without losing layout space */
[data-i18n-block] {
    visibility: visible;
    height: auto;
}
[data-i18n-block][style*="display:none"] {
    visibility: hidden;
    height: 0;
    overflow: hidden;
}
```
And the toggle should be a `MutationObserver`, not a click event relying on React state. Keep it vanilla.

**Grabl: The Git Hook that Killed Productivity**
I wrote a `pre-commit` hook to check for broken links in my markdown. It pinged every external URL.
*Result:* A commit took 47 seconds. I `ctrl+c`'d and just force-pushed. Deleted the hook. Verifying links is a CI pipeline job, not a commit gate.

## The Takeaway

Your blog doesn't need a niche. It needs to be the external hard drive for your brain. If you fixed a cron job at 2 AM, write a markdown file. Don't polish it. Publish the log.

The process naturally makes you write cleaner code because you’re embarrassed to explain the messy parts in public. That’s the point.

</div>

<div data-i18n-block="ru" style="display:none">

Память — нестабильный накопитель. Моя папка `/docs` превратилась в кладбище мертвых идей. Я писал идеальную спецификацию, а через неделю код уходил в сторону. Документация врала. Правдой был только исходник, но читать сырые коммиты, чтобы вспомнить, *зачем* я написал сборщик мусора для папки Downloads — такое себе.

Решение? Я перестал писать документацию и начал вести **dev journal**. Обычный файл `LOG.md` в корне проекта. Никакой структуры, шаблонов, только сырой поток сознания в процессе пайпа `curl` в `jq`.

Позже это переросло в публичный блог. Но я не пишу статьи. Я публикую аннотированные логи. Вот какой стек я собрал и на каких граблях станцевал.

## Пайплайн «Логирование, а затем блог»

Правило простое: если на документирование уходит больше 15 минут — инструментарий дырявый.

**Источник правды:** Markdown-файлы прямо в репозитории проекта. Никаких внешних CMS. Минимализм спасает рассудок.

**Структура:**
```text
project-root/
├── src/
├── logs/
│   ├── 2026-05-01_async-queue-debug.md
│   └── 2026-05-06_switching-to-sqlite.md
```
*   *Почему это работает:* Контекст бага лежит буквально рядом с исходниками. Я могу сделать `grep` по логу и сорцам в одном окне терминала.

**Перевод и публикация:**
Я пишу на жуткой смеси русского и английского. Технические термины — строго на языке оригинала.
Я набросал небольшой скрипт на Go (каюсь, люблю изобретать велосипеды), который:
1. Парит мой Markdown.
2. Оборачивает блоки на разных языках в теги `<div>` для переключателя интернационализации.
3. Конвертирует frontmatter в формат, понятный для Astro.

```go
// sanitize.go — сохраняет тех-термины вне зависимости от языка
func processLine(line string) string {
    // Systemd, Kubernetes, неймспейсы — переводить нельзя
    re := regexp.MustCompile(`(\b(?:systemd|k8s|api|json|yaml|http|sql)\b)`)
    return re.ReplaceAllString(line, `<span class="no-translate">$1</span>`)
}
```
*Самоделки хороши контролем крайних случаев. API переводчиков ломают зубы о `kubectl exec`.*

## Инструменты, рожденные из блога

Описывая проблему, волей-неволей решаешь её правильно. Никаких костылей «на моей машине работает».

### 1. ClipWipe (Чистильщик контекста)
*Проблема:* Пока писал пост о перехвате clipboard в macOS, трижды вставлял API-ключи в черновик.
*Утилита:* Демон, который мониторит буфер обмена и затирает данные, подходящие под regex (AWS-ключи, JWT), в течение 5 секунд.
```bash
# Не шутка. Спасло от утечки PAT дважды за месяц.
clipwipe --patterns "sk-[a-zA-Z0-9]{20,}" --timeout 5
```

### 2. Snippet Vault
*Проблема:* Описал в блоге сложную трансформацию через `jq`. Через три месяца понадобилось снова, а найти не смог.
*Утилита:* Консольный менеджер сниппетов. Вбиваю `snip how-to-flatten-json`, оно выплевывает код прямиком в stdout для пайпа.
```bash
snip flatten-json | pbcopy
# Никакого браузера, мышки, скролла старых постов.
```

## Кладбище ошибок

Вот здесь дневник превращается в инструмент выживания.

**Грабли: Мешанина DOM-элементов**
Когда я настраивал билингвальный плагин, то скрывал блоки через `style="display:none"` с тогглом на чистом JS.
*Итог:* Cumulative Layout Shift (CLS) на статической сборке Astro. Скрытый английский блок подгружался, исчезал, и контент прыгал вверх. Белая вспышка смерти.

*Фикс:*
Никаких игр с `display`.
```css
/* Прячем без потери жизненного пространства */
[data-i18n-block] {
    visibility: visible;
    height: auto;
}
[data-i18n-block][style*="display:none"] {
    visibility: hidden;
    height: 0;
    overflow: hidden;
}
```
Переключение языков — только через `MutationObserver`, без привязки к React-стейтам. Держать разметку чистой.

**Грабли: Git Hook, убивший продуктивность**
Я написал `pre-commit` хук для проверки битых ссылок в markdown. Он стучался на каждый внешний URL.
*Результат:* Коммит длился 47 секунд. Я сделал `ctrl+c` и force push. Хук удалил. Валидация ссылок — задача CI-пайплайна, а не блокировщика коммитов.

## Суть

Вашему блогу не нужна узкая ниша. Он должен быть внешним жестким диском для мозга. Если вы в 2 часа ночи починили cron job, зафиксируйте это в markdown. Не полируйте текст. Опубликуйте лог.

Сам процесс заставляет писать чище, потому что стыдно объяснять публично грязные участки кода. В этом и соль.

</div>