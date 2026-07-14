import requests

urls = [
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgj9RSR518uzVVuLfTSwgptJWl5IojhxAcru2erQ3AI9cK20SlRiCR3Ivr2eetJHq9VQefIntJF65BPRep-rgQdJ7mdcasJz5byB2H1ARotjVw8cteozuPHMVNYiF3LXAB7X8i7ctEWGEdbMQqIc7qH136_z9AC9O3oGaroG6ib8T-KYy-O-RaOAVqUH88qpUBB6xJrT2PVlR1_6n081hjb_KEdEjfNe8=",
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRn7MPG-yltZuRSHyBIHkXOx18zvIJ7IKxseiZLEY0VKf439LnwfaDIey1zomhV_Bj5qjrESMihdLVpcrPG8UjTPEc-XdiBHHtv98T3Nwuv6gj3hAQVdaiKd5DkkK32eb157uIGYuM"
]

for i, url in enumerate(urls):
    try:
        r = requests.get(url, allow_redirects=True, timeout=10)
        print(f"URL {i}: {r.url}")
    except Exception as e:
        print(f"URL {i} failed: {e}")
