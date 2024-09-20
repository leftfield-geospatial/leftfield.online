.. include:: ../shared.txt

Orthorectification
------------------

Orthority_ is a command line toolkit and library for `orthorectifying <https://trac.osgeo.org/ossim/wiki/orthorectification>`__ remotely sensed imagery.  It was originally developed as a research tool for processing NGI_ aerial imagery.  Since then it has been expanded to support a range of imagery and camera models, and to provide orthorectification related methods like pan-sharpening.  Together with :doc:`Homonim <homonim>`, it provides an open source toolchain for converting remotely sensed images into "science ready" surface reflectance data.

.. figure:: ../_images/simple_ortho-example.webp
    :align: center
    :class: dark-light
    :target: ../_images/simple_ortho-example.webp
    :alt: Orthorectification and correction example

    A mosaic of four NGI images (*Source*) that has been orthorectified with Orthority (*Orthorectified*), then corrected to surface reflectance with Homonim (*Corrected*).
