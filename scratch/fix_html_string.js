const fs = require('fs');
const path = require('path');

function fixHtmlInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find dangerouslySetInnerHTML string content
    const startMarker = '__html: `';
    const endMarker = '` }} />';
    
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker, startIndex);

    if (startIndex === -1 || endIndex === -1) {
        console.log('Markers not found in', filePath);
        return;
    }

    let rawHtml = content.substring(startIndex + startMarker.length, endIndex);

    // 1. Convert className="..." to class="..."
    rawHtml = rawHtml.replace(/\bclassName=/g, 'class=');

    // 2. Convert JSX style objects like style={{ position: 'absolute', inset: '0' }} to style="position: absolute; inset: 0;"
    rawHtml = rawHtml.replace(/style=\{\{\s*([^}]+)\s*\}\}/g, (match, p1) => {
        // p1 is e.g. position: 'absolute', inset: '0', zIndex: '0', pointerEvents: 'none'
        const pairs = p1.split(',').map(s => s.trim()).filter(Boolean);
        const cssStr = pairs.map(pair => {
            const parts = pair.split(':').map(s => s.trim());
            if (parts.length < 2) return '';
            let key = parts[0].replace(/([A-Z])/g, '-$1').toLowerCase();
            let val = parts.slice(1).join(':').replace(/^['"]|['"]$/g, '');
            return `${key}: ${val};`;
        }).filter(Boolean).join(' ');
        return `style="${cssStr}"`;
    });

    // 3. Fix SVG camelCase attributes to kebab-case
    rawHtml = rawHtml.replace(/\bstrokeLinecap=/g, 'stroke-linecap=');
    rawHtml = rawHtml.replace(/\bstrokeWidth=/g, 'stroke-width=');
    rawHtml = rawHtml.replace(/\bstrokeLinejoin=/g, 'stroke-linejoin=');
    rawHtml = rawHtml.replace(/\bviewBox=/g, 'viewBox=');

    // 4. Fix image paths src="images/ to src="/images/
    rawHtml = rawHtml.replace(/src="images\//g, 'src="/images/');
    rawHtml = rawHtml.replace(/src="media\//g, 'src="/media/');

    // 5. Remove problematic srcset attributes pointing to unhosted files
    rawHtml = rawHtml.replace(/\s+srcset="[^"]*"/g, '');

    // Reassemble content
    const newContent = content.substring(0, startIndex + startMarker.length) + rawHtml + content.substring(endIndex);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Fixed HTML string in', filePath);
}

const file1 = path.join(__dirname, '../src/app/invitation/vijay-rashmika-wedding-invitation/page.tsx');
const file2 = path.join(__dirname, '../src/app/invitation/traditional-invitation/page.tsx');

fixHtmlInFile(file1);
fixHtmlInFile(file2);
