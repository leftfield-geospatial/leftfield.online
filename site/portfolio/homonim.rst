Correct imagery to surface reflectance
--------------------------------------

This method uses a fusion, or *harmonisation*, approach to correct imagery to approximate surface reflectance.  A concurrent and co-located reference reflectance image is required with which to fuse the source.  Since its `initial conception <https://doi.org/10.1080/01431161.2018.1528404>`_ with my PhD supervisor, `Adriaan van Niekerk <https://www0.sun.ac.za/cga/adriaan-van-niekerk-director/>`_, it has evolved into the |homonim|_ package, and proved effective for a `range of imagery and problems <https://homonim.readthedocs.io/en/latest/case_studies.html>`_.

.. figure:: ../_images/homonim-block_diagram.webp
    :align: right
    :class: dark-light
    :height: 240

The method uses spatially varying local linear models to approximate the relationship between source and reference images.  As shown in the block diagram, images and model parameters are resampled or re-projected between the source and reference image CRS's (coordinate reference systems) to allow model estimation and application.  Typically the reference has a lower resolution than the source image. Suitable sources of reference imagery are e.g. the `MODIS <https://developers.google.com/earth-engine/datasets/catalog/MODIS_061_MCD43A4>`_, `Landsat <https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C02_T1_L2>`_, or `Sentinel-2 <https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED>`_ programmes.  The |geedim|_ companion tool was created for downloading these, and other satellite images.

|homonim|_ can help improve accuracy and stability of classification and regression applications, and is suited to the harmonisation of multi-sensor images.  It is available as a `python package <https://github.com/dugalh/homonim>`_, under the `AGPLv3 <https://www.gnu.org/licenses/agpl-3.0.en.html>`_ open source license.  There are more details on its usage and functioning in the `online documentation <https://homonim.readthedocs.io/en/latest/index.html>`_.

Example
^^^^^^^

A mosaic of `NGI <https://ngi.dalrrd.gov.za/index.php/what-we-do/aerial-photography-and-imagery>`_ aerial imagery before and after correction with |homonim|_.

.. figure:: ../_images/homonim-source_mosaic.webp
    :align: center
    :class: dark-light
    :height: 220

.. figure:: ../_images/homonim-corrected_mosaic.webp
    :align: center
    :class: dark-light
    :height: 220

.. |geedim| replace:: ``geedim``
.. _geedim: https://github.com/dugalh/geedim
.. |homonim| replace:: ``homonim``
.. _homonim: https://github.com/dugalh/homonim

