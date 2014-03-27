# embryoJS
JS mini library to replace jQuery with minimal lines of code. Inspired by Zepto.js, but quite smaller in scope and size. 

## Why
I was tired of jQuery parsing times in big projects, mainly in mobile devices. Don't misunderstand me, jQuery is pretty nice, but too overbloated due to legacy browsers' support. EmbryoJS supports only modern browsers, on purpose, to make it tiny and blazing fast. 

## API scope
EmbryoJS does not match all of jQuery/Zepto API, just the most used methods, which were calculated by using the scraping scripts we have built in casperJS (to be published as a separate repo) targeting Alexa's top 100 business/arts sites. We counted occurrence of each method in each site, converted to percentage, ordered and extracted the most used methods. 

## Build
We are using [GruntJS](http://gruntjs.com/) to build the library. It is setup to automatically hint, uglify, test.

## Testing
[Jasmine v1.3](http://jasmine.github.io/) is used to test the library.

## License
[FreeBSD](http://github.com/zigotica/embryojs/LICENSE-FreeBSD.txt)