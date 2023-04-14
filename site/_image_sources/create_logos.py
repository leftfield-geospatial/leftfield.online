"""
Convert logo svgs to png image formats using Inkscape.
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
convert_to_png = False

if convert_to_png:
    inkscape_path = r'C:\Program Files\Inkscape\bin\inkscape.exe'
    params = ['--export-dpi=96']

    for svg_path in svg_paths:
        out_file = svg_path.stem + '.png'
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
else:
    for svg_path in svg_paths:
        dest_path = out_dir.joinpath(svg_path.name)
        if dest_path.exists():
            os.remove(dest_path)
        shutil.copy(svg_path, dest_path)
        assert dest_path.exists()
