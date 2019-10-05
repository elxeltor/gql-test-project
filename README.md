# Important notice

## Implementation choices
- There's no Message model. Although it would be mandatory in a real product, it doesn't have much sens in this project. The message is bound to a forum (it's the only way to access it) and is immutable.
- There are 2 init methods for the DB (init and seed). Since the DB is persistent we could remove the seed step (that resets the data) on every server start.
- Babel for packaging the code. That's purely for my own convenience, I like some of the features it provides.
- Yarn vs Npm. I initially used `yarn` as a package manager (and it's still my preference), but I changed to `npm` assuming it would be easier for anyon to test my code with `npm`. If it's not, just revert the commit `cf37373563fd4294fe1a341fb29458b3ec9e1ba8`
