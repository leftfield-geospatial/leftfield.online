.. include:: ../shared.txt

Surface reflectance correction
------------------------------

The Homonim_ command line tool and library implements a method for surface reflectance correction `initially conceived <https://doi.org/10.1080/01431161.2018.1528404>`__ with my `PhD supervisor <https://scholar.google.co.za/citations?user=bUalpwUAAAAJ&hl=en>`__.
The method fuses source imagery with a concurrent reference reflectance image to approximate surface reflectance.  It has been tested on a `range of imagery and applications <https://homonim.readthedocs.io/en/latest/case_studies.html>`_.  You can read more about its use and functioning in the `online documentation <https://homonim.readthedocs.io/en/latest/index.html>`_.

.. figure:: ../_images/homonim-source_mosaic.webp
    :align: center
    :class: dark-light
    :width: 580
    :alt: Source mosaic

    Aerial mosaic before correction.

.. figure:: ../_images/homonim-corrected_mosaic.webp
    :align: center
    :class: dark-light
    :width: 580
    :alt: Corrected mosaic

    Aerial mosaic after correction.
