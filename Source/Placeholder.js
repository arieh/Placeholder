/*
---
description: 

license: MIT-style

authors:
- Arieh Glazer

requires:
- core/1.3: [Class,Class.Extras]

provides: [Placeholder]

...
*/
/*!
Copyright (c) 2009 Arieh Glazer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE 
*/
(function(window,$,undef){

var support = ('placeholder' in document.createElement('input')),Placeholder;

Placeholder = this.Placeholder = new Class({
    Implements : [Options,Events]
    , options : {
        className : 'placeholder',
        input_class : 'placeholded'
    }
    , initialize : function(el,opts){
        this.setOptions(opts);

        this.element = $(el);

        this.bound = {
            focus : this.focus.bind(this),
            blur : this.blur.bind(this)
        };

        this.elements = {};
        
        this.generate();

        this.attach();

        this.value_field = this.element.nodeName.toLowerCase() == 'input' ? 'value' : 'innerHTML';

        el.store('Placeholder',this);

        this.blur();
    },
    generate : function(){
        var text  = this.element.placeholder,
            label = this.elements.label = new Element('span.'+this.options.className+'[role=display]',{text:text});

        this.element.addClass(this.options.input_class);
    },
    positionLabel : function(){
        var top = this.element.offsetTop,
            left = this.element.offsetLeft;

        this.elements.label.setStyles({
            top : top + 'px',
            left : left + 'px'
        });
    },
    attach : function(){
        this.element.addEvents({
            focus : this.bound.focus,
            blur  : this.bound.blur
        });
    },
    dettach : function(){
        this.element.removeEvents({
            focus : this.bound.focus,
            blur  : this.bound.blur
        });    

        this.element = null;
        this.elements.invoke('destroy');
        this.elements = {};
    },
    focus : function(){  
        this.hide(); 
    },
    blur : function(){  
        var value = this.element[this.value_field].trim();

        if (value) return;

        this.show(); 
    },
    show : function(){
        this.positionLabel();
        this.element.offsetParent.appendChild(this.elements.label);    
        this.fireEvent('show');
    },
    hide : function(){
        this.elements.label.dispose();    
        this.fireEvent('hide');
    }
});

Placeholder.supported = support; 

Placeholder.create = function(opts){
  if (support) return;

  $$('[placeholder]').each(function(el){
    new Placeholder(el,opts);    
  });
};
}).call(this,this,document.id);
