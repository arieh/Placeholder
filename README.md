H5Placeholder
================
Fallback for browsers that do not support the placeholder property.

How to use
----------
The simplest way to create the placeholder is to use the utility method:

    #JS
    Placeholder.create(options);

This method will check for placeholder support. If it doesn't exist, it will create placeholders for all elements with the placeholder attribute.

You can also create a placeholder for a single input:
    
    #JS
    new Placeholder('input-id',options);

If needed, the placeholder instance of an element can be accessed through the element's storage under "Placeholder".

Options
--------

  * `className` - the class name for the placeholder label
  * `input_class` - will be used for the input's class (used for making sure the input's background is transparent)
