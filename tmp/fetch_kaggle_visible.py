import time
import re
import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

url = "https://www.kaggle.com/whitepaper-vibe-coding-agent-security-and-evaluation"
cookie_val = "52da48833ce4ba12c3bd17d5ca8fe237"

drv_path = r"C:\Users\Dimok\.wdm\drivers\chromedriver\win64\150.0.7871.46\chromedriver-win32\chromedriver.exe"

chrome_options = Options()
# ВАЖНО: НЕ используем headless режим, чтобы Chrome был видимым и не детектировался Cloudflare!
# chrome_options.add_argument("--headless") 

chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1280,800")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)

print("Initializing VISIBLE Chrome Driver...")
service = Service(executable_path=drv_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

# Скрываем присутствие автоматизации
driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
})

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
    
    # Даем больше времени (15 секунд), чтобы пользователь мог увидеть страницу 
    # и страница успела подгрузить iframe с Google Диска
    print("Waiting for page rendering (15s)...")
    time.sleep(15)
    
    html = driver.page_source
    print(f"Page source length: {len(html)}")
    
    # Ищем iframe с Google Drive
    iframe_srcs = re.findall(r'<iframe[^>]*src="([^"]+)"', html)
    print("Found iframes:", iframe_srcs)
    
    drive_id = None
    for src in iframe_srcs:
        if "drive.google.com" in src or "docs.google.com" in src:
            m = re.search(r'/d/([a-zA-Z0-9-_]{25,})', src)
            if m:
                drive_id = m.group(1)
                print(f"Extracted Google Drive ID: {drive_id}")
                break
                
    if not drive_id:
        # Fallback по тексту
        m = re.search(r'drive\.google\.com/file/d/([a-zA-Z0-9-_]{25,})', html)
        if m:
            drive_id = m.group(1)
            print(f"Extracted Google Drive ID via text fallback: {drive_id}")
            
    driver.quit()
    
    if drive_id:
        destination = "tmp/whitepaper_security.pdf"
        print(f"Downloading PDF from Google Drive (ID: {drive_id})...")
        
        URL = "https://docs.google.com/uc?export=download"
        session = requests.Session()
        response = session.get(URL, params={'id': drive_id}, stream=True)
        
        token = None
        for key, value in response.cookies.items():
            if key.startswith('download_warning'):
                token = value
                break
                
        if token:
            response = session.get(URL, params={'id': drive_id, 'confirm': token}, stream=True)
            
        with open(destination, "wb") as f:
            for chunk in response.iter_content(32768):
                if chunk:
                    f.write(chunk)
                    
        print(f"Success! PDF downloaded and saved to: {destination}")
        print(f"File size: {os.path.getsize(destination)} bytes")
    else:
        print("Could not find Google Drive PDF ID on the page. Check if reCAPTCHA was displayed.")
        
except Exception as e:
    print(f"Error occurred: {e}")
    try:
        driver.quit()
    except:
        pass
