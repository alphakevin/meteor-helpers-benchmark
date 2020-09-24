import { performance } from 'perf_hooks';
import { Meteor } from 'meteor/meteor';
import { Activities, ActivitiesWithHelper, fn1 } from './collections';

function generateDoc() {
  const doc = {};
  for (let i = 0; i < 10; i++) {
    doc[`field${i}`] = 'Hello, World ${i} ' + Math.random();
  }
  return doc;
}

function generateData(size = 1) {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push(generateDoc());
  }
  return data;
}

function benchmark(name, repeat, fn) {
  console.log(`benchmark "${name}": repeat=${repeat}`);
  const durations = Array(repeat);
  let total = 0;
  for (let i = 0; i < repeat; i++) {
    process.stdout.write(`loop ${i}...`);
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    durations[i] = endTime - startTime;
    total += durations[i];
    process.stdout.write(`finished in ${durations[i]}ms\n`);
  }
  const average = total / repeat;
  console.log(`average time ${total / repeat}`);
  return { durations, average };
}


Meteor.methods({
  test1(repeat = 10, limit = 100) {
    return benchmark('test1', repeat, () => {
      const activities = Activities.find({}, { limit }).fetch();
      activities.forEach(activity => {
        fn1(activity);
      });
    });
  },
  test2(repeat = 10, limit = 100) {
    return benchmark('test2', repeat, () => {
      const activities = ActivitiesWithHelper.find({}, { limit }).fetch();
      activities.forEach(activity => {
        activity.method1();
      });
    });
  },
  async generate(size = 100) {
    const samples = generateData(size);
    try {
      await Activities.rawCollection().drop();
      await ActivitiesWithHelper.rawCollection().drop();
    } catch(e) {
    }
    await Activities.rawCollection().insertMany(samples);
    console.log('col1 count:', Activities.find({}).count());
    await ActivitiesWithHelper.rawCollection().insertMany(samples);
    console.log('col2 count:', ActivitiesWithHelper.find({}).count());
  },
});
