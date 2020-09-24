# meteor-helpers-benchmark

Test meteor collection helper performance

## Prepare

Generate 10000 documents in both collections

```js
Meteor.call('generate', 10000)
```

## Sample test result

### Test1

Client

```js
Meteor.call('test1', 10, 100000)
```

Server

```
I20200924-16:45:46.477(8)? benchmark "test1": repeat=10
I20200924-16:45:49.725(8)? loop 0...finished in 3244.1639800071716ms
I20200924-16:45:52.571(8)? loop 1...finished in 2845.825679898262ms
I20200924-16:45:55.383(8)? loop 2...finished in 2811.7021800279617ms
I20200924-16:45:58.247(8)? loop 3...finished in 2862.000553011894ms
I20200924-16:46:01.277(8)? loop 4...finished in 3030.220423936844ms
I20200924-16:46:04.126(8)? loop 5...finished in 2848.515716075897ms
I20200924-16:46:07.136(8)? loop 6...finished in 3009.1866869926453ms
I20200924-16:46:10.208(8)? loop 7...finished in 3072.126407980919ms
I20200924-16:46:13.084(8)? loop 8...finished in 2873.7259870767593ms
I20200924-16:46:15.715(8)? loop 9...finished in 2630.9590340852737ms
I20200924-16:46:15.715(8)? average time 2922.8426649093626
```

Client

```js
Meteor.call('test2', 10, 100000)
```

Server

```
I20200924-16:46:26.153(8)? benchmark "test2": repeat=10
I20200924-16:46:29.086(8)? loop 0...finished in 2930.993015050888ms
I20200924-16:46:33.081(8)? loop 1...finished in 3995.464020013809ms
I20200924-16:46:36.769(8)? loop 2...finished in 3687.7255030870438ms
I20200924-16:46:39.770(8)? loop 3...finished in 3000.321745991707ms
I20200924-16:46:43.088(8)? loop 4...finished in 3318.473098039627ms
I20200924-16:46:46.356(8)? loop 5...finished in 3267.395280957222ms
I20200924-16:46:49.221(8)? loop 6...finished in 2865.2982919216156ms
I20200924-16:46:51.915(8)? loop 7...finished in 2693.165598988533ms
I20200924-16:46:54.938(8)? loop 8...finished in 3023.382681965828ms
I20200924-16:46:57.904(8)? loop 9...finished in 2965.207962036133ms
I20200924-16:46:57.904(8)? average time 3174.7427198052405
```
