clajs
=====

Pronounced *klæs*:
Fix the JavaScript inheritance mechanism within the constraints of the language

Programmers choose OOP for the benefits of polymorphism, inheritance, and encapsulation.
While JavaScript has objects, and polymorphism is fairly easy to achieve,
despite modern (ES5) JavaScript constructs, achieving inheritance and encapsulation
simultaneously is neither easy nor pretty.

_Clajs_ is a library which leverages modern ES5 JavaScript constructs to make both
inheritance and encapsulation both easy and pretty.

_Clajs_ is _not_
* syntactic sugar
* a language extension
* or a new language

Use _Clajs_ in the browser with [RequireJS](http://requirejs.org/),
or from [Node](http://nodejs.org/), either with [RequireJS](http://requirejs.org/)
or without, as it uses Node's _require_ `amdefine` shim.

_Clajs_ is a brand new WIP.
It will provide convenient ways of extending a base clajs and referencing base clajs methods,
as well as private, protected, and public member variables.
Mixins are under consideration.
