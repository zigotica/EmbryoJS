# embryoJS
JS mini library to replace jQuery with minimal lines of code. Inspired by Zepto.js, but quite smaller in scope and size. 

## Why
I was tired of jQuery parsing times. Don't misunderstand me, jQuery is nice, but too overbloated due to legacy browsers' support. EmbryoJS supports only modern browsers, on purpose, to make it tiny and blazing fast. 

## API scope
EmbryoJS does not match all of jQuery/Zepto API, just the most used methods, which were calculated by using the scraping scripts we have built in casperJS (to be published as a separate repo) targeting Alexa's top 100 business/arts sites. We counted occurrence of each method in each site, converted to percentage, ordered and extracted the most used methods. 

## License
[FreeBSD](http://github.com/zigotica/embryojs/LICENSE-FreeBSD.txt)