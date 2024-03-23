async function generateKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
}

async function encryptData(
  data: string,
  key: CryptoKey,
): Promise<{ iv: Uint8Array; encryptedData: Uint8Array }> {
  const encodedData = new TextEncoder().encode(data);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encodedData,
  );
  return {
    iv: iv,
    encryptedData: new Uint8Array(encryptedData),
  };
}

async function decryptData(
  encryptedData: Uint8Array,
  key: CryptoKey,
  iv: Uint8Array,
): Promise<string> {
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encryptedData,
  );
  return new TextDecoder().decode(decryptedData);
}

// 회원정보 Array 리스트
const memberList: Array<string> = [
  '1029444315',
  '1055813527',
  '1101717731',
  '1106672421'
];

// function orderArray() {
//   return Array.from({ length: 10 }, (_, i) => i).sort(() => Math.random() - 0.5);
// }
// console.log(orderArray());

// 커링 변환을 하는 curry(f) 함수 (일반함수 ver)
// function curry1<A, B, C>(f: (a: A, b: B) => C): ((a: A) => (b: B) => C) {
//   return function(a: A) {
//     return function(b: B) {
//       return f(a, b);
//     };
//   };
// }
// function curry1<A, B, C>(f: (a: A, b: B) => C): (a: A) => (b: B) => C {
//   return (a: A) => (b: B) => f(a, b);
// }
// const curry2 = <A, B, C>(f: (a: A, b: B) => C) => (a: A) => (b: B) => f(a, b);
// const sum = (a: number, b: number) => a + b;
// const curriedSum = curry1(sum);
// console.log(curriedSum(1)(2)); // 3

function conditionalStatement (item: number, index: number) {
  if (index === 0 && item === index + 1) return true
  if (index === 1 && item === index + 1) return true
  if (index === 2 && item === index + 2) return true
  if (index === 3 && item === index + (-1)) return true
  if (index === 4 && item === index + 3) return true
  if (index === 5 && item === index + 1) return true
  if (index === 6 && item === index + 0) return true
  if (index === 7 && item === index + (-7)) return true
  if (index === 8 && item === index + (-7)) return true
  if (index === 9 && item === index + (-8)) return true
  return false
}

/**
 * 함수 4개가 필요
 * 회원번호를 reverse
 * reverse 한 회원번호를 map => conditionalStatement
 * map이 리턴한 배열을 reduce
 */

// function curryFn<A, B, C>(f: (a: A) => B): ((a: A) => B) {
//   return function(a: A) {
//     return f(a);
//   };
// }

(function () {
  const memberStr: string = '1106672421' // 받는 회원번호
  console.log(Array.from(memberStr));
  // const result = Array.from(memberStr)
  //   .reverse()
  //   .map((item, index) => {
  //     const intItem = parseInt(item)
  //     return conditionalStatement(intItem, index)
  //   })
  //   .reduce((acc, cur) => acc && cur, true);

  // console.log(result);

  // const result: boolean = strState.reduce((acc, cur) => acc && cur, true);
  // console.log(result);

  // function areAllTrue(arr: boolean[]): boolean {
  //     // reduce를 사용하여 모든 요소가 true인지 체크
  //     const result: boolean = arr.reduce((acc, cur) => acc && cur, true);

  //     return result;
  // }

  // // 사용 예시
  // const myArray: boolean[] = [true, true, true];
  // console.log(areAllTrue(myArray)); // 출력: true

  // const myArray2: boolean[] = [true, false, true];
  // console.log(areAllTrue(myArray2)); // 출력: false
  
})();

// 회원번호 encode 리스트
// const memberEncodeList: Array<Array<number>> = [
//   [49, 50, 51, 52, 53, 54, 55, 56, 57, 48],
//   [48, 57, 56, 55, 54, 53, 52, 51, 50, 49],
//   [100, 111, 115, 105, 99, 117, 102, 107, 101, 102, 106],
//   [49, 49, 50, 50, 51, 51, 52, 52, 53, 53],
// ];

// (async function () {
//   try {
//     // 키 생성
//     const key: CryptoKey = await generateKey();

//     // 회원번호 또는 기타 데이터
//     // const uint8Array1 = new TextEncoder().encode('1122334455'); // 나는 이 값을 가지고 있어야 함
//     // console.log(uint8Array1);
//     // console.log(new TextDecoder().decode(new Uint8Array(memberEncodeList[3])));

//     const uint8Array2 = new Uint8Array(memberEncodeList[3]);

//     // console.log(uint8Array2);

//     // 데이터 암호화
//     const { iv, encryptedData } = await encryptData(new TextDecoder().decode(uint8Array2), key);

//     console.log('암호화된 데이터:', encryptedData);
//     console.log('IV:', iv);

//     // 암호화된 데이터 해독
//     const decryptedData: string = await decryptData(encryptedData, key, iv);
//     console.log('해독된 데이터:', decryptedData);
//   } catch (error) {
//     console.error('에러 발생:', error);
//   }
// })();
