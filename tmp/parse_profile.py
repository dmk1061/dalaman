import requests
import re

url = "https://www.slideshare.net/vsivakumarmca1"
headers = {
    "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
}

r = requests.get(url, headers=headers)
html = r.text

with open("tmp/profile.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Saved tmp/profile.html.")

# Поищем все вхождения подстроки slideshow или /slideshow или slideshare.net
matches = re.findall(r'https?://[^\s"\'>]+slideshow[^\s"\'>]+', html)
matches = list(set(matches))
print(f"Found {len(matches)} links with 'slideshow' keyword:")
for m in matches:
    print(m)
