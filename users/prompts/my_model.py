import requests

url = 'https://nlp_nuwe.jasonjimenez.app/api_parse'
api_key = '7PzozjCovfYgZHf9hLsRy5DWF9aNeH5c2nwfEJfogjNWdgD2r2Um5DYwJ9P4PADD'

text = """ """
try:
    r = requests.post(
        url,
        json={'text': text},
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        },
        verify=False  # Cambia a True 
    )
    if r.status_code == 200:
        print("Respuesta exitosa:")
        print(r.json())
    else:
        print(f"Error {r.status_code}: {r.text}")
except requests.exceptions.SSLError as ssl_error:
    print("Error de SSL:", ssl_error)
except requests.exceptions.RequestException as req_error:
    print("Error en la solicitud:", req_error)
