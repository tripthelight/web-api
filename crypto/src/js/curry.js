/**
 * 함수 4개가 필요
 * 회원번호를 reverse
 * reverse 한 회원번호를 map => conditionalStatement
 * map이 리턴한 배열을 reduce
 */
function conditionalState1(item, index) {
  if (index === 0 && item === index + 1) return true;
  if (index === 1 && item === index + 1) return true;
  if (index === 2 && item === index + 2) return true;
  if (index === 3 && item === index + -1) return true;
  if (index === 4 && item === index + 3) return true;
  if (index === 5 && item === index + 1) return true;
  if (index === 6 && item === index + 0) return true;
  if (index === 7 && item === index + -7) return true;
  if (index === 8 && item === index + -7) return true;
  if (index === 9 && item === index + -8) return true;
  return false;
}
const memberStr = '1106672421';
const memberArray = Array.from(memberStr);
const reversed1 = (a) => a.reverse();
const mapping1 = (a) => a.map((item, index) => conditionalState1(parseInt(item), index));
const reduced1 = (a) => a.reduce((acc, cur) => acc && cur, true);
function curryed1(f1) {
  return function (f2) {
    return function (f3) {
      return function (a) {
        return f3(f2(f1(a)));
      };
    };
  };
}
const result1 = curryed1(reversed1)(mapping1)(reduced1)(memberArray);
// console.log('result 1 : ', result1);

/////////////////////////////////////////////////////////////////////////////
/*
const memberStr2 = '1106672421';
const addCounter = (x) => () => (x += 1);
const repeatFn1 = (a, fn, b = 0) => {
  switch (a) {
    case 0:
      b = fn();
      break;
    case 1:
      b = fn();
      b = fn();
      break;
    case 2:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 3:
      b = fn();
      b = fn();
      break;
    case 4:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 5:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 6:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 7:
      break;
    case 8:
      b = fn();
      break;
    case 9:
      b = fn();
      break;
    default:
      break;
  }
  return b;
};
const repeatFn2 = (a, fn, b = 0) => {
  switch (a) {
    case 0:
      b = fn();
      break;
    case 1:
      b = fn();
      b = fn();
      b = fn();
      break;
    case 2:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 3:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 4:
      b = fn();
      break;
    case 5:
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      b = fn();
      break;
    case 6:
      b = fn();
      break;
    case 7:
      break;
    case 8:
      b = fn();
      break;
    case 9:
      b = fn();
      break;
    default:
      break;
  }
  return b;
};
const diffArr = (a) =>
  Array.from({ length: 2 }, () => Math.floor(Math.random() * a.length))
    .map((x, y, z) => (y === 1 && z[y] === z[y - 1] ? (x === 0 ? x + 1 : x - 1) : x))
    .sort((a1, a2) => a1 - a2);
const isRemove = (a, b) => b.map((v, i) => (a.includes(i) ? null : v)).filter((x) => x !== null);

const memsArr = (fn, fn1, a) =>
  a
    .map((x, y) => fn(y, fn1(x)))
    .reverse()
    .reduce((i, j) => i + j, '');

const arrangemented = (a, fn1, fn2) => [fn2(repeatFn1, fn1, a), fn2(repeatFn2, fn1, a)]; // repeatFn1, repeatFn2... 회원 추가
const curryed2 = (f1) => (fn6) => (f2) => (f3) => (f4) => (x) => f1(f3(f4(x), x), f2, fn6);
const result2 = curryed2(arrangemented)(memsArr)(addCounter)(isRemove)(diffArr)(Array(12).fill(0));
console.log(result2);
console.log(result2.some((a) => a.includes(memberStr2)));
*/