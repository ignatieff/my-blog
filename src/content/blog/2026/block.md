---
title: Life with blocked internet in Russia today
titleRu: Жизнь в России с заблокированным интернетом сегодня
pubDatetime: 2026-05-06T09:30:00+00:00
description: How to actually use VPN, DNS and tunnel protocols when DPI kills your connection every few hours. No empty words.
descriptionRu: Как реально работают VPN, DNS и туннели, когда DPI убивает соединение каждый час. Никакой воды.
tags: ["vpn", "russia", "dpi", "wireguard", "censorship", "self-hosting"]
---

<div data-i18n-block="en">

# Wake up, your config died again

At 3 AM, DPI drops active **WireGuard** sessions. Every. Single. Night.

You don't notice until morning, until you try to open GitHub or Docker Hub.

**Fix:**

```bash
# systemd timer to restart WG tunnel every 4 hours
sudo systemctl edit wireguard-wg0.service

[Service]
Restart=always
RestartSec=120
```

Add cron or timer for `wg-quick down wg0 && wg-quick up wg0` at 04:00.

No, `PersistentKeepalive = 25` doesn't help against deep packet inspection reset. Tried.

---

## What actually works today (mid 2026)

- **WireGuard over TCP tunnel** (udp2raw + wg). UDP gets detected in 15 minutes.
- **VLESS + Reality** (Xray). Hides inside valid TLS like Zoom or Discord traffic.
- **AmneziaWG** — patched WireGuard with fake packet padding.

Dead:

* OpenVPN TCP/1194 — dead since 2024
* Plain Shadowsocks — DPI kills in 5 mins
* Any public VPN list — blocked in 2 hours after publication

---

## Minimal survival setup

Rent a cheap VPS (€3–4/month, Netherlands or Finland). Deploy:

```bash
# Xray install
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install

# Config snippet — VLESS+Reality
{
  "inbounds": [{
    "port": 443,
    "protocol": "vless",
    "settings": {
      "clients": [{"id": "uuid-gen-here"}],
      "decryption": "none"
    },
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "dest": "www.microsoft.com:443",
        "serverNames": ["www.microsoft.com"],
        "privateKey": "your-key"
      }
    }
  }]
}
```

Client: **NekoBox** (Android) or **v2rayN** (Windows). Don't use official VPN apps — blocked by domain.

---

## DNS is separate pain

DoH/DoT over 443 works. But RKN filters public DoH servers (Cloudflare 1.1.1.1 blocked in March 2026).

**Working:**

* Your own `dnscrypt-proxy` on the same VPS
* `adguardhome` with encrypted upstream

```yaml
# adguardhome upstreams
upstream_dns:
  - https://dns.google/dns-query
  - https://cloudflare-dns.com/dns-query
  # fallback to plain DNS over VPN tunnel only
```

Without VPN — local recursive resolver (Unbound). Slow but undetectable.

---

## Rake

**The trap:** You set up WireGuard with MTU 1420, runs fine for 2 days. Then one morning — handshake fails, but `wg show` says connected.

**Why:** Your ISP upgraded DPI to track UDP handshake patterns, not just packets. WireGuard's `Init` message looks the same every time. Machine learning model catches it in 72 hours.

**Fix:** Add jitter. Randomize handshake interval. Use `wg dynamic` patch or switch to AmneziaWG with `Jc = 3, Jmin = 50, Jmax = 1000`.

---

## Don't overcomplicate

One VPS. One protocol (VLESS+Reality). One client.

Don't install 5 fallbacks. Don't use chain proxies. Every extra hop is a new point of failure.

Check your endpoint every morning:

```bash
# curl through tunnel
curl --socks5 127.0.0.1:1080 https://ifconfig.co
```

If timeout — restart tunnel. If handshake but no data — change VPS IP (€0.50–1 for new one).

That's it. Blocks aren't smart. They just replay the same DPI rules every night.

</div>

