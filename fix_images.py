import re

def fix(filepath, prefix):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix src="image_..."
    content = re.sub(r'src=\\"(image_[a-zA-Z0-9_\-\.]+)\\"', rf'src=\"/invitation/{prefix}/\1\"', content)
    content = re.sub(r'src="(image_[a-zA-Z0-9_\-\.]+)"', rf'src="/invitation/{prefix}/\1"', content)
    
    # Fix srcset="image_..."
    content = re.sub(r'(image_[a-zA-Z0-9_\-\.]+\.(?:png|jpg|webp))', rf'/invitation/{prefix}/\1', content)
    
    # Fix src="fonts/..."
    content = re.sub(r'src=\\"fonts/([a-zA-Z0-9_\-\.]+)\\"', rf'src=\"/invitation/{prefix}/fonts/\1\"', content)
    content = re.sub(r'src="fonts/([a-zA-Z0-9_\-\.]+)"', rf'src="/invitation/{prefix}/fonts/\1"', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix('src/app/invitation/traditional-invitation/page.tsx', 'traditional-invitation')
fix('src/app/invitation/vijay-rashmika-wedding-invitation/page.tsx', 'vijay-rashmika-wedding-invitation')
print("Image paths fixed!")
