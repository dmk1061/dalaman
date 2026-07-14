import time
import re
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

url = "https://www.kaggle.com/whitepaper-vibe-coding-agent-security-and-evaluation"
cookie_val = "52da48833ce4ba12c3bd17d5ca8fe237"

drivers = [
    r"C:\Users\Dimok\.wdm\drivers\chromedriver\win64\150.0.7871.46\chromedriver-win32\chromedriver.exe",
    r"C:\Users\Dimok\.wdm\drivers\chromedriver\win64\149.0.7827.155\chromedriver-win32\chromedriver.exe",
    r"C:\Users\Dimok\.wdm\drivers\chromedriver\win64\138.0.7204.183\chromedriver-win32\chromedriver.exe"
]

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

driver = None

for drv_path in drivers:
    if os.path.exists(drv_path):
        print(f"Trying chromedriver at: {drv_path}")
        try:
            service = Service(executable_path=drv_path)
            driver = webdriver.Chrome(service=service, options=chrome_options)
            print("Successfully initialized Chrome Driver!")
            break
        except Exception as e:
            print(f"Failed with this driver: {e}")

if driver is None:
    print("Could not initialize any Chrome Driver. Exiting.")
    exit(1)

try:
    print("Navigating to Kaggle to set domain...")
    driver.get("https://www.kaggle.com")
    time.sleep(3)
    
    print("Adding session cookie...")
    driver.add_cookie({
        "name": "KA_SESSION_ID",
        "value": cookie_val,
        "domain": ".kaggle.com"
    })
    
    print("Navigating to whitepaper page...")
    driver.get(url)
    time.sleep(12) # Ждем загрузки и рендеринга
    
    html = driver.page_source
    print(f"Page source length: {len(html)}")
    
    with open("tmp/kaggle_auth_page.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Saved tmp/kaggle_auth_page.html")
    
    # Ищем ссылки на Google Drive или PDF
    drive_links = re.findall(r'https?://[^\s"\'>]*drive\.google\.com[^\s"\'>]*', html)
    docs_links = re.findall(r'https?://[^\s"\'>]*docs\.google\.com[^\s"\'>]*', html)
    pdf_links = re.findall(r'https?://[^\s"\'>]*\.pdf[^\s"\'>]*', html)
    
    print("Found Drive links:", list(set(drive_links)))
    print("Found Docs links:", list(set(docs_links)))
    print("Found PDF links:", list(set(pdf_links)))
    
    # Попробуем найти ID Google Drive документа в JSON или href
    drive_ids = re.findall(r'/d/([a-zA-Z0-9-_]{25,})', html)
    print("Found Google Drive IDs:", list(set(drive_ids)))
    
    driver.quit()
except Exception as e:
    print(f"Error during execution: {e}")
    if driver:
        driver.quit()
