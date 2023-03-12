import requests

url = 'https://jsonplaceholder.typicode.com/users'
response = requests.get(url)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Request failed with status code {response.status_code}")
