# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information
from datetime import datetime
year = datetime.now().year
year_str = str(year) if (year == 2023) else f'2023-{year}'
project = 'Leftfield Geospatial'
copyright = f'{year_str}, Leftfield Geospatial.  All rights reserved'
author = 'Leftfield Geospatial'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.autosectionlabel',
    'sphinx_design',
    'sphinx_favicon',
]

# Make sure the target is unique
templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Auto section label configuration ---------------------------------------------
autosectionlabel_prefix_document = True


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'pydata_sphinx_theme'
html_title = f'{project}'
html_static_path = ['_static']
html_css_files = ['leftfield.css']
html_context = {'default_mode': 'dark'}
html_favicon = '_static/favicons/favicon.svg'
html_sourcelink_suffix = ""
html_sidebars = {
  '**': []
}
# copy favicon.ico to build root
html_extra_path = ['_static/favicons/favicon.ico', ]
html_copy_source = False
html_show_sourcelink = False
html_permalinks = False

# -- Theme specific configuration ---------------------------------------------
# NOTE on pydata_sphinx_theme versions:
# - 0.13.0 does not do navbar_align='center' properly, and makes an unnecessary scrollbar with any LHS sidebar menu
# - 0.12.0 does navbar_align='center' ok-ish, and makes an unnecessary scrollbar with any LHS sidebar menu
# - 0.11.0 makes a neat-looking LHS line (not scrollbar) with any LHS sidebar menu, some param name changes
# - 0.9.0 is used by numpy
html_theme_options = {
    'secondary_sidebar_items': [],
    'logo': {
        'image_light': 'leftfield-logo_light.webp',
        'image_dark': 'leftfield-logo_dark.webp',
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
            'url': 'https://github.com/dugalh',
            'icon': 'fa-brands fa-github',
            'type': 'fontawesome',
        },
    ]
}


# -- option for the favicon extention ------------------------------------------
# see https://medium.com/swlh/are-you-using-svg-favicons-yet-a-guide-for-modern-browsers-836a6aace3df
# and https://github.com/tcmetzger/sphinx-favicon/blob/main/docs/source/conf.py
favicons = [
    'favicons/favicon.svg',
    'favicons/favicon-16x16.png',
    'favicons/favicon-32x32.png',
    {'rel': 'shortcut icon', 'sizes': 'any', 'href': 'favicons/favicon.ico'},
    {'rel': 'apple-touch-icon', 'href': 'favicons/apple-touch-icon.png',},
    {'rel': 'mask-icon', 'href': 'favicons/safari-pinned-tab.svg', 'color': '#808080'},
    # {'rel': 'manifest', 'href': 'favicons/manifest.json'},
    {'name': 'msapplication-TileColor', 'content': '#ffffff'},
    {'name': 'theme-color', 'content': '#ffffff'},
]
# TODO: test dark light mode works for whole site, not per-page as it is doing locally
# TODO: check figure sizes and readability (preview)
# TODO: check favicons on different browsers (preview)
# TODO: card hover highlight in mobile res
# TODO: apple touch icon need xparent bg see sphinx-favicon & https://github.com/pydata/pydata-sphinx-theme/blob/main/docs/_static/apple-touch-icon.png
# mstile 150x150 has a single colour png with xparent background.  It is prob best to follow the pydata or sphinx-favicon repositories as a standard

# see https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs for inkscape cmd lines to auto generate icons
# e.g. inkscape ./icon.svg --export-width=32 --export-filename="./tmp.png"

# sphinx-favicon conf
# favicons = [
#     # generic icons compatible with most browsers
#     {"href": "favicon-32x32.png"},
#     "favicon-16x16.png",
#     {"rel": "shortcut icon", "sizes": "any", "href": "favicon.ico"},
#     # chrome specific
#     "android-chrome-192x192.png",
#     # apple icons
#     {"rel": "mask-icon", "color": "#2d89ef", "href": "safari-pinned-tab.svg"},
#     {"rel": "apple-touch-icon", "href": "apple-touch-icon.png"},
#     # msapplications
#     {"name": "msapplication-TileColor", "content": "#2d89ef"},
#     {"name": "theme-color", "content": "#ffffff"},
#     "https://raw.githubusercontent.com/tcmetzger/sphinx-favicon/main/docs/source/_static/mstile-150x150.png"
#     # to show it works as well with absolute urls
# ]

# pydata conf
# favicons = [
#     # generic icons compatible with most browsers
#     "favicon-32x32.png",
#     "favicon-16x16.png",
#     {"rel": "shortcut icon", "sizes": "any", "href": "favicon.ico"},
#     # chrome specific
#     "android-chrome-192x192.png",
#     # apple icons
#     {"rel": "mask-icon", "color": "#459db9", "href": "safari-pinned-tab.svg"},
#     {"rel": "apple-touch-icon", "href": "apple-touch-icon.png"},
#     # msapplications
#     {"name": "msapplication-TileColor", "content": "#459db9"},
#     {"name": "theme-color", "content": "#ffffff"},
#     {"name": "msapplication-TileImage", "content": "mstile-150x150.png"},
# ]

# from https://realfavicongenerator.net
# <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
# <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
# <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
# <link rel="manifest" href="/site.webmanifest">
# <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#106ed1">
# <meta name="msapplication-TileColor" content="#2b5797">
# <meta name="theme-color" content="#ffffff">
#

##

