async function generateKey2(): Promise<CryptoKey> {
  // 암호화에 사용할 키를 생성합니다.
  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, // 키를 추출 가능하게 함
    ["encrypt", "decrypt"] // 암호화 및 복호화 권한 부여
  );

  return key;
}

async function encryptData2(
  data: ArrayBuffer,
  key: CryptoKey
): Promise<ArrayBuffer> {
  // 초기화 벡터 생성
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // 데이터를 암호화합니다.
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  );

  return encryptedData;
}

async function decryptData2(
  encryptedData: ArrayBuffer,
  key: CryptoKey,
  iv: Uint8Array
): Promise<ArrayBuffer> {
  // 데이터를 복호화합니다.
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedData
  );

  return decryptedData;
}

async function main() {
  let uint8Array1 = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

  // 문자열을 나타내는 배열의 요소는 중간에 존재합니다.
  // 배열의 복사 없이 문자열을 출력할 수 있습니다.
  const binaryString = uint8Array1.subarray(1, -1);

  // console.log(new TextDecoder().decode(binaryString));

  const uint8Array2 = new TextEncoder().encode("Hello");
  // console.log(uint8Array2);

  // // 데이터
  // const originalData = new TextEncoder().encode("12345678"); // 암호화할 데이터
  // console.log("Original Data:", originalData);

  // // 키 생성
  const key = await generateKey2();

  // // 데이터 암호화
  const encryptedData = await encryptData2(uint8Array1, key);
  console.log("Encrypted Data:", new Uint8Array(encryptedData));

  // 암호화된 데이터 복호화
  // const iv = new Uint8Array(encryptedData.slice(0, 12)); // 초기화 벡터 추출
  // const decryptedData = await decryptData2(encryptedData.slice(12), key, iv);
  // console.log("Decrypted Data:", new TextDecoder().decode(decryptedData));
}

main();
