'use strict';var _slicedToArray=function(){function c(c,a){var b,g=[],e=!0,h=!1;try{for(var i,j=c[Symbol.iterator]();!(e=(i=j.next()).done)&&(g.push(i.value),!(a&&g.length===a));e=!0);}catch(c){h=!0,b=c}finally{try{!e&&j["return"]&&j["return"]()}finally{if(h)throw b}}return g}return function(d,a){if(Array.isArray(d))return d;if(Symbol.iterator in Object(d))return c(d,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_index=require("./index");function _toConsumableArray(c){if(Array.isArray(c)){for(var a=0,d=Array(c.length);a<c.length;a++)d[a]=c[a];return d}return Array.from(c)}test("getScriptUrl to return proper javascript cdn urls",function(){[[[!0],"https://static-na.payments-amazon.com/OffAmazonPayments/us/sandbox/js/Widgets.js"],[[!0,"jp"],"https://static-fe.payments-amazon.com/OffAmazonPayments/jp/sandbox/lpa/js/Widgets.js"],[[!0,"uk"],"https://static-eu.payments-amazon.com/OffAmazonPayments/uk/sandbox/lpa/js/Widgets.js"],[[!0,"de"],"https://static-eu.payments-amazon.com/OffAmazonPayments/de/sandbox/lpa/js/Widgets.js"],[[!1],"https://static-na.payments-amazon.com/OffAmazonPayments/us/js/Widgets.js"],[[!1,"jp"],"https://static-fe.payments-amazon.com/OffAmazonPayments/jp/lpa/js/Widgets.js"],[[!1,"uk"],"https://static-eu.payments-amazon.com/OffAmazonPayments/uk/lpa/js/Widgets.js"],[[!1,"de"],"https://static-eu.payments-amazon.com/OffAmazonPayments/de/lpa/js/Widgets.js"]].forEach(function(a){var b=_slicedToArray(a,2),c=b[0],d=b[1];return expect(d).toBe(_index.getScriptUrl.apply(void 0,_toConsumableArray(c)))})}),test("toBoolean that it correctly casts",function(){expect((0,_index.toBoolean)("false")).toBe(!1),expect((0,_index.toBoolean)("")).toBe(!1),expect((0,_index.toBoolean)()).toBe(!1),expect((0,_index.toBoolean)(null)).toBe(!1),expect((0,_index.toBoolean)("true")).toBe(!0),expect((0,_index.toBoolean)("falseeee")).toBe(!0),expect((0,_index.toBoolean)(1)).toBe(!0)});