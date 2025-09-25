import re

file_paths = [
    r"C:\Users\user\Downloads\ai-recipe-maker\app\search\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\about\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\admin\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\admin\settings\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\admin\users\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\dashboard\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\favorites\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\generate-recipe\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\history\[id]\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\history\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\login\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\onboarding\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\profile\page.tsx",
    r"C:\Users\user\Downloads\ai-recipe-maker\app\signup\page.tsx",
]

for file_path in file_paths:
    with open(file_path, 'r+', encoding='utf-8') as f:
        content = f.read()

        # Add import statement
        if '@/components/copyright' not in content:
            content = "import { Copyright } from '@/components/copyright';\n" + content

        # Add Copyright component
        if '</>' in content:
            content = content.replace('</>', '      <Copyright />\n    </>')
        else:
            content += '\n<Copyright />'

        f.seek(0)
        f.write(content)
        f.truncate()
