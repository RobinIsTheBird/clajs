clajs
=====

Pronounced *klæs*:
Fix the JavaScript inheritance mechanism within the constraints of the language

Programmers choose OOP for the benefits of polymorphism, inheritance, and encapsulation.
While JavaScript has objects, and polymorphism is fairly easy to achieve,
despite modern (ES5) JavaScript constructs, achieving inheritance and encapsulation
simultaneously is neither easy nor pretty.

_Clajs_ is a library which leverages ES5 JavaScript constructs to make both
inheritance and encapsulation both easy and pretty.

_Clajs_ is _not_
* syntactic sugar
* a framework
* a language extension
* or a new language

Use _Clajs_ in the browser with [RequireJS](http://requirejs.org/),
or from [Node](http://nodejs.org/), either with [RequireJS](http://requirejs.org/)
or without, as it uses Node's _require_ `amdefine` shim.

_Clajs_ is brand new.
It provides convenient ways of extending a base clajs and referencing base clajs methods,
as well as private, protected, and public member variables.
Mixins are under consideration.

## clajs Tutorial

To create a base _clajs_:

```
var BasicFoo = clajs('BasicFoo', function (fooSpecificOptions) {
  var privateProps = { bar: fooSpecificOptions.bar };

  return this.instance({
    protectedProps: {
      get bar () { return privateProps.bar; }
      set bar (b) { privateProps.bar = b; return b; }
    },
    publicProps: {
      greet: function () { console.log('Hello, ' + privateProps.bar); },
      leave: function () { console.log('Farewell, ' + privateProps.bar); }
    }
  });
});
```

To instantiate and use that base _clajs_:

```
var myFoo = new BasicFoo({ bar: 'World' });
myFoo.greet(); // Hello, World
myFoo.leave(); // Farewell, World
```

To extend our `BasicFoo` base _clajs_:

```
var BirdFoo = clajs('BirdFoo', function (fooSpecificOptions) {
  var supr = this.supr;
  supr.bar = 'tweet, twitter, chirp, ' + supr.bar;

  return this.instance({
    publicProps: {
      // greet passes through
      leave: function () {  
        supr.leave();
        console.log('Flap flap flap');
      }
    }
  });
}, BasicFoo);
```

To instantiate and use the avian extension _clajs_:

```
var myFoo = new BirdFoo({ bar: 'World' });
myFoo.greet(); // Hello, tweet, twitter, chirp, World
myFoo.leave(); // Farewell, tweet, twitter, chirp, World\nFlap flap flap
```

## clajs Reference

Declare a constructor with `clajs`:

```
function clajs (clajsName, xtor, base)
```

returns Function, which is the actual constructor for use with `new`.

Parameters:
* `clajsName` - String, the name of the _clajs_
* `xtor` - Function, called from the constructor to do the initialization
* `base` - Optional - Function created by calling `clajs` or options Object

### `xtor`

The `xtor` parameter to `clajs`:

```
function xtor ()
```

returns an instance of the _clajs_, as returned by `this.instance()`.

Parameters from the `new` operation are passed through to `xtor`. 

The `this` context is created by `new`, and initialized by `clajs` as follows:

```
{
  instance: Function - returns an instance of the _clajs_ which must be returned by `xtor`,
  supr: Object - the prototype of an instance of the `base` _clajs_
}
```

`this.instance` takes one parameter, an options object:

```
{
  protectedProps: Object,
  publicProps: Object
}
```

The `publicProps` object contains all the public methods and properties for the _clajs_.

The `protectedProps` object contains all the protected methods and properties for
the _clajs_, that is, methods and properties only available to subclasses of the _clajs_.

### `base` as an options Object:

```
{
  base: Function created by `clajs`,
  factory: Function that returns an instance of base, given parameters passed through from `new`
}
```

Use the options Object form of `base` if the `base` constructor takes different parameters
from the _clajs_ being defined.

`clajs` must instantiate the base _clajs_ in order to instantiate the _clajs_,
if the _clajs_ extends a base _clajs_.
If only the `base` constructor function is passed to `clajs`,
it will be instantiated with the same arguments passed to `new`.

## Examples

Please see `./examples/Iterator/scripts/iterate.js`
and the three clajses it requires for a runnable example
that's a bit more functional than the BasicFoo and BirdFoo above.

Go ahead and run iterate.js with node-debug to see how it works.

## Planned Work

* Install yuidocs and generate documentation from the code source
* Shore up the README
* Add grunt tasks to generate documentation html
* Port the RobinIsTheBird protoExplorer project to clajs.js
* Add a test framework
* Write formal tests for node and phantom
* Add grunt tasks to produce downloadable distributions for browser and node
* Make available through npm
* Organize an issue tracking system
* Set up to accept code contributions
