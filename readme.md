#jQuery SHOUTcast plugin

This simple plugin allows you to display various information about a SHOUTcast server on your website.

## Requirements

1. jQuery
2. SHOUTcast V2 DNAS with JSON functionality

## Usage

[View the easy setup guide](https://github.com/Wavestreaming/jquery-shoutcast/wiki/Easy-Setup) or keep reading for more flexible configuration.

### Embedding

First you will need to reference jQUery (if you haven't already done so) and this plugin, place the following lines of code at the bottom of your HTML page, just before the `</body>` tag

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="your_website.com/assets/js/jquery.shoutcast.min.js"></script>
```
Any of the following code that you see in this documentation must be either placed inside `<script></script>` tags or in an separate .js file.


### Stream Stats

The plug can get the public stream stats taken from host:port/stats, here is the basic code:

#### Basic Setup

```javascript
$.SHOUTcast({
   host : 'stardust.wavestreamer.com',
   port : 8062
}).stats(function(){
   $('#songtitle').text(this.get('songtitle'));
});
```
The above code will set the text of an element with the id of 'songtitle' to whatever the name of the current track is.

#### Auto update on an interval

You can set the plugin to automatically fetch new stats at an interval you specify, heres the basic code:

```javascript
$.SHOUTcast({
   host : 'stardust.wavestreamer.com',
   port : 8062,
   interval : 5000,
   stats : function(){
      $('#songtitle').text(this.get('songtitle'));
   }
}).startStats();

```
The above code will set the element with an id of 'songtitle' to the title of the currently playing track every 5 seconds.

#### Ensuring stream is active

Both of the above examples assume that the stream is live and set the song title, this is now always the case, to check of this you can do:

```javascript
if(this.onAir()){
   $('#songtitle').text(this.get('songtitle'));
}
```

The above code will only set the title if it is on air, or you could have a default song value:

```javascript
$('#songtitle').text(this.get('songtitle','Off Air'));
```

The above code will show 'Off Air' if there is no song title.

### Track history

The plugin can also get the track history from the shoutcast server, this is taken from host:port/played, here is the basic code:

```javascript
$.SHOUTcast({
   host : 'stardust.wavestreamer.com',
   port : 8062
}).played(function(tracks){
   $('ul').html('');
   $.each(tracks,function(k,track){
      $('ul').append('<li>'+track.title+'</li>');
   ));
});
```
The above code is very basic but it will insert the track history into a ul element.

#### Updating played tracks at an interval

```javascript
$.SHOUTcast({
   host : 'stardust.wavestreamer.com',
   port : 8062,
   playedInterval : 20000,
   played : function(tracks){
      $('ul').html('');
      $.each(tracks,function(k,track){
         $('ul').append('<li>'+track.title+'</li>');
      ));
   }
}).startPlayed();
```
The above code will update the ul every 20 seconds with the played information

### Configuration <a name="configuration" href="#configuration"></a>

#### Initial options

As you have seen from the previous example you initial pass some options to the plugin, all supported options are:

* `host`       - the SHOUTcast host e.g. stardust.wavestreamer.com
* `port`    - [optional] the SHOUTcast port e.g. 8062 (8000 by default)
* `stream`  - [optional] the stream id e.g. 2 (1 by default)
* `interval`  - [optional] how often new stats should be fetched in milliseconds e.g. 5000 = 5 seconds
* `stats`   - [optional] the function to call when new stats are fetched, 'this' is the SHOUTcast object
* `played` - [optional] the functon to call when played info is fetched, 'this' is the SHOUTcast object
* `statsInverval` - [optional] how often should stats be fetched in milliseconds
* `playedInterval` - [optional] how often should played be fetched in milliseconds

The plugin will return a `SHOUTcast` object.

Both `statsInterval` and `playedInterval` will default to interval if not provided.

### SHOUTcast object
   
Each call to $.SHOUTcast will return an internal SHOUTcast object, this object has various functions which can be useful.

* `get([key,default])` - this method will get a value from the stats, e.g. 'songtitle', if no key then all the attributes will be returned. A sond default value can be passed to be returned if the key does not exist
* `stats([callback])` - this method will get stats from the SHOUTcast server, it will call the callback function with the stats, the callback function 'this' value will be the SHOUTcast object.
* `played([callback])` - this method will get the played tracks from the SHOUTcast server, it will call the callback with an array
* `startStats()` - start automatically fetching the stats at an interval, the interval/statsInterval properties and stats function should have been passed as initial options to the plugin
* `stopStats()` - stop automatically updating stats
* `startPlayed()` - start automatically fetching played information
* `stopPlayed()` - stop automatically fetching played information
* `getStatus()` - get the status of the stream, the return values are: 0 = offline, 1 = no source connected, 2 = on air
* `onAir()` - check if the stream is on air will return true or false


## SHOUTcast info

### Stats <a name="shoutcast-stats" href="#shoutcast-stats"></a>

These are the various options which can be accessed when using the stats method.

* currentlisteners
* peaklisteners
* maxlisteners
* uniquelisteners
* averagetime
* servergenre
* serverurl
* servertitle
* songtitle
* nexttitle
* streamhits
* streamstatus
* bitrate
* content
* version
* status* (Offline, Awaiting Connection, On Air)

You can pass any of the above keys to the get method to attempt to get that information. Note items marked with a * are generated by the plugin.

You can view these stats on your own server by visiting `host:port/stats?sid=1`

Here is the official [SHOUTcast documentation](http://wiki.winamp.com/wiki/SHOUTcast_DNAS_Server_2_XML_Reponses#General_Server_Summary)

### Played <a name="shoutcast-played" href="#shoutcast-played"></a>

The played method will give you an array of objects, or tracks. Each track has two properties, 'playedat' and 'title'

* playedat - when this track was played, please note this is in seconds
* title - the track that was played

You can view the played information by visiting `host:port/played?sid=1`
