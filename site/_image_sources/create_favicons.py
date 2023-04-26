"""
Convert icon svg to various favicon formats using Inkscape.
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
    # 'favicon.ico': ['--export-width=32'], # not supported by Inkscape
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

# export svgs to favicons dir
# exporting rather than copying should optimise the files
export_dict = {
    'leftfield-icon.svg': ['favicon.svg', ['--export-plain-svg', '--export-type=svg', '--vacuum-defs']],
    'leftfield-bw-icon.svg': ['safari-pinned-tab.svg', ['--export-plain-svg', '--export-type=svg', '--vacuum-defs']],
}

for src_file, (out_file, params) in export_dict.items():
    print(f'Creating {out_file}')
    src_path = src_dir.joinpath(src_file)
    out_path = out_dir.joinpath(out_file)
    if out_path.exists():
        os.remove(out_path)
    params.append(f'--export-filename={str(out_path)}')
    p = subprocess.run(
        ['inkscape', str(src_path), *params],
        executable=inkscape_path, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True
    )
    if (p.returncode != 0) or (not out_path.exists()):
        raise Exception(p.stderr)
    if len(p.stdout) > 0:
        print(p.stdout)

if __name__ =='__main__':
    input('Press ENTER to continue...')

# path-simplify
# select-clear
# select-by-id
# delete
