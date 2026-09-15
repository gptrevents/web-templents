import re
import os
from bs4 import BeautifulSoup

def style_to_object(style_str):
    if not style_str: return "{}"
    styles = []
    for prop in style_str.split(';'):
        if ':' not in prop: continue
        key, val = prop.split(':', 1)
        key = key.strip()
        val = val.strip()
        # camelCase key
        parts = key.split('-')
        key = parts[0] + ''.join(x.title() for x in parts[1:])
        styles.append(f"{key}: '{val}'")
    return "{{ " + ", ".join(styles) + " }}"

def convert_to_jsx(html_filepath, out_filepath, title):
    with open(html_filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extract body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html, flags=re.DOTALL | re.IGNORECASE)
    if not body_match: return
    body_html = body_match.group(1)

    # Remove Next.js script tags
    body_html = re.sub(r'<script.*?>.*?</script>', '', body_html, flags=re.DOTALL)
    # Remove Next.js next-route-announcer
    body_html = re.sub(r'<next-route-announcer>.*?</next-route-announcer>', '', body_html, flags=re.DOTALL)

    # Use BeautifulSoup to format as valid XML/JSX
    soup = BeautifulSoup(body_html, 'html.parser')

    # Convert class to className, for to htmlFor, and styles to objects
    def clean_node(node):
        if hasattr(node, 'attrs'):
            if 'class' in node.attrs:
                node.attrs['className'] = ' '.join(node.attrs['class'])
                del node.attrs['class']
            if 'for' in node.attrs:
                node.attrs['htmlFor'] = node.attrs['for']
                del node.attrs['for']
            if 'style' in node.attrs:
                style_val = node.attrs['style']
                # BeautifulSoup parses style as a string or list
                if isinstance(style_val, list):
                    style_val = ' '.join(style_val)
                # We will handle style string replacement later via regex since BS4 output is string
            # Handle Next.js image paths
            if 'src' in node.attrs and isinstance(node.attrs['src'], str):
                if node.attrs['src'].startswith('../../_next/'):
                    node.attrs['src'] = node.attrs['src'].replace('../../_next/', '/_next/')
            if 'srcset' in node.attrs and isinstance(node.attrs['srcset'], str):
                node.attrs['srcset'] = node.attrs['srcset'].replace('../../_next/', '/_next/')
            
            for child in node.children:
                clean_node(child)

    clean_node(soup)

    jsx_str = soup.decode(formatter="html")

    # Fix inline styles manually via regex
    def repl_style(m):
        return f"style={style_to_object(m.group(1))}"
    jsx_str = re.sub(r'style="([^"]*)"', repl_style, jsx_str)
    
    # Fix stroke-width, stroke-linecap etc
    jsx_str = re.sub(r'stroke-width=', 'strokeWidth=', jsx_str)
    jsx_str = re.sub(r'stroke-linecap=', 'strokeLinecap=', jsx_str)
    jsx_str = re.sub(r'stroke-linejoin=', 'strokeLinejoin=', jsx_str)
    jsx_str = re.sub(r'fill-rule=', 'fillRule=', jsx_str)
    jsx_str = re.sub(r'clip-rule=', 'clipRule=', jsx_str)
    jsx_str = re.sub(r'viewbox=', 'viewBox=', jsx_str)
    
    # Fix empty elements to be self-closing
    jsx_str = re.sub(r'<img([^>]*?)>', r'<img\1 />', jsx_str)
    jsx_str = re.sub(r'<br([^>]*?)>', r'<br\1 />', jsx_str)
    jsx_str = re.sub(r'<hr([^>]*?)>', r'<hr\1 />', jsx_str)
    jsx_str = re.sub(r'<path([^>]*?)>', r'<path\1 />', jsx_str)
    jsx_str = re.sub(r'<circle([^>]*?)>', r'<circle\1 />', jsx_str)
    
    # Double check no unclosed imgs due to BS4
    jsx_str = jsx_str.replace(' />></img />', ' />').replace('></img />', ' />')

    # Basic Framer Motion Wrapper Component
    component_code = f"""
'use client';

import React, {{ useState, useEffect }} from 'react';
import {{ motion, AnimatePresence }} from 'framer-motion';

export default function TemplatePage() {{
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {{
    // Extract dynamic CSS from the original Next.js head if needed
    require('@/app/globals.css');
  }}, []);

  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-[#fdefc8] text-slate-800">
      {{/* Inject the raw converted HTML */}}
      <div dangerouslySetInnerHTML={{{{ __html: `{jsx_str.replace('`', '\\`').replace('$', '\\$')}` }}}} />
    </main>
  );
}}
"""
    os.makedirs(os.path.dirname(out_filepath), exist_ok=True)
    with open(out_filepath, 'w', encoding='utf-8') as f:
        f.write(component_code)

convert_to_jsx('legacy-static/invitation/traditional-invitation/index.html', 'src/app/invitation/traditional-invitation/page.tsx', 'Traditional Invitation')
convert_to_jsx('legacy-static/invitation/vijay-rashmika-wedding-invitation/index.html', 'src/app/invitation/vijay-rashmika-wedding-invitation/page.tsx', 'Vijay Rashmika')
print("Converted HTML to Next.js JSX components successfully!")
