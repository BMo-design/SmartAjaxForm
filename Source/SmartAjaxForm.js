/*
--- 
description: SmartAjaxForm
authors: 
- Benedikt Morschheuser (http://software.bmo-design.de)
license:
- MIT-style license
requires: 
- core/1.2.4: '*'
provides: [SmartAjaxForm]
...
*/
var SmartAjaxForm = new Class(
{
  Implements: [Events, Options],
  options:
  {
    regExpClassname: /^ajaxForm/i  //class='ajaxForm'	
  },
  initialize: function(options)
  {
    this.setOptions(options);
    
    $$('form').each(function(form_tag){
		if (form_tag.getProperty('class') && form_tag.getProperty('class').test(this.options.regExpClassname)){ //if form has class='ajaxForm'										
			form_tag.addEvent('submit', function(e) {
				e.stop();
				var responseLayer = new Element('div', {
					'class': 'response ajax-loading',
					'html': '<br/><br/><br/>',
					'events': {
						'click': function(){
							 form_tag.replaces(responseLayer);
						}.pass(form_tag,responseLayer)
					}
				});
		 		responseLayer.replaces(form_tag);

				this.set('send',{
					onComplete: function(response) {
						responseLayer.set('html',response)
						responseLayer.removeClass('ajax-loading');
					},
					onFailure: function(){
						responseLayer.removeClass('ajax-loading');
						alert("Error, try it again!"); //German = "Fehler, versuchen Sie es erneut!"	
					}
				});
                this.send();
			});
		}
	}.bind(this));
   }
});