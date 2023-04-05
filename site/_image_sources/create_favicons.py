"""
A script for converting icon svg to various favicon formats.
"""
import os
import subprocess
import shutil
from pathlib import Path

root_path = Path('.').absolute()
inkscape_path = r'C:\Program Files\Inkscape\bin\inkscape.exe'
src_dir = root_path.joinpath('site/_image_sources')
out_dir = root_path.joinpath('site/_static/favicons')
svg_path = src_dir.joinpath('leftfield-icon.svg')

# convert source svg to various png's
out_dict = {
    'favicon-16x16.png': ['--export-width=16', '--actions=select:leaves;delete'],
    'favicon-32x32.png': ['--export-width=32', '--actions=select:leaves;delete'],
    'favicon-64x64.png': ['--export-width=64', '--actions=select:leaves;delete'],
    # 'favicon.ico': ['--export-width=32'],
    'android-chrome-192x192.png': ['--export-width=192'],
    'apple-touch-icon.png': ['--export-width=180', '--export-background=#ffffffff'],
    'mstile-150x150.png': ['--export-width=150'],
}

for out_file, params in out_dict.items():
    print(f'Creating {out_file}')
    out_path = out_dir.joinpath(out_file)
    if out_path.exists():
        os.remove(out_path)
    params.append(f'--export-filename={str(out_path)}')
    p = subprocess.run(
        ['inkscape', str(svg_path), *params],
        executable=inkscape_path, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True
    )
    if (p.returncode != 0) or (not out_path.exists()):
        raise Exception(p.stderr)
    if len(p.stdout) > 0:
        print(p.stdout)

# copy svgs to favicons dir
copy_dict = {
    'leftfield-icon.svg': 'favicon.svg',
    'leftfield-bw-icon.svg': 'safari-pinned-tab.svg',
}

for src_file, dest_file in copy_dict.items():
    src_path = src_dir.joinpath(src_file)
    dest_path = out_dir.joinpath(dest_file)
    if dest_path.exists():
        os.remove(dest_path)
    shutil.copy(src_path, dest_path)
    assert dest_path.exists()


# path-simplify
# select-clear
# select-by-id
# delete
