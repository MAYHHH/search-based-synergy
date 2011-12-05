dojo.provide("imashup.configs.proxy");

imashup.configs.proxy = {
  url : 'http://localhost/'
}

dojo.mixin( imashup.configs.proxy, {
  'http://api.tudou.com/v3' : imashup.configs.proxy.url + '/tudou',
  'http://api.ipinfodb.com/v2' : imashup.configs.proxy.url +'/iplocation',
  'http://ajax.googleapis.com/ajax/services/search' : imashup.configs.proxy.url +'/googlesearch',
  'http://svcs.ebay.com/services' : imashup.configs.proxy.url +'/ebay/service',
  'http://www.google.com/ig/api' : imashup.configs.proxy.url +'/googleweather',
  'http://open.api.sandbox.ebay.com' : imashup.configs.proxy.url +'/ebay/sandbox',
})