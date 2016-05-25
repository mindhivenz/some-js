# Some

> Elegant language for test data

The code in each spec / test should be about conveying as elegantly as possibly
   what the test is trying to prove. But what to do when you need to pass a value
    in a test but that value has no meaning. 
    
For example:
```javascript
const expected = true 
const actual = returnParam(expected)
actual.should.equal(expected)
```

Someone reading the test could ask "Is the value `true` important? Does `returnParam`
  only work with the value `true`? Do non-boolean values work as well?". We could add 
  more tests to answer these questions but then the meaning of this test would be lost 
   amongst the noise of repetition. 
   
This is where `some` comes in:
```javascript
const expected = some.bool()
const actual = returnParam(expected)
actual.should.equal(expected)
```

Now we make plain that the value itself is not important, and that we are explicitly 
 testing booleans. This is also more rigorous than passing a fixed value because over
    multiple test runs both true and false will be tested. 
   
`bool()` is just one of many functions in this package for producing test values. 
See `index.js` for the complete list.

### Unique namespace
 
Sometimes you want values that aren't important, but are unique from each other.
For that there are various functions in the `unique` namespace. 

For example:
```js
const obj = {}
obj[some.unique.string()] = some.primitive()
obj[some.unique.string()] = some.primitive()
Object.keys(obj).should.have.length(2)
```
