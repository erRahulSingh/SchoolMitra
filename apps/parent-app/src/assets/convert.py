import base64
import os

img_path = r"C:\Users\rahul\.gemini\antigravity-ide\brain\9c1e88a7-dd1f-4ced-8e81-fed443575aa3\media__1786186992361.png"
ts_path = r"d:\SchoolMitra\apps\parent-app\src\assets\parent3dAssets.ts"

if os.path.exists(img_path):
    with open(img_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    content = f"// 3D Generated Image Assets for Parent App\nexport const motherChild3DUri = 'data:image/png;base64,{b64}';\nexport const motherChild3DAltUri = 'data:image/png;base64,{b64}';\nexport const studentRohan3DUri = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80';\n"
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("SUCCESS")
else:
    print("FILE_NOT_FOUND:", img_path)
