import os
import sys
import io
import json
import glob
import re
from pathlib import Path
from datetime import datetime

# Обеспечиваем корректный вывод UTF-8 в консоль Windows
if hasattr(sys.stdout, 'buffer'):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'buffer'):
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# Пути по умолчанию
APP_DATA_DIR = r"C:\Users\Dimok\.gemini\antigravity\brain"
OUTPUT_DIR = r"c:\Users\Dimok\IdeaProjects\dalaman\knowledge"
OUTPUT_JSON = os.path.join(OUTPUT_DIR, "harvested_history.json")
OUTPUT_MD = os.path.join(OUTPUT_DIR, "harvested_history_summary.md")

def clean_text(text):
    if not text or not isinstance(text, str):
        return ""
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def is_meaningful_message(text):
    if not text:
        return False
    text_clean = text.strip()
    if len(text_clean) < 35:
        ignore_list = ["да", "нет", "ok", "хорошо", "продолжай", "понял", "спасибо", "давай", "сделай", "yes", "no", "go ahead"]
        if text_clean.lower() in ignore_list:
            return False
    return True

def categorize_message(text):
    text_lower = text.lower()
    categories = []
    
    if any(w in text_lower for w in ["дизайн", "tailwind", "барбадос", "barbados", "эстетик", "цвета", "стиль", "ux", "ui", "glassmorphism", "анимац"]):
        categories.append("Design_UX")
    if any(w in text_lower for w in ["контент", "стать", "markdown", "seo", "путеводител", "каш", "дача", "датча", "dalaman", "текст", "турист"]):
        categories.append("Content_SEO")
    if any(w in text_lower for w in ["ai", "ии", "экскурси", "бронирован", "заказ", "кабинет", "помощник", "api", "postgres", "база данных"]):
        categories.append("Business_AI")
    if any(w in text_lower for w in ["запрет", "ошибк", "не надо", "плохо", "медленн", "red flag", "баг", "шаблон"]):
        categories.append("Constraints")
    if any(w in text_lower for w in ["видение", "миссия", "цель", "проект", "зачем", "агент", "управляющий", "автономн"]):
        categories.append("Portal_Vision")
        
    if not categories:
        categories.append("General_Ideas")
    return categories

def harvest():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    pattern = os.path.join(APP_DATA_DIR, "*", ".system_generated", "logs", "transcript.jsonl")
    log_files = glob.glob(pattern)
    
    print(f"[{datetime.now()}] Найдено файлов логов: {len(log_files)}")
    
    harvested_data = {
        "metadata": {
            "scanned_files": len(log_files),
            "timestamp": datetime.now().isoformat(),
        },
        "messages_by_category": {
            "Portal_Vision": [],
            "Design_UX": [],
            "Content_SEO": [],
            "Business_AI": [],
            "Constraints": [],
            "General_Ideas": []
        },
        "all_meaningful_messages": []
    }
    
    total_messages_found = 0
    
    for log_path in log_files:
        conv_id = Path(log_path).parent.parent.parent.name
        try:
            with open(log_path, 'r', encoding='utf-8', errors='ignore') as f:
                for line_idx, line in enumerate(f):
                    if not line.strip():
                        continue
                    try:
                        record = json.loads(line)
                        source = record.get("source", "")
                        step_type = record.get("type", "")
                        content = record.get("content", "")
                        
                        if source == "USER_EXPLICIT" or step_type == "USER_INPUT":
                            cleaned = clean_text(content)
                            if is_meaningful_message(cleaned):
                                categories = categorize_message(cleaned)
                                # Фильтруем, чтобы в базу попадали реплики, релевантные веб-порталу/Dalaman или общим идеям
                                if any(c in categories for c in ["Portal_Vision", "Design_UX", "Content_SEO", "Business_AI"]) or "dalaman" in cleaned.lower() or "путеводител" in cleaned.lower() or "каш" in cleaned.lower():
                                    total_messages_found += 1
                                    msg_obj = {
                                        "conversation_id": conv_id,
                                        "line_index": line_idx,
                                        "text": cleaned,
                                        "categories": categories
                                    }
                                    harvested_data["all_meaningful_messages"].append(msg_obj)
                                    for cat in categories:
                                        if cat in harvested_data["messages_by_category"]:
                                            harvested_data["messages_by_category"][cat].append(msg_obj)
                    except json.JSONDecodeError:
                        continue
        except Exception as e:
            print(f"Ошибка чтения файла {log_path}: {e}")
            
    print(f"[{datetime.now()}] Извлечено содержательных реплик пользователя по Dalaman Guide: {total_messages_found}")
    
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(harvested_data, f, ensure_ascii=False, indent=2)
    print(f"[{datetime.now()}] Сохранен JSON: {OUTPUT_JSON}")
    
    md_lines = [
        "# Историческая выжимка диалогов (Harvested History Summary for Dalaman Guide)",
        f"*Дата сканирования: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*",
        f"*Просканировано диалогов: {len(log_files)} | Найдено релевантных реплик: {total_messages_found}*\n",
        "---"
    ]
    
    cat_names = {
        "Portal_Vision": "🎯 Концепция и миссия портала (Portal Vision)",
        "Design_UX": "🎨 Дизайн, эстетика и UX (Design & UX)",
        "Content_SEO": "📝 Контент-стратегия и SEO (Content & SEO)",
        "Business_AI": "🤖 Бизнес-логика, сервисы и AI-помощник (Business & AI)",
        "Constraints": "🛑 Ограничения и Red Flags (Constraints)",
        "General_Ideas": "📌 Общие идеи по проекту (General Ideas)"
    }
    
    for cat_key, cat_title in cat_names.items():
        msgs = harvested_data["messages_by_category"].get(cat_key, [])
        md_lines.append(f"\n## {cat_title} ({len(msgs)} реплик)\n")
        if not msgs:
            md_lines.append("*В этой категории пока нет ярко выраженных реплик.*\n")
            continue
            
        for m in msgs[-25:]:
            text_preview = m["text"].replace("\n", " ")
            if len(text_preview) > 300:
                text_preview = text_preview[:297] + "..."
            md_lines.append(f"- **[Conv: `{m['conversation_id'][:8]}`]**: {text_preview}")
            
    with open(OUTPUT_MD, 'w', encoding='utf-8') as f:
        f.write("\n".join(md_lines))
    print(f"[{datetime.now()}] Сохранена MD сводка: {OUTPUT_MD}")

if __name__ == "__main__":
    harvest()
