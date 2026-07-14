import json

transcript_path = r"C:\Users\Dimok\.gemini\antigravity\brain\418b23de-27dd-4bf4-b7f0-e0a23d5f68e1\.system_generated\logs\transcript.jsonl"
output_flow_path = "tmp/conversation_flow.txt"

flow = []

try:
    with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            data = json.loads(line)
            source = data.get("source")
            step_type = data.get("type")
            content = data.get("content", "")
            
            if step_type == "USER_INPUT":
                flow.append(f"=== USER INPUT ===\n{content}\n")
            elif step_type == "PLANNER_RESPONSE" and content:
                # Ограничим длину ответа, чтобы не раздувать файл
                flow.append(f"=== MODEL RESPONSE ===\n{content[:1000]}...\n")
except Exception as e:
    flow.append(f"Error reading transcript: {e}")

with open(output_flow_path, "w", encoding="utf-8") as out:
    out.write("\n".join(flow))

print(f"Saved conversation flow to {output_flow_path}.")
