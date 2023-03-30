Search, composite and download `GEE`_ imagery
---------------------------------------------

I developed the |geedim|_ package as a companion to |homonim|_ for sourcing cloud/shadow-free reference imagery.  Beyond the |homonim|_ context, it is generally useful for searching, compositing and downloading GEE_ (Google Earth Engine) imagery.  It works around the `Earth Engine size limit <https://developers.google.com/earth-engine/apidocs/ee-image-getdownloadurl>`_ by downloading images as separate tiles, then re-assembling into an image file on the client.  Cloud/shadow masking, and cloud/shadow-free compositing are implemented for `selected Landsat and Sentinel-2 collections <https://github.com/dugalh/geedim#cloudshadow-support>`_ using bundled quality data, as well as a method based on `cloud probability <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_CLOUD_PROBABILITY>`_ data for Sentinel-2.  The `command line interface (CLI) <https://geedim.readthedocs.io/en/latest/cli.html>`_ provides access to most of the functionality.  |geedim|_ is distributed as an open source python package.  See the `online documentation <https://geedim.readthedocs.io/en/latest/index.html>`_ for more detail on its usage.

.. _GEE: https://earthengine.google.com/
.. |geedim| replace:: ``geedim``
.. _geedim: https://github.com/dugalh/geedim
.. |homonim| replace:: ``homonim``
.. _homonim: https://github.com/dugalh/homonim
