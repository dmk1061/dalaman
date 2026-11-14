# Памятка по безопасному переезду Dalaman.info на VPS Contabo (`207.180.202.233`)

> [!IMPORTANT]
> **Правило «Не навреди»:** Все файлы настроены так, чтобы проект `dalaman.info` жил в полностью изолированной директории `/var/www/dalaman.info` и слушал локальный порт **`127.0.0.1:3040`**.
> Существующие на сервере сайты, презентации и их пароли (`auth_basic` в Nginx) **НЕ затрагиваются**.

---

## 1. Первичная настройка на VPS Contabo (`ssh coworker`)

1. Проверить занятые порты и существующие конфиги Nginx (ничего не удаляя!):
   ```bash
   ss -tulpn | grep -E ':(3000|3040|80|443)\b'
   ls -la /etc/nginx/sites-enabled/
   ```
2. Клонировать репозиторий в отдельную папку `/var/www/dalaman.info`:
   ```bash
   sudo mkdir -p /var/www/dalaman.info
   sudo chown -R dimok:dimok /var/www/dalaman.info
   git clone https://github.com/dmk1061/dalaman.git /var/www/dalaman.info
   cd /var/www/dalaman.info
   mkdir -p data
   cp .env.production.example .env.production
   ```
3. Запустить контейнер локально на `127.0.0.1:3040`:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```
4. Скопировать изолированный конфиг Nginx и выпустить SSL после переключения DNS:
   ```bash
   sudo cp /var/www/dalaman.info/deploy/nginx/dalaman.info.conf /etc/nginx/sites-available/dalaman.info.conf
   sudo ln -s /etc/nginx/sites-available/dalaman.info.conf /etc/nginx/sites-enabled/dalaman.info.conf
   sudo nginx -t && sudo systemctl reload nginx
   ```

---

## 2. Настройка DNS у регистратора Spaceship (`dalaman.info`)

В панели управления DNS домена `dalaman.info` на **Spaceship** заменить A-записи Vercel на IP сервера Contabo:
- `A` запись `@` -> `207.180.202.233`
- `A` запись `www` -> `207.180.202.233` (либо `CNAME` `www` -> `dalaman.info`)

После распространения DNS (5–15 минут) выпустить бесплатный автопродляемый SSL-сертификат Let's Encrypt:
```bash
sudo certbot --nginx -d dalaman.info -d www.dalaman.info
```

---

## 3. Автодеплой при `git push` (GitHub Actions)

В настройках репозитория GitHub (`Settings -> Secrets and variables -> Actions`) добавить 3 секрета:
- `CONTABO_HOST`: `207.180.202.233`
- `CONTABO_USER`: `dimok`
- `CONTABO_SSH_KEY`: содержимое приватного ключа `C:/ssh/key`

После этого каждый `git push origin main` будет автоматически обновлять сайт на Contabo за ~1–2 минуты.
