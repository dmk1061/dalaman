import os

paths = [
    r"d:\Kaggle\1\Agent_Skills_whitepaper_RU.md",
    r"d:\Kaggle\1\Agent_Skills_whitepaper_summary_RU.md",
    r"d:\Kaggle\1\whitepaper.pdf",
    r"C:\Users\Dimok\.gemini\antigravity\brain\418b23de-27dd-4bf4-b7f0-e0a23d5f68e1\scratch\whitepaper.pdf",
    r"C:\Users\Dimok\.gemini\antigravity\brain\418b23de-27dd-4bf4-b7f0-e0a23d5f68e1\scratch\extracted_whitepaper_text.txt"
]

for p in paths:
    exists = os.path.exists(p)
    size = os.path.getsize(p) if exists else 0
    print(f"Path: {p} | Exists: {exists} | Size: {size} bytes")
