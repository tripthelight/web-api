// ts파일과 함수명이 겹쳐서, 주석처리 ################################################################
// // 회원번호 또는 기타 데이터
// const memberNumber = "1234567890";

// // 암호화 키 생성
// async function generateKey() {
//   return await window.crypto.subtle.generateKey(
//     {
//       name: "AES-GCM",
//       length: 256,
//     },
//     true,
//     ["encrypt", "decrypt"]
//   );
// }

// // 데이터를 암호화하는 함수
// async function encryptData(data, key) {
//   const encodedData = new TextEncoder().encode(data);
//   const iv = window.crypto.getRandomValues(new Uint8Array(12));
//   const encryptedData = await window.crypto.subtle.encrypt(
//     {
//       name: "AES-GCM",
//       iv: iv,
//     },
//     key,
//     encodedData
//   );
//   return {
//     iv: iv,
//     encryptedData: new Uint8Array(encryptedData),
//   };
// }

// // 암호화된 데이터를 해독하는 함수
// async function decryptData(encryptedData, key, iv) {
//   const decryptedData = await window.crypto.subtle.decrypt(
//     {
//       name: "AES-GCM",
//       iv: iv,
//     },
//     key,
//     encryptedData
//   );
//   return new TextDecoder().decode(decryptedData);
// }

// // 실행
// (async function () {
//   try {
//     // 키 생성
//     const key = await generateKey();

//     // 데이터 암호화
//     const { iv, encryptedData } = await encryptData(memberNumber, key);

//     console.log("암호화된 데이터:", encryptedData);
//     console.log("IV:", iv);

//     // 암호화된 데이터 해독
//     const decryptedData = await decryptData(encryptedData, key, iv);
//     console.log("해독된 데이터:", decryptedData);
//   } catch (error) {
//     console.error("에러 발생:", error);
//   }
// })();
