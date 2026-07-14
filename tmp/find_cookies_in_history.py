import os
import re

brain_dir = r"C:\Users\Dimok\.gemini\antigravity\brain"
keywords = ["cookie", "cookies", "kaggle.com", ".pdf"]

matches = []

for folder in os.listdir(brain_dir):
    folder_path = os.path.join(brain_dir, folder)
    if not os.path.isdir(folder_path) or folder == "tempmediaStorage":
        continue
    
    transcript_path = os.path.join(folder_path, ".system_generated", "logs", "transcript.jsonl")
    if os.path.exists(transcript_path):
        try:
            with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
                for line_num, line in enumerate(f, 1):
                    # Ищем строки, где есть cookie и kaggle.com или kaggle
                    if "cookie" in line.lower() and "kaggle" in line.lower():
                        matches.append((folder, line_num, line))
        except Exception as e:
            pass

with open("tmp/found_history.txt", "w", encoding="utf-8") as out:
    out.write(f"Found {len(matches)} potential cookie-related lines:\n\n")
    for folder, line_num, line in matches:
        out.write(f"Conversation: {folder} | Line: {line_num}\n")
        out.write(line + "\n")
        out.write("=" * 80 + "\n")

print(f"Saved {len(matches)} matches to tmp/found_history.txt.")
