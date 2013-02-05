/*
  Easy setup add on

*/
(function(exports,$){
  "use strict";
  var opt = {},
      elems = {},
      stats = false,
      played = false,
      $ul, $script= $('script').last();
  
  //basically read the url of the script to check for options
  (function(){
    var uri = $script.attr('src');
    var options = uri.replace(/.*\?/,'');
    if(options === uri){
     return; 
    }
    $.each(options.split('&'),function(i,o){
      o = o.split('=');
      if(o.length === 2){
        opt[o[0]] = o[1];
      }
    });
  }());
  
  if(!opt.host){
   return; 
  }
  //if a value has been passed in the url then show that value wherever the script was inserted
  opt.value && (function(){
    //if value is played then add a ul otherwise add a p
    opt.value === 'played' ? $script.after('<ul id="played"></ul>') : $script.after('<p data-shoutcast-value="'+opt.value+'"></p>');
  }());
  
  opt.playedInterval = opt.playedInterval || 30000;
  opt.statsInterval = opt.statsInterval || 5000;

  //get all items which want shoutcast stats
  $('[data-shoutcast-value]').each(function(i,item){
    item = $(item);
    elems[item.data('shoutcast-value')] = item;
  });
  stats = !$.isEmptyObject(elems);
  
  $ul = $('#played');
  played = !!$ul.length;
  
  //only update stats if there are items
  stats && (opt.stats = function(){
      var i;
      for(i in elems){if(elems.hasOwnProperty(i)){
          elems[i].text(this.get(i));
      }}
  });
  //only update played if there is #played
  played && (opt.played = function(tracks){
      var html = '';
      $.each(tracks,function(i,track){
        html+='<li>'+track.title+'</li>';
      });
      $ul.html(html);
  });
  exports.SHOUTcast = $.SHOUTcast(opt);
  
  stats && exports.SHOUTcast.startStats();
  played && exports.SHOUTcast.startPlayed();
  
}(window,window.jQuery));