function getObj(name, age) {
  return {
    name,
    age,
  };
}

// ⛔️ Error: A spread argument must either
// have a tuple type or be passed to a rest parameter.ts(2556)
const result = getObj(...['James', 30]);

console.log(...['James', 30])