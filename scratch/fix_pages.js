const fs = require('fs');
const path = require('path');

function cleanJsx(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find dangerouslySetInnerHTML
    const match = content.match(/return\s*\(\s*<div dangerouslySetInnerHTML=\{\{\s*__html:\s*`([\s\S]*?)`\s*\}\}\s*\/>\s*\);/);
    if (!match) {
        console.log('No dangerouslySetInnerHTML match found in', filePath);
        return;
    }

    let html = match[1];

    // Remove script block at end of html string if present
    html = html.replace(/<script>[\s\S]*?<\/script>/g, '');

    // Remove react comment markers
    html = html.replace(/<!--\$-->/g, '');
    html = html.replace(/<!--\/\$-->/g, '');
    html = html.replace(/<!--\s*-->/g, '');

    // Fix image paths
    html = html.replace(/src="images\//g, 'src="/images/');
    html = html.replace(/src="media\//g, 'src="/media/');

    // Remove srcset attributes that point to missing images
    html = html.replace(/\s+srcset="[^"]*"/g, '');

    // Fix boolean/jsx attributes
    html = html.replace(/\s+disableremoteplayback=""/g, ' disableRemotePlayback');
    html = html.replace(/\s+muted=""/g, ' muted');
    html = html.replace(/\s+playsinline=""/g, ' playsInline');
    html = html.replace(/\s+webkit-playsinline="true"/g, ' webkit-playsinline="true"');
    html = html.replace(/\s+novalidate=""/g, ' noValidate');
    html = html.replace(/\s+allowfullscreen=""/g, ' allowFullScreen');
    html = html.replace(/\s+preserveaspectratio="/g, ' preserveAspectRatio="');
    html = html.replace(/\s+referrerpolicy="/g, ' referrerPolicy="');

    // Remove leading hidden div if present
    html = html.replace(/^<div hidden=""><\/div>/, '');

    const newReturn = `return (\n    ${html.trim()}\n  );`;
    content = content.replace(/return\s*\(\s*<div dangerouslySetInnerHTML=\{\{\s*__html:\s*`[\s\S]*?`\s*\}\}\s*\/>\s*\);/, newReturn);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated', filePath);
}

const file1 = path.join(__dirname, '../src/app/invitation/vijay-rashmika-wedding-invitation/page.tsx');
const file2 = path.join(__dirname, '../src/app/invitation/traditional-invitation/page.tsx');

cleanJsx(file1);
cleanJsx(file2);
