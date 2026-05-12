---
title: "The Case of the Invisible Fault: Repairing BN44-00709A Power Supply"
titleRu: "Дело о невидимом дефекте: ремонт блока питания BN44-00709A"
pubDatetime: 2026-05-08T10:30:00Z
description: "Fixing a Samsung UE40H6230AK with no backlight. Beyond LED replacement to deep board troubleshooting."
descriptionRu: "Ремонт Samsung UE40H6230AK: когда замена подсветки не помогла и пришлось копать БП."
tags: ["repair", "samsung", "electronics", "tv-repair", "diy"]
---

Brought in a Samsung UE40H6230AK. Classic symptoms: sound is there, image can be seen with a flashlight, but the backlight is dead. Standard stuff, or so I thought.

![TV with no backlight, flashlight test](https://i.imgur.com/RxqOvnd.jpeg)

I tore it down, found a burnt-out LED on the strip. Replaced the whole backlight kit (never swap just one LED, it’s a waste of time). Fired it up — silence. Still no light.

![Burnt LED on strip](https://i.imgur.com/9dElc4Y.jpeg)

I started digging into the power board, the **BN44-00709A**. Checked the PIC16F753 controller and components along the power line. The multimeter showed some voltage, but the LED driver refused to start.

![Power board BN44-00709A](https://i.imgur.com/ksh2mkY.jpeg)

The culprit? An invisible cold solder joint near transistors **Q885 and Q886**. Visually, it looked fine, but it created ripples and unstable contact that a simple multimeter couldn't catch. A quick resolder of that area fixed everything instantly.

![Q885/Q886 area highlighted](https://i.imgur.com/aTBZvAI.jpeg)

---

Притащили Samsung UE40H6230AK. Классика: звук есть, картинку видно под фонариком, подсветка в ауте. "Делов на 20 минут", — подумал я. Ага, сейчас.

![Тест фонариком — картинка есть, подсветки нет](https://i.imgur.com/RxqOvnd.jpeg)

Разобрал корыто, нашел перегоревший диод. Заменил подсветку полностью (никогда не меняйте по одному диоду, это работа для мазохистов). Включаю — тишина. Темно, как в танке.

![Сгоревший диод на планке](https://i.imgur.com/9dElc4Y.jpeg)

Полез в блок питания **BN44-00709A**. Питание на контроллер PIC16F753 вроде идет, обвязку по линии перетряхнул, но драйвер не заводится. Мультиметр честно показывает 12 вольт, но по факту там, скорее всего, были дикие пульсации, которые обычным тестером не выловишь — тут нужен осциллограф, но кто же его сразу достает?

![Плата BN44-00709A](https://i.imgur.com/ksh2mkY.jpeg)

Проблема оказалась в "невидимом" непропае. Участок в районе транзисторов **Q885 и Q886** выглядел идеально даже под микроскопом. Но именно там был плохой контакт, из-за которого питание +12В на ЛЕД-драйвер шло "грязным". Стоило всё хорошенько пропаять — подсветка ожила.

![Район Q885 и Q886 — невидимый дефект пайки](https://i.imgur.com/aTBZvAI.jpeg)

**Итог:** Если замена диодов не помогла, не верьте мультиметру на слово. Пульсации из-за холодной пайки — стандартная подлянка в блоках.

Подписывайтесь на мой [Telegram-канал](), там больше реального железа без цензуры.