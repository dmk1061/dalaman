import os

search_paths = [
    r"C:\Users\Dimok\AppData\Local",
    r"C:\Users\Dimok\.wdm",
    r"C:\Users\Dimok\anaconda3",
    r"d:\Kaggle",
    r"c:\Users\Dimok\IdeaProjects\dalaman"
]

found = []
for path in search_paths:
    if os.path.exists(path):
        for root, dirs, files in os.walk(path):
            # Ограничим глубину поиска в некоторых папках, чтобы не виснуть
            if "node_modules" in root or ".git" in root or "Library" in root:
                continue
            if "chromedriver.exe" in files:
                full_path = os.path.join(root, "chromedriver.exe")
                print(f"Found chromedriver: {full_path}")
                found.append(full_path)

if not found:
    print("chromedriver.exe not found in specified paths.")
