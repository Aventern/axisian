import base64

with open("IMG_5029.jpg", "rb") as image_file:
    base64_string = base64.b64encode(image_file.read()).decode('utf-8')

# Base64エンコードされた文字列を表示
print(base64_string)
