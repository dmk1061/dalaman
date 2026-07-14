import json

transcript_path = r"C:\Users\Dimok\.gemini\antigravity\brain\418b23de-27dd-4bf4-b7f0-e0a23d5f68e1\.system_generated\logs\transcript.jsonl"
output_steps_path = "tmp/target_steps.txt"

steps = []

try:
    with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            data = json.loads(line)
            step_idx = data.get("step_index")
            # Читаем шаги с 351 по 380
            if 351 <= step_idx <= 380:
                steps.append(json.dumps(data, indent=2, ensure_ascii=False))
except Exception as e:
    steps.append(f"Error: {e}")

with open(output_steps_path, "w", encoding="utf-8") as out:
    out.write("\n\n" + "="*80 + "\n\n".join(steps))

print(f"Saved steps to {output_steps_path}.")
