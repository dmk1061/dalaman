import requests

url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF1mWFiwAdpl0iUde99x2zwAKbOLl9ybSAmYv0nCdAz4Klfre-6g7awaHEegqqr-TQo2UeNsko4juTA1ovABHnk7DhduZLu4f4xmMJiU6qTNpDyyMHWCzLlRaGNuPzkNk5ceEtwu5ufthh5SdBvwM6PIce82QTQ"

try:
    r = requests.get(url, allow_redirects=True, timeout=10)
    print(f"Dinesh URL: {r.url}")
except Exception as e:
    print(f"Failed: {e}")
