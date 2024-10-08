# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information
from pathlib import Path
from datetime import datetime
year = datetime.now().year
year_str = str(year) if (year == 2023) else f'2023-{year}'
project = 'Leftfield Geospatial'
copyright = f'{year_str}, Leftfield Geospatial'
author = 'Leftfield Geospatial'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    # 'sphinx.ext.autosectionlabel',
    'sphinx_design',
    'sphinx_favicon',
]

# Make sure the target is unique
templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Auto section label configuration ---------------------------------------------
# autosectionlabel_prefix_document = True


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'pydata_sphinx_theme'
html_title = f'{project}'
html_static_path = ['_static']
# colour styles must come before no-flex
html_css_files = ['styles/leftfield.css']
# searchtools.js is a theme script that is always incuded, but is specified here to make sure it is 
# listed in the html before browser-support.js, which uses it. 
html_js_files = ['scripts/browser-support.js']
html_context = {'default_mode': 'auto'}  # use the system/browser light/dark theme setting
# html_favicon = '_static/favicons/favicon.svg'
html_sourcelink_suffix = ''
html_sidebars = {
  '**': []
}
# copy favicon.ico to build root
# html_extra_path = ['_static/favicons/favicon.ico', ]
html_copy_source = False
html_show_sourcelink = False
html_permalinks = False


# -- Theme specific configuration ---------------------------------------------
# NOTE on pydata_sphinx_theme versions:
# - 0.13.0 does not do navbar_align='center' properly, and makes an unnecessary scrollbar with any LHS sidebar menu
# - 0.12.0 does navbar_align='center' ok-ish, and makes an unnecessary scrollbar with any LHS sidebar menu.  it renders
# both light and dark theme logos in ie, and does not copy them unless they are in the static dir.
# - 0.11.0 makes a neat-looking LHS line (not scrollbar) with any LHS sidebar menu, some param name changes
# - 0.9.0 is used by numpy
html_theme_options = {
    'secondary_sidebar_items': [],
    'logo': {
        'image_light': 'leftfield-logo_light.svg',
        'image_dark': 'leftfield-logo_dark.svg',
        'alt_text': 'Leftfield Geospatial',
    },
    'navbar_align': 'right',
    'show_prev_next': False,
    'search_bar_text': 'Search the site...',
    # 'footer_items': ['copyright', 'sphinx-version'],  # <= v0.12
    'footer_start': ['copyright', 'sphinx-version'],
    'footer_end': ['theme-version'],
    'icon_links': [
        {
            'name': 'GitHub',
            'url': 'https://github.com/leftfield-geospatial',
            'icon': 'fa-brands fa-github',
            'type': 'fontawesome',
        },
    ],
    'collapse_navigation': True,
    'show_nav_level': 0,
    'navigation_depth': 0,
    # "announcement": "<p>Here's a <a href='https://pydata.org'>PyData Announcement!</a></p>",
}

# -- favicon extension options  ------------------------------------------
# adapted from https://github.com/tcmetzger/sphinx-favicon/blob/main/docs/source/conf.py
favicons = [
    # generic icons compatible with most browsers
    'favicons/favicon-32x32.png',
    'favicons/favicon-16x16.png',
    {'rel': 'shortcut icon', 'sizes': 'any', 'href': 'favicons/favicon.ico'},
    # chrome specific
    'favicons/android-chrome-192x192.png',
    # apple icons
    {'rel': 'mask-icon', 'color': '#808080', 'href': 'favicons/safari-pinned-tab.svg'},
    {'rel': 'apple-touch-icon', 'href': 'favicons/apple-touch-icon.png'},
    # msapplications
    {'name': 'msapplication-TileColor', 'favicons/content': '#2f8cef'},
    {'name': 'theme-color', 'content': '#ffffff'},
    {'name': 'msapplication-TileImage', 'content': 'favicons/mstile-150x150.png'},
]

# -- work around for links which fail on linkcheck ---------------------
# see https://github.com/sphinx-doc/sphinx/issues/10343, https://github.com/sphinx-doc/sphinx/issues/7369 &
# https://github.com/sphinx-doc/sphinx/issues/5051
user_agent = 'Mozilla/5.0 (X11; Linux x86_64; rv:25.0) Gecko/20100101 Firefox/25.0'
linkcheck_ignore = ['https://doi.org/10.1080/01431161.2018.1528404', 'https://ngi.dalrrd.gov.za']

# -- concatenate css files into one  ------------------------------------------
css_paths = [
    '_styles/colours.css', '_styles/custom.css', '_styles/header.css', '_styles/main-content.css',
    '_styles/sidebar.css', '_styles/footer.css'
]
dest_path = Path(html_static_path[0]).joinpath(html_css_files[0]).absolute()
dest_path.parent.mkdir(exist_ok=True)

with dest_path.open(mode='wt') as dest_file:
    for css_path in css_paths:
        css_path = Path(css_path).absolute()
        with css_path.open('rt') as css_file:
            dest_file.write(css_file.read())


# TODO: auto generate ico
# TODO: also sort out sponsorship to me or organisation
# TODO: add a license for data / images
# TODO: think about including portfolio items in drop-down or sidebar sub-menu
