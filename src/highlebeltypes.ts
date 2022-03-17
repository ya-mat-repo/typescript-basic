type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 交差型
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 関数オーバーロード
// add関数の戻り値はCombinable型ということしかTypescriptは判断できない
// Typescriptに引数がどちらもnumber型の場合は戻り値もnumber型であることを教えたい
// 同様に、引数がどちらもstring型の場合は戻り値もstring型であることを教えたい
// そのような場合に関数オーバーロードを記述する
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  // このif文を　型ガード　と呼ぶ
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add(10, 20);
const result2 = add("Banana ha ", "100 yen!");

console.log(add("hoge", 20));
console.log(add(8, 20));

const fetchedUserData = {
  id: "u1",
  name: "user"
  // job: {
  //   title: "Developer",
  //   description: "TypeScript",
  // },
};

console.log(fetchedUserData?.job?.title);

const userInput = "";

// NULL合体演算子
// userInputが　null または undefined　　の場合は　"DEFAULT"を代入する
const storedData = userInput ?? "DEFAULT";

console.log(storedData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  // ここで型ガードが必要になるがtypeofは使えない、typeofはJavascriptの型しか判定できない
  // UnknownEmployeeはEmployeeまたはAdmin型なのでtypeofだとどちらもObject型になる
  // このようなケースでは in を使う
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Manu", startDate: new Date() });

// インデックス型
interface ErrorContainer {
  // プロパティ名が実装するまでわからない、個数も分からないという場合に便利な型
  // プロパティ名の方はstringまたはnumberを指定できる
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "正しいメールアドレスではありません",
  userInput: "１００文字以内で入力してください"
};
