function prepareToSubmit(){
  readEditors();
  prepareAceEditorsForSubmit();
  
  var q = document.forms['AddDynamicInlineForm'].elements['questionText'];
  if (q && q.value) {
     var div = document.createElement('div');
     div.innerHTML = q.value;
     
     //clear empty html5 div tags
     $(div).find("div[class^='html5']").each(function () {
         !this.id && $(this).replaceWith(this.innerHTML == '&nbsp;' ? '' : this.innerHTML);
     });
     
     //make sure adaptive section seperator is a top element in questionText
     $(div).find('div.dynamic_section').each(function(){		       
         if(this.parentNode !== div){
           var p= this.parentNode, s = p.removeChild(this);
           p.parentNode.insertBefore(s, p.nextSibling);
         }
     }); 
     
     //Preserve JSON encoding in attributes
     q.value = preserveJSONinAttributes(div.innerHTML);   
  }
}
 
function finish() {
  prepareToSubmit();
  
  document.forms['AddDynamicInlineForm'].submit();
}