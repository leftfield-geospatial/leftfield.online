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
html_css_files = ['styles/custom.css', 'styles/no-flex.css']
html_js_files = ['scripts/webp-support.js']
html_context = {'default_mode': 'auto'}  # use the system/browser light/dark theme setting
# html_favicon = '_static/favicons/favicon.svg'
html_sourcelink_suffix = ""
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
}

# -- option sfor the favicon extention ------------------------------------------
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

# TODO: auto generate ico
# TODO: also sort out sponsorship to me or organisation
# TODO: add a license for data / images
# TODO: IE does not use gap setting from theme flow, so requires css for .nav-link to add padding.  But then new browsers
#  add this padding to the flex gap.  Ideally I should either get IE to use a gap specific to it.  Or zero the gap, and
#  use only padding for all browsers.  This is in navbar-item->navbar-nav.
#  The above applies to section headers and breadcrumbs.
# TODO: Safari is rendering vertically what newer browsers render horizontally e.g. the header section titles and breadcrumbs.
# x TODO: Safari and IE announcement banner coloring
# x TODO: IE does not re-configure layout when it is resized
# x TODO: Safari and IE put underline with header / sidebar hover
# x TODO: browserstack safari 5 does not have the breadcrumb triangle
# TODO: safari 5 sidebar does not go away if you click outside of it, only inside
# TODO: safari renders grid as though it is on low res i.e. one column
# TODO: think about including portfolio items in drop-down or sidebar sub-menu
# TODO: could we auto-generate css with all the var(...)'s evaluated?  Then we wouldn't need all the custom coloring etc code.
#  The problem is it is dynamic i.e. it needs to know the theme at browse time to determine the val of e.g. --pst-*-color
# TODO: change grid layouts for smart phone side view (?)  bear in mind this could expose display: flex issues.
# \\127.0.0.1\c$\Data\Development\Projects\leftfield.online\site\_build\html\index.html
# TODO: note safari seems to start supporting flex properly in macos v 9, but it renders nothing other than the nav bar / header. 
#  Likewise for v10, then it renders in v11 (something is weird with spacing as sidebar sections are on top of each other).
#  webp support only starts in v14 (2020).
#  For iphone, the site looks ok as far back as iphone 5s&6, but safari does not seem to support css var as colors are wrong and no grid borders.
#  The sidebar works and grids display ok though.  Webp support starts round about iphone 8.
#  On Mac the sidebar gets stuck like mine on safari v5, then from v6 is ok.
# TODO: On IE 9, logo is elongated vertically and cropped, there is no webp message, and as header section titles are not on RHS.
#  flex grids render vertically.
#  On IE 10, (windows 7 & 8) everything is as above except that grids start rendering horizontally where they should.  Also the sidebar is transparent.
#  On IE 11, (windows 7 & 8), weirdly the logo is stretched as above.  The rest looks as it does on my local IE 11.
#  On IE 11, (windows 10), the logo displays ok, and the rest is as it is on my pc.
# TODO: Edge is fine back to its first version on win 10.
#  The first version of Edge does not support webp or dark/light themes.  It supports flex and var ok, and the rest is ok.
#  Starting with v18 (2018) it supports webp and dark/light themes.


# TODO: sidebar 0.13.3:
# TODO:
#   // header:
#   bd-header / navbar / bd-navbar
#       ...
#       navbar-item
#           logo
#       navbar-header-items
#           navbar-item
#               navbar-nav (bd-navbar-elements)
#                   nav-item
#                       nav-link
#                           (Portfolio/Profile/Contact)
#               theme switcher
#               navbar-icon-links
#   // sidebar:
#   bd-sidebar-primary bd-sidebar hide-on-wide
#       sidebar-header-items
#           navbar-item
#               navbar-nav
#                   nav-item
#                           (Portfolio/Profile/Contact)
#               theme switcher
#               navbar-icon-links

