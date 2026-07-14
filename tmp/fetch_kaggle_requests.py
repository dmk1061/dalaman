import requests
import re

url = "https://www.kaggle.com/whitepaper-vibe-coding-agent-security-and-evaluation"
cookies = {
    "KA_SESSION_ID": "52da48833ce4ba12c3bd17d5ca8fe237"
}
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
}

try:
    print("Sending request to Kaggle with cookies...")
    r = requests.get(url, cookies=cookies, headers=headers, timeout=15)
    print(f"Status code: {r.status_code}")
    print(f"Response length: {len(r.text)}")
    
    html = r.text
    
    with open("tmp/kaggle_requests_page.html", "w", encoding="utf-8") as f:
        f.write(html)
        
    # Ищем ссылки на Google Drive или PDF
    drive_links = re.findall(r'https?://[^\s"\'>]*drive\.google\.com[^\s"\'>]*', html)
    docs_links = re.findall(r'https?://[^\s"\'>]*docs\.google\.com[^\s"\'>]*', html)
    pdf_links = re.findall(r'https?://[^\s"\'>]*\.pdf[^\s"\'>]*', html)
    
    print("Found Drive links:", list(set(drive_links)))
    print("Found Docs links:", list(set(docs_links)))
    print("Found PDF links:", list(set(pdf_links)))
    
    # Ищем любые вхождения слова "drive" или "google" в JSON-строках или скриптах
    for line in html.split("\n"):
        if "drive.google" in line or "docs.google" in line or "whitepaper" in line:
            print(line[:300])
            
except Exception as e:
    print(f"Error: {e}")
