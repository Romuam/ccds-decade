import re

with open('index.html', 'r') as f:
    content = f.read()

# Fix ev-2018-5: remove extra closing brace and quotes from keys
pattern1 = r"'ev-2018-5': \{ title: 'Trump: Year One', 'date': 'January 19, 2018', 'type': 'conference', 'speakers': 1, 'keywords': 'trump: year one', 'desc': 'Co-organized by CERSA \(Paris 2\) and CCDS \(AUP\)\.' \}\},"
replacement1 = "  'ev-2018-5': { title: 'Trump: Year One', date: 'January 19, 2018', type: 'conference', speakers: 1, keywords: 'trump: year one', desc: 'Co-organized by CERSA (Paris 2) and CCDS (AUP).' },"
content = re.sub(pattern1, replacement1, content)

# Check for ev-2016-9 line
lines = content.split('\n')
for i, line in enumerate(lines):
    if "'ev-2016-9':" in line and '}},' in line:
        lines[i] = "  'ev-2016-9': { title: 'Civic Jazz: A Conversation on American Music & Democracy — The Launch of the Center', date: 'October 23, 2015', type: 'conference', speakers: 1, keywords: 'civic jazz: a conversation', desc: 'Speakers: Gregory Clark (President, Rhetoric Society of America; author of Civic Jazz) and Marcus Roberts (Marcus Robert' },"

content = '\n'.join(lines)

with open('index.html', 'w') as f:
    f.write(content)

print("✓ Fixed syntax errors")
