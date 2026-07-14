import json

transcript_path = r"C:\Users\Dimok\.gemini\antigravity\brain\418b23de-27dd-4bf4-b7f0-e0a23d5f68e1\.system_generated\logs\transcript.jsonl"

found = []
try:
    with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            data = json.loads(line)
            # Ищем куку или упоминание KA_SESSION_ID
            if "6915b33a9ce34b502577b4b65bc51cbf" in line or "ka_session_id" in line.lower():
                found.append((data.get("step_index"), data.get("type"), data.get("source")))
except Exception as e:
    print("Error:", e)

print("Found steps:", found)