<div data-i18n-block="ru" style="display:none">

# Проснулся — конфиг опять сдох

В 3 часа ночи DPI рвёт активные **WireGuard**-сессии. Каждую ночь.

Замечаешь только утром, когда не открывается GitHub или Docker Hub.

**Решение:**

```bash
# systemd таймер для перезапуска WG-туннеля каждые 4 часа
sudo systemctl edit wireguard-wg0.service

[Service]
Restart=always
RestartSec=120
```

Плюс cron или таймер на `wg-quick down wg0 && wg-quick up wg0` в 04:00.

`PersistentKeepalive = 25` не помогает против сброса по DPI. Проверено.

---

## Что реально работает сейчас (середина 2026)

- **WireGuard поверх TCP-туннеля** (udp2raw + wg). UDP вычисляют за 15 минут.
- **VLESS + Reality** (Xray). Маскируется под левый TLS, например трафик Zoom или Discord.
- **AmneziaWG** — патченный WireGuard с поддельным заполнением пакетов.

Мёртвое:

* OpenVPN TCP/1194 — умер в 2024
* Простой Shadowsocks — DPI убивает за 5 минут
* Любые публичные списки VPN — блок через 2 часа после публикации

---

## Минимальный выживальный набор

Арендуй дешёвый VPS (€3–4/мес, Нидерланды или Финляндия). Разверни:

```bash
# Установка Xray
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install

# Конфиг — VLESS+Reality
{
  "inbounds": [{
    "port": 443,
    "protocol": "vless",
    "settings": {
      "clients": [{"id": "сгенерируй-uuid"}],
      "decryption": "none"
    },
    "streamSettings": {
      "network": "tcp",
      "security": "reality",
      "realitySettings": {
        "dest": "www.microsoft.com:443",
        "serverNames": ["www.microsoft.com"],
        "privateKey": "твой-ключ"
      }
    }
  }]
}
```

Клиент: **NekoBox** (Android) или **v2rayN** (Windows). Официальные VPN-приложения не ставь — заблокированы по домену.

---

## DNS — отдельная боль

DoH/DoT поверх 443 работает. Но публичные DoH-серверы РКН фильтрует (Cloudflare 1.1.1.1 заблокировали в марте 2026).

**Работает:**

* Свой `dnscrypt-proxy` на том же VPS
* `adguardhome` с зашифрованным апстримом

```yaml
# апстримы для adguardhome
upstream_dns:
  - https://dns.google/dns-query
  - https://cloudflare-dns.com/dns-query
  # фоллбэк на обычный DNS, но только через VPN-туннель
```

Без VPN — локальный рекурсивный резолвер (Unbound). Медленно, но недетектится.

---

## Грабли

**Ловушка:** Настроил WireGuard с MTU 1420, всё летает 2 дня. На третье утро — handshake фейлится, но `wg show` пишет connected.

**Почему:** Провайдер обновил DPI — теперь смотрит на паттерны handshake в UDP, не только на пакеты. Сообщение `Init` у WireGuard всегда одинаковое. ML-модель вычисляет за 72 часа.

**Решение:** Добавить джиттер. Рандомизировать интервалы handshake. Поставить патч `wg dynamic` или перейти на AmneziaWG с параметрами `Jc = 3, Jmin = 50, Jmax = 1000`.

---

## Не усложняй

Один VPS. Один протокол (VLESS+Reality). Один клиент.

Не ставь 5 фоллбэков. Не используй цепочки прокси. Каждый лишний хоп — новая точка отказа.

Проверяй эндпоинт каждое утро:

```bash
# curl через туннель
curl --socks5 127.0.0.1:1080 https://ifconfig.co
```

Если таймаут — перезапускай туннель. Если handshake есть, но данных нет — меняй IP на VPS (€0.50–1 за новый).

Всё. Блокировки не умные. Они просто повторяют одни и те же DPI-правила каждую ночь.

</div>