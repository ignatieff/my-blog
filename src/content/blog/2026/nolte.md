---
title: "Why 4G Shutdowns Won't Stop Drones (And Why They Do It Anyway)"
titleRu: "Почему отключение 4G не сбивает дроны (и зачем это на самом деле нужно)"
pubDatetime: 2026-05-07T13:00:00Z
description: "A technical look at why mobile internet blackouts are ineffective against military UAVs and the real damage caused by EW."
descriptionRu: "Технический разбор: почему мобильный интернет не поможет против военных БПЛА и какой реальный вред наносит РЭБ."
tags: ["tech", "ew", "drones", "self-hosted", "electronics"]
---

<div data-i18n-block="en">

Hi there. Another "digital detox" drill? While I was poking at an old OLED power supply and trying to fix my crashed Home Assistant, the city lost 4G again. They call it "drone protection." As an engineer who spent half his life with a soldering iron and an oscilloscope, I’ll be blunt: it’s like trying to stop a bulldozer by turning off the neighborhood Wi-Fi.

Let's look at the facts, minus the PR fluff.

### Why 4G Isn't a "Stop" Button for UAVs
If anyone thinks a military drone flies via Google Maps and an MTS SIM card—I have bad news. Serious "birds" (like the long-range fixed-wing types) use:
*   **Inertial Navigation (IMU):** Gyroscopes and accelerometers. The drone doesn't need the outside world; it just knows its speed and heading.
*   **Satellite Guidance:** Chips that eat GPS, GLONASS, and BeiDou directly from the sky. Cell towers are irrelevant here.

**So why shut it down?**
1.  **Blocking BDA (Battle Damage Assessment):** The most logical reason. They don't want us uploading strike videos to Telegram five seconds later. For the enemy, that's free fire correction. No internet means no real-time feedback.
2.  **Fighting "Junk":** Some drones built on consumer modules actually use LTE for video. Turning off 4G makes these specific ones "blind."

![Cell tower against the sky](https://img.magnific.com/premium-photo/black-white-photo-cell-tower-against-sky-modern-technologies_896686-19.jpg)

### EW and GPS Spoofing: Why You’re "At the Airport"
When mobile data dies, that’s one thing. It’s worse when "spoofing" kicks in. An Electronic Warfare (EW) unit generates a GPS signal stronger than the real one. Your phone (and the drone) jumps onto it and believes it's 200km away in the middle of a field.

**The catch?**
Modern drones have learned to bypass this. They use anti-spoofing antennas (like "Kometa") that ignore signals coming from the ground and only listen to the sky. Result: the drone keeps flying, but you can’t call a taxi because your navigator lost its mind.

### Real Life Consequences
For us—techies and regular folks—this isn't just an "inconvenience." It’s a risk.
*   **Medicine:** Glucose monitors for diabetic kids rely on the cloud. No network means parents can't see critical sugar levels. That’s terrifying.
*   **Finance:** ATMs and store terminals run on these same channels. Good luck buying bread with just a card when the signal is dead.
*   **Logistics:** Ambulances circling blocks because the navigator says they’re at "Sheremetyevo Airport"—that’s the price of these measures.

### My Verdict
Does it help? Partially—against hobbyist tech and for "info silence." Does it protect 100%? No. Military tech is always a step ahead of consumer restrictions.

I spent three hours yesterday fixing a script because external APIs dropped and I forgot my local backup. Don't be like me—keep everything self-hosted and have some cash on hand.

</div>

<div data-i18n-block="ru" style="display:none">

Привет. Снова "учения" по цифровому детоксу? Пока я ковырял блок питания от старого OLED и пытался поднять упавший Home Assistant, город в очередной раз остался без 4G. Говорят — "защита от дронов". Как инженер, который полжизни провел с паяльником и осциллографом, скажу прямо: это как пытаться остановить бульдозер, выключив в квартале вай-фай.

Разберем по фактам, без рекламной шелухи.

### Почему 4G — это не кнопка "Стоп" для БПЛА
Если кто-то думает, что военный дрон летит по Google-картам через симку МТС — у меня для вас плохие новости. Серьезные "птички" (дальнобойные самолетные типы) используют:
*   **Инерциальную навигацию (IMU):** Гироскопы и акселерометры. Дрону вообще не нужна связь с внешним миром, он просто знает, куда и с какой скоростью он повернул.
*   **Спутниковое наведение:** Чипы, которые кушают GPS, ГЛОНАСС и BeiDou напрямую со спутников. Базовые станции сотовой связи тут сбоку-припеку.

**Зачем тогда выключать?**
1.  **Блокировка BDA (Battle Damage Assessment):** Самая логичная причина — чтобы мы не выкладывали видео прилетов в Telegram через пять секунд. Для противника это бесплатная корректировка огня. Нет интернета — нет видео в реальном времени.
2.  **Борьба с "кустарщиной":** Есть дроны на базе гражданских модулей, которые реально используют LTE для передачи картинки оператору. Отключение 4G превращает их в "слепых котят".

![Вышка связи на фоне неба](https://img.magnific.com/premium-photo/black-white-photo-cell-tower-against-sky-modern-technologies_896686-19.jpg)

### РЭБ и GPS-спуфинг: почему ты "в аэропорту"
Когда мобильный интернет пропадает — это полбеды. Хуже, когда включается "спуфинг". Это когда наземная установка РЭБ (радиоэлектронной борьбы) генерирует сигнал GPS, который мощнее настоящего спутникового. Ваш телефон (и дрон) "прыгает" на него и начинает верить, что он находится, например, в Шереметьево или Пулково.

**В чем подвох?**
Современные военные дроны уже научились это обходить. У них стоят анти-спуфинг антенны (типа "Кометы"), которые отсекают сигнал, идущий снизу, и слушают только небо. В итоге: дрон летит дальше, а вы не можете вызвать такси или найти дорогу домой.

### Реальный вред для жизни
Для нас это не просто "неудобство", а реальные риски:
*   **Медицина:** Системы мониторинга глюкозы у детей с диабетом завязаны на облака. Нет сети — родители не видят критический сахар. Это страшно.
*   **Финансы:** Банкоматы и терминалы в магазинах работают через те же каналы связи. Попробуй купи хлеба, когда у тебя только карта, а связь "легла".
*   **Логистика:** Скорая, которая кружит по дворам, потому что навигатор сошел с ума — это цена таких мер.

### Мой вердикт
Помогает ли это? Частично — против простых дронов и для "информационной тишины". Защищает ли на 100%? Нет. Военные технологии всегда на шаг впереди бытовых ограничений.

Я вчера три часа правил скрипт, потому что внешние API отвалились, а я затупил и забыл про локальный бэкап. Не будьте как я — делайте всё self-hosted и держите в заначке немного налички.

Пишите, у кого что "отвалилось" в последний раз. [Обсудим](https://t.me/ignxblog)

</div>