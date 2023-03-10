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

html_theme = 'pydata_sphinx_theme'
# html_theme = "sphinx_book_theme"
html_static_path = ['_static']

# pygments_style = "sphinx"

# -- Theme specific configuration ---------------------------------------------
html_theme_options = {
    # book theme options
    # "repository_url": "https://github.com/dugalh",  # TODO: make leftfield profile/company
    # "use_repository_button": True,
    "primary_sidebar_end": [],
    "secondary_sidebar_items": [], # ["page-toc", "edit-this-page", "sourcelink"],
    "logo": {
        "image": "_static/logo.jpg",
        "text": "Leftfield\nGeospatial",
    },
    "navbar_align": "content",
    "article_header_start": [], #"navbar-nav"
    "article_header_end": [],
    # from bokeh
    # "navbar_align": "left",
    # "navbar_start": ["navbar-logo"],
    # "navbar_end": ["navbar-icon-links"],
    # "show_nav_level": 2,
    # "show_toc_level": 1,
    # "pygment_light_style": "xcode",
    # "pygment_dark_style": "xcode",
    "show_prev_next": False,
    "announcement": "Here's a <a href='https://pydata.org'>PyData Announcement!</a>",
}

# remove all primary (LHS) sidebars
html_sidebars = {
  "**": ["page-toc"]
}

