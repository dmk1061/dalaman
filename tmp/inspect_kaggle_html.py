with open("tmp/kaggle_auth_page.html", "r", encoding="utf-8") as f:
    html = f.read()

print(f"HTML length: {len(html)}")

# Ищем заголовок страницы
import re
title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
if title:
    print("Page Title:", title.group(1))
else:
    print("No title tag found.")

# Ищем подозрительные слова
suspicious = ["captcha", "recaptcha", "cloudflare", "verify", "human", "denied", "forbidden", "robot", "error"]
found_susp = [w for w in suspicious if w in html.lower()]
print("Found suspicious words:", found_susp)

# Напечатаем тело страницы или первые 2000 символов
print("First 1500 chars of HTML:")
print(html[:1500])
