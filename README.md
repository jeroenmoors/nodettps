nodettps
========

https experiments in node.js.

These examples are part of talk, slides can be found at:
http://jeroen.is/talking/#https_authentication_in_node_js


Demo files
-----------
- basic_http.js

  A Very basic node.js application using the http://expressjs.com/ framework
  
- basic_https.js

  Minimal application using https, don't use this as the basis for your app!
  
- basic_https_with_intermediate_certificate.js

  Added intermediate certificates to complete the chain from our cert to the CA. 
 
- basic_https_with_beast_mitigation.js

  Add mitigation for BEAST: 
  https://community.qualys.com/blogs/securitylabs/2011/10/17/mitigating-the-beast-attack-on-tls

- basic_https_with_restore_session.js

  Add support for TLS session resumption, should increase the performance of your app
  http://en.wikipedia.org/wiki/Transport_Layer_Security#Resumed_TLS_handshake
  
- basic_https_with_http_redirect.js

  Redirect all incomming http request to their matching https url.
  Also force all requests to be https using HSTS
  http://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security

- https_with_belgian_eid.js

  Basic implementation of client authentication with the Belgian eID.
  This example can also be used as a prototype for other forms of client certificates.
  
  
Feedback
---------

All feedback is welcome! Please drop me a line at jeroen.moors@fluoline.net
