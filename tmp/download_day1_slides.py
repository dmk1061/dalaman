import requests
import os

base_url_2048 = "https://image.slidesharecdn.com/2026day1-introductiontoagentsvibecoding-googleaiagentscourse-260625213217-8f5d43ff/75/2026-Day-1-Introduction-to-Agents-Vibe-Coding-Google-AI-Agents-Course-pptx-{}-2048.jpg"
base_url_1024 = "https://image.slidesharecdn.com/2026day1-introductiontoagentsvibecoding-googleaiagentscourse-260625213217-8f5d43ff/75/2026-Day-1-Introduction-to-Agents-Vibe-Coding-Google-AI-Agents-Course-pptx-{}-1024.jpg"

output_dir = r"C:\Users\Dimok\.gemini\antigravity\brain\8a98a430-4906-474f-8df6-7c57b2d191c6\scratch\slides_day1"
os.makedirs(output_dir, exist_ok=True)

downloaded = []

for slide_num in range(1, 40):
    url = base_url_1024.format(slide_num)
    r = requests.head(url)
    if r.status_code == 200:
        r_file = requests.get(url)
        file_path = os.path.join(output_dir, f"slide_{slide_num}.jpg")
        with open(file_path, "wb") as f:
            f.write(r_file.content)
        print(f"Downloaded slide {slide_num}: {file_path}")
        downloaded.append(file_path)
    else:
        url_2048 = base_url_2048.format(slide_num)
        r_2048 = requests.head(url_2048)
        if r_2048.status_code == 200:
            r_file = requests.get(url_2048)
            file_path = os.path.join(output_dir, f"slide_{slide_num}.jpg")
            with open(file_path, "wb") as f:
                f.write(r_file.content)
            print(f"Downloaded slide {slide_num} (2048px): {file_path}")
            downloaded.append(file_path)
        else:
            print(f"Slide {slide_num} not found. Stopping.")
            break

print(f"Total Day 1 slides downloaded: {len(downloaded)}")
