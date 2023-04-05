import os
import subprocess
from pathlib import Path

root_path = Path('.').absolute()
inkscape_path = r'C:\Program Files\Inkscape\bin\inkscape.exe'
svg_file = root_path.joinpath('site/_image_sources/leftfield-icon.svg')
out_dir = root_path.joinpath('temp')
out_dict = {
    'favicon-16x16.png': ['--export-width=16'],
    'favicon-32x32.png': ['--export-width=32'],
    # 'favicon.ico': ['--export-width=32'],
    'android-chrome-192x192.png': ['--export-width=192'],
    'apple-touch-icon.png': ['--export-width=192', '--export-background=#ffffffff'],
    'mstile-150x150.png': ['--export-width=150'],
}

for out_file, params in out_dict.items():
    print(f'Creating {out_file}')
    out_path = out_dir.joinpath(out_file)
    if out_path.exists():
        os.remove(out_path)
    params.append(f'--export-filename={str(out_path)}')
    p = subprocess.run(
        ['inkscape', str(svg_file), *params],
        executable=inkscape_path, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True
    )
    if (p.returncode != 0) or (not out_path.exists()):
        raise Exception(p.stderr)
    if len(p.stdout) > 0:
        print(p.stdout)
