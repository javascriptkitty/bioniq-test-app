let tasks;
for (let i = 1; i < 1000; i++) {
  tasks.push({
    priority: Math.floor(Math.random() * 9) + 1,
    name: `Задание ${i}`,
    description: `Описание задания ${i}`,
  });
}
