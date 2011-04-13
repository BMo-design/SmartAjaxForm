/*
--- 
description: SmartAjaxForm

authors: 
- Benedikt Morschheuser (http://software.bmo-design.de)
- thx to Olivier Girardot for the update groundwork

license:
- MIT-style license

requires: 
- core/1.3: '*'

provides: [SmartAjaxForm]

...
*/

var SmartAjaxForm = new Class({
	
	Implements: [Events, Options],
  
	options: {
		'loadingClass': 'ajax-loading',
		'responseClass': 'response',
        'regExpClassname': /^ajaxForm/i  //class='ajaxForm'
        /* Events,
		'onClick': $empty,
		'onComplete': $empty,
		'onFailure': $empty*/
	},
  
	initialize: function(element,options){
		this.setOptions(options);
		
        $$('form').each(function(form_tag){
		  if (form_tag.getProperty('class') && form_tag.getProperty('class').test(this.options.regExpClassname)){ //if form has class='ajaxForm'							
			form_tag.addEvent('submit', function(e) {
				e.stop();
				var responseLayer = new Element('div', {
					'html': '<br/><br/><br/>',
                    'class': this.options.responseClass+' '+this.options.loadingClass,
					'events': {
						'click': function(){
                             this.fireEvent('click');
							 form_tag.replaces(responseLayer);
						}.pass(form_tag,responseLayer).bind(this)
					}
				});
		 		responseLayer.replaces(form_tag);

				form_tag.set('send',{
					onComplete: function(response) {
                        this.fireEvent('complete',response);
						responseLayer.set('html',response)
						responseLayer.removeClass(this.options.loadingClass);
					}.bind(this),
					onFailure: function(){
                        this.fireEvent('failure');
						responseLayer.removeClass(this.options.loadingClass);
						alert("Error, try it again!"); //German = "Fehler, versuchen Sie es erneut!"	
					}.bind(this)
				});
                form_tag.send();
		      }.bind(this));
           }
	    }.bind(this));
    
    }
});
