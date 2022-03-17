// ジェネリック型に制約をつける
// 下記の,merge関数のジェネリックはT, U共にどんな方でも良いがobjectである必要がある、という例
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
  let descriptionText = "値がありません";
  if (element.length > 0) {
    descriptionText = `値は${element.length}個です。`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("お疲れ様です！"));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

// ジェネリッククラス
// DataStorageクラスが扱うデータの型についてはこのクラスは関心を持たない
// つまり、どのようなデータ型でも扱えるようにしたい
// そのような場合にジェネリッククラスを用いる
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // indexOfは引数の値が見つからない場合に-1を返す
    // spliceは第一引数が-1の場合は配列末尾の要素を削除することになる
    // それは意図しない挙動なので、見つからない場合はreturnする
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
