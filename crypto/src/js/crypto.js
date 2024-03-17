// 클라이언트에서 특정 회원번호를 암호화하는 함수
async function encryptClientMemberNumber(memberNumber) {
  // 암호화 키 생성
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // 회원번호를 Uint8Array로 변환
  const encodedMemberNumber = new TextEncoder().encode(memberNumber);

  // 암호화
  const encryptedMemberNumber = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: window.crypto.getRandomValues(new Uint8Array(12)) },
    key,
    encodedMemberNumber
  );

  return { key, encryptedMemberNumber };
}

// 서버에서 받은 회원번호를 암호화하는 함수
async function encryptServerMemberNumber(serverMemberNumber, key) {
  // 서버에서 받은 회원번호를 Uint8Array로 변환
  const encodedServerMemberNumber = new TextEncoder().encode(
    serverMemberNumber
  );

  // 암호화
  const encryptedServerMemberNumber = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: window.crypto.getRandomValues(new Uint8Array(12)) },
    key,
    encodedServerMemberNumber
  );

  return encryptedServerMemberNumber;
}

// 두 암호화된 값이 일치하는지 확인하는 함수
async function compareEncryptedValues(
  clientEncryptedValue,
  serverEncryptedValue,
  clientKey,
  serverKey
) {
  // 값 가져오기
  const clientKeyData = await window.crypto.subtle.exportKey("raw", clientKey);
  const serverKeyData = await window.crypto.subtle.exportKey("raw", serverKey);

  // console.log(JSON.stringify(clientEncryptedValue));
  // console.log(JSON.stringify(serverEncryptedValue));

  // 암호화된 데이터와 키가 같은지 확인
  const isEqualValue =
    JSON.stringify(clientEncryptedValue) ===
    JSON.stringify(serverEncryptedValue);
  const isEqualKey =
    JSON.stringify(clientKeyData) === JSON.stringify(serverKeyData);

  return isEqualValue && isEqualKey;
}

// 예시 실행
(async () => {
  // 클라이언트에서 특정 회원번호를 암호화
  const { key: clientKey, encryptedMemberNumber } =
    await encryptClientMemberNumber("123456");

  // 서버에서 받은 회원번호를 브라우저에서 암호화
  const serverMemberNumber = "123456"; // 서버에서 받은 회원번호
  const encryptedServerMemberNumber = await encryptServerMemberNumber(
    serverMemberNumber,
    clientKey
  );

  // 새로운 키 생성
  const serverKey = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  console.log(encryptedMemberNumber);
  console.log(encryptedServerMemberNumber);

  // 두 값 비교
  const isEqual = await compareEncryptedValues(
    encryptedMemberNumber,
    encryptedServerMemberNumber,
    clientKey,
    serverKey
  );
  console.log("두 값이 일치하는가?", isEqual);
})();
