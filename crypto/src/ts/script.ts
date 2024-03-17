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

// 회원번호 리스트
const memberList: Array<Array<number>> = [
  [49, 50, 51, 52, 53, 54, 55, 56, 57, 48],
  [48, 57, 56, 55, 54, 53, 52, 51, 50, 49],
  [100, 111, 115, 105, 99, 117, 102, 107, 101, 102, 106],
  [49, 49, 50, 50, 51, 51, 52, 52, 53, 53],
];

(async function () {
  try {
    // 키 생성
    const key: CryptoKey = await generateKey();

    // 회원번호 또는 기타 데이터
    // const uint8Array1 = new TextEncoder().encode('1122334455'); // 나는 이 값을 가지고 있어야 함
    // console.log(uint8Array1);
    // console.log(new TextDecoder().decode(new Uint8Array(memberList[3])));

    const uint8Array2 = new Uint8Array(memberList[3]);

    // console.log(uint8Array2);

    // 데이터 암호화
    const { iv, encryptedData } = await encryptData(new TextDecoder().decode(uint8Array2), key);

    console.log('암호화된 데이터:', encryptedData);
    console.log('IV:', iv);

    // 암호화된 데이터 해독
    const decryptedData: string = await decryptData(encryptedData, key, iv);
    console.log('해독된 데이터:', decryptedData);
  } catch (error) {
    console.error('에러 발생:', error);
  }
})();
