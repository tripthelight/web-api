async function generateKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encryptData(
  data: string,
  key: CryptoKey
): Promise<{ iv: Uint8Array; encryptedData: Uint8Array }> {
  const encodedData = new TextEncoder().encode(data);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedData
  );
  return {
    iv: iv,
    encryptedData: new Uint8Array(encryptedData),
  };
}

async function decryptData(
  encryptedData: Uint8Array,
  key: CryptoKey,
  iv: Uint8Array
): Promise<string> {
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedData
  );
  return new TextDecoder().decode(decryptedData);
}

(async function () {
  try {
    // 키 생성
    const key: CryptoKey = await generateKey();

    // 회원번호 또는 기타 데이터
    const memberNumber: string = "1234567890";

    // 데이터 암호화
    const { iv, encryptedData } = await encryptData(memberNumber, key);

    console.log("암호화된 데이터:", encryptedData);
    console.log("IV:", iv);

    // 암호화된 데이터 해독
    const decryptedData: string = await decryptData(encryptedData, key, iv);
    console.log("해독된 데이터:", decryptedData);
  } catch (error) {
    console.error("에러 발생:", error);
  }
})();
