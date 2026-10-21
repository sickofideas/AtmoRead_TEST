with open('index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        for p in ['top-header', 'dictCounter', 'quickHelpPlane', 'hub-grid', 'book-svg', 'updateMainButtonLabel', 'bottom-dock', 'pauseResumeBtn', 'btn-panic']:
            if p in line:
                print(f"{i}: {p} -> {line.strip()[:100]}")
                break
