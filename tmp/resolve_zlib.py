import requests

url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFCe9zagQ4ua9NhXdxMsBZyMckqEzzB_NW5NcQuGxObTBREuCe6gM_yBRWWHPszoIER9SzRwm1GuOoQoqWhMrIAILgzFLG9Us35ktBQu00z4ogl3zyUCjfVTlivk6sF_VYd6yPOduDfyAVt75-8B04_39wTguFMCyM1Z4qL63eZ3C_Zm45nGGps4eVo3O0="

try:
    r = requests.get(url, allow_redirects=True, timeout=10)
    print(f"Z-Lib URL: {r.url}")
except Exception as e:
    print(f"Failed: {e}")
