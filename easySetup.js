/*
  Easy setup add on

*/
(function(){
  "use strict";
  var opt = {},
      elems = {},
      stats = false,
      played = false,
      ul,
      SHOUTcast;
  
  //basically read the url of the script to check for options
  (function(){
    var uri = $('script').last().attr('src');
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
  
  opt.playedInterval = opt.playedInterval || 30000;
  opt.statsInterval = opt.statsInterval || 5000;
  
  //get all items which want shoutcast stats
  $('[data-shoutcast-value]').each(function(i,item){
    item = $(item);
    elems[item.data('shoutcast-value')] = item;
  });
  stats = !$.isEmptyObject(elems);
  
  ul = $('#played');
  played = !!ul.length;
  
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
      ul.html(html);
  });
  SHOUTcast = $.SHOUTcast(opt);
  
  stats && SHOUTcast.startStats();
  played && SHOUTcast.startPlayed();
  
}());