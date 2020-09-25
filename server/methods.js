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

function statistic(_list) {
  const count = _list.length;
  const list = [..._list].sort();
  list.sort();
  const max = list.pop();
  const min = list.shift();
  const total = list.reduce((prev, current) => prev + current);
  const average = total / (count - 2);
  return {
    count,
    max,
    min,
    average,
  };
}

async function benchmark(name, repeat, fn) {
  console.log(`benchmark "${name}": repeat=${repeat}`);
  const durations = Array(repeat);
  for (let i = 0; i < repeat; i++) {
    const startTime = performance.now();
    await fn();
    const endTime = performance.now();
    durations[i] = endTime - startTime;
    console.log(`loop ${i} finished in ${durations[i]}ms`);
  }
  const result = statistic(durations);
  console.log(`${name} all done`);
  console.dir(result);
  return result;
}

Meteor.methods({
  async test1(repeat = 10, limit = 100) {
    await benchmark('test1', repeat, async () => {
      const activities = Activities.find({}, { limit }).fetch();
      activities.forEach(activity => {
        fn1(activity);
      });
    });
  },
  async test2(repeat = 10, limit = 100) {
    await benchmark('test2', repeat, async () => {
      const activities = ActivitiesWithHelper.find({}, { limit }).fetch();
      activities.forEach(activity => {
        activity.method1();
      });
    });
  },
  async test3(repeat = 10, limit = 100) {
    await benchmark('test3', repeat, async () => {
      const activities = await Activities.rawCollection().find({}, { limit }).toArray();
      activities.forEach(activity => {
        fn1(activity);
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
