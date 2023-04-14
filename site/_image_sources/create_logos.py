"""
Convert svgs to logos using Inkscape.
"""

import os
import subprocess
import shutil
from pathlib import Path

if '__file__' in globals():
    root_path = Path(__file__).absolute().parents[2]
else:
    root_path = Path(os.getcwd())
src_dir = root_path.joinpath('site/_image_sources')
out_dir = root_path.joinpath('site/_static')
svg_paths = [src_dir.joinpath('leftfield-logo_light.svg'), src_dir.joinpath('leftfield-logo_dark.svg')]
inkscape_path = r'C:\Program Files\Inkscape\bin\inkscape.exe'
convert_to_png = False

if convert_to_png:
    params = ['--export-dpi=96']
    ext = '.png'
else:
    # export to svg, converting text to paths so the logo is independent of system fonts
    params = ['--export-text-to-path']
    ext = '.svg'

for svg_path in svg_paths:
    out_file = svg_path.stem + ext
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
