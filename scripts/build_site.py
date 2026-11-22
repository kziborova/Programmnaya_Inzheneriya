#!/usr/bin/env python3
"""Build the static demo site using only Python standard library."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'site'
DEST = ROOT / 'dist'

def build():
    if not (SOURCE / 'index.html').exists():
        raise FileNotFoundError('site/index.html not found')
    if DEST.exists():
        shutil.rmtree(DEST)
    shutil.copytree(SOURCE, DEST, ignore=shutil.ignore_patterns(".DS_Store", "._*"))
    if not (DEST / 'data' / 'tutorials.json').exists():
        raise FileNotFoundError('data/tutorials.json not found')
    print('Сборка готова в dist/')

if __name__ == '__main__':
    build()
