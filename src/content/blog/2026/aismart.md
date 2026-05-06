---
title: Prompt vs Solder
titleRu: ИИ или Анти развитие
pubDatetime: 2026-05-06T17:10:00+00:00
description: Thoughts on why everything is getting more complex while getting "smarter"
descriptionRu: Мысли о том, почему всё становится сложнее, пока «умнеет»
tags: ["Engineering", "AI", "Self-hosting", "Repair"]
---
<div data-i18n-block="en">

I looked at the calendar — mid-2026. Everyone is shouting about "agentic workflows," but I’m still digging through a pile of burnt TVs and broken Docker containers. The industry is sliding into a weird place.

Take repair, for example. Yesterday I was trying to revive a logic board. It’s not just about the hardware anymore. Everything is locked behind software certificates. Even if you bridge the short circuit (КЗ) and replace the components in the power supply stage (обвязка), the CPU might just refuse to boot because it didn't "handshake" with a cloud server. 

Same with code. I tried to use a local LLM to write a quick parser for my logs. The model hallucinated a library that doesn't exist. I spent an hour debugging a script that was supposed to save me ten minutes. In the end, I deleted the whole "AI-generated" mess and wrote the middleware manually. It's faster, cleaner, and it actually works.

Where are we heading? To a point where everyone can press a "Generate" button, but nobody understands how the current flows through the traces or how packets travel through the network.

**The takeaway:**
Keep your hands dirty. Self-host your services while you still can. If your data and your tools aren't on your local instance, you don't really own them. Use the AI as a fast stack-overflow search, but don't let it drive.

</div>

<div data-i18n-block="ru" style="display:none">

Смотрю на календарь — май 2026-го. Вокруг все кричат про «агентов» и полную автоматизацию, а по факту я всё так же ковыряюсь в горе горелых плат и упавших Docker-контейнеров. Индустрия катится в странную сторону.

Взять тот же ремонт. Вчера пытался оживить майн от свежего ТВ. Теперь проблема не только в железе. Всё залочено на софтовые сертификаты. Даже если ты убрал КЗ и восстановил обвязку питания, проц может просто не завестись, потому что не прошел «рукопожатие» с облаком. 

С кодом — та же история. Решил потестить локальную LLM, чтобы по-быстрому набросать парсер логов. Нейронка нагаллюцинировала либу, которой не существует. Убил час на дебаг скрипта, который должен был сэкономить мне десять минут. В итоге снес весь этот сгенерированный мусор и переписал обвязку руками. Быстрее, чище и реально работает.

Куда всё катится? К тому, что нажать кнопку «Сгенерировать» может любой, а понимать, как течёт ток по дорожкам или пакеты по сети — скоро будет некому.

**Итог:**
Не расслабляйтесь. Сэлф-хостинг — наше всё. Если твои данные и инструменты не на твоём инстансе, они тебе не принадлежат. Юзать нейронки можно как быстрый поиск по Stack Overflow, но давать им руль — плохая затея.

</div>