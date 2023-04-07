Search, composite and download `GEE`_ imagery
---------------------------------------------

The |geedim|_ package was developed as a companion to |homonim|_ for sourcing cloud/shadow-free reference imagery.  Beyond the |homonim|_ context, it is generally useful for searching, compositing and downloading GEE_ (Google Earth Engine) imagery.  It works around the `Earth Engine size limit <https://developers.google.com/earth-engine/apidocs/ee-image-getdownloadurl>`_ by downloading images as separate tiles, then re-assembling into an image file on the client.  Cloud/shadow masking, and cloud/shadow-free compositing are implemented for `selected Landsat and Sentinel-2 collections <https://geedim.readthedocs.io/en/latest/index.html#cloud-shadow-support>`_ using bundled quality data, as well as a method based on `cloud probability <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_CLOUD_PROBABILITY>`_ data for Sentinel-2.  |geedim|_ is distributed as a python package.  The `command line interface (CLI) <https://geedim.readthedocs.io/en/latest/cli.html>`_ provides access to most of the functionality.  See the `online documentation <https://geedim.readthedocs.io/en/latest/index.html>`_ for more detail on its use.

.. |geedim| replace:: ``geedim``
.. _geedim: https://github.com/leftfield-geospatial/geedim
.. |homonim| replace:: ``homonim``
.. _homonim: https://github.com/leftfield-geospatial/homonim
.. _GEE: https://earthengine.google.com
