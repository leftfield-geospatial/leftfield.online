# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Leftfield Geospatial'
copyright = '2023, Leftfield Geospatial'
author = 'Leftfield Geospatial'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx.ext.autosectionlabel",
    "sphinx_design"
]

# Make sure the target is unique
templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Auto section label configuration ---------------------------------------------
autosectionlabel_prefix_document = True


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output


# -- Theme specific configuration ---------------------------------------------
# NOTE on pydata_sphinx_theme versions:
# - 0.13.0 does not do navbar_align="center" properly, and makes an unnecessary scrollbar with any LHS sidebar menu
# - 0.12.0 does navbar_align="center" ok-ish, and makes an unnecessary scrollbar with any LHS sidebar menu
# - 0.11.0 makes a neat-looking LHS line (not scrollbar) with any LHS sidebar menu, some param name changes
# - 0.9.0 is used by numpy

html_theme = 'pydata_sphinx_theme'

html_theme_options = {
    "secondary_sidebar_items": [], #["page-toc"], # ["page-toc", "edit-this-page", "sourcelink"],
    "logo": {
        # "image_light": "logo.jpg",
        # "image_dark": "logo.jpg",
        "text": "Leftfield\nGeospatial",
    },
    "navbar_align": "right",
    "show_prev_next": False,
    "search_bar_text": "Search the site...",
    "footer_items": ["copyright", "sphinx-version", "theme-version"],
}

html_static_path = ['_static']
html_css_files = ['leftfield.scss', ]
html_context = {"default_mode": "dark"}

html_sidebars = {
  "**": [] #["search-field.html", "sidebar-nav-bs.html"]
}

