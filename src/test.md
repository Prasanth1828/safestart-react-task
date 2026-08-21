const VERSION = 1;

/**
 * ============================================
 * SECURE RANDOM
 * ============================================
 */

function secureRandom(max) {
  const arr = new Uint32Array(1);
  globalThis.crypto.getRandomValues(arr);

  return arr[0] % max;
}

/**
 * ============================================
 * ENCRYPT
 * ============================================
 */

export function encodeText(text) {
  // Text -> Bytes
  const bytes = new TextEncoder().encode(text);

  // Random values
  const shift = secureRandom(10) + 1;
  const xorKey = secureRandom(256);

  // Rotate
  const rotated = rotateLeft(bytes, shift);

  // XOR
  const xored = xorBytes(rotated, xorKey);

  // Obfuscate with minimal junk
  const obfuscated = obfuscate(xored);

  // Final payload
  const payload = Uint8Array.from([
    VERSION,
    shift,
    xorKey,
    ...obfuscated,
  ]);

  // Base64URL instead of HEX
  return bytesToBase64Url(payload);
}

/**
 * ============================================
 * DECRYPT
 * ============================================
 */

export function decodeText(encodedString) {
  // Base64URL -> Bytes
  const data = base64UrlToBytes(encodedString);

  let offset = 0;

  // Version
  const version = data[offset];
  offset += 1;

  if (version !== VERSION) {
    throw new Error(`Unsupported version: ${version}`);
  }

  // Shift
  const shift = data[offset];
  offset += 1;

  // XOR key
  const xorKey = data[offset];
  offset += 1;

  // Remaining data
  const obfuscated = data.slice(offset);

  // Remove junk
  const xored = deobfuscate(obfuscated);

  // XOR again
  const rotated = xorBytes(xored, xorKey);

  // Rotate back
  const original = rotateRight(rotated, shift);

  // Bytes -> Text
  return new TextDecoder().decode(original);
}

/**
 * ============================================
 * XOR
 * ============================================
 */

function xorBytes(bytes, key) {
  return Uint8Array.from(
    bytes,
    (b) => b ^ key
  );
}

/**
 * ============================================
 * ROTATE
 * ============================================
 */

function rotateLeft(bytes, shift) {
  return Uint8Array.from(
    bytes,
    (b) => rotl8(b, shift)
  );
}

function rotateRight(bytes, shift) {
  return Uint8Array.from(
    bytes,
    (b) => rotr8(b, shift)
  );
}

function rotl8(value, shift) {
  const normalizedShift = shift & 7;

  return (
    (
      (value << normalizedShift) |
      (value >>> (8 - normalizedShift))
    ) & 0xff
  );
}

function rotr8(value, shift) {
  const normalizedShift = shift & 7;

  return (
    (
      (value >>> normalizedShift) |
      (value << (8 - normalizedShift))
    ) & 0xff
  );
}

/**
 * ============================================
 * OBFUSCATION
 *
 * Junk: 0 or 1 byte only
 * ============================================
 */

function obfuscate(source) {
  const result = [];
  let index = 0;

  while (index < source.length) {
    // Chunk size: 1 - 6
    const chunkSize = Math.min(
      source.length - index,
      secureRandom(6) + 1
    );

    // Store chunk size
    result.push(chunkSize);

    // Store actual data
    for (let i = 0; i < chunkSize; i += 1) {
      result.push(source[index + i]);
    }

    index += chunkSize;

    // Add minimal junk
    if (index < source.length) {
      // 0 or 1 junk byte
      const junkLen = secureRandom(2);

      result.push(junkLen);

      for (let i = 0; i < junkLen; i += 1) {
        result.push(secureRandom(256));
      }
    } else {
      // End marker
      result.push(0);
    }
  }

  return Uint8Array.from(result);
}

/**
 * ============================================
 * DEOBFUSCATION
 * ============================================
 */

function deobfuscate(data) {
  const result = [];
  let offset = 0;

  while (offset < data.length) {
    // Read chunk length
    const chunkLen = data[offset];
    offset += 1;

    // Read actual data
    for (let i = 0; i < chunkLen; i += 1) {
      if (offset >= data.length) {
        throw new Error("Invalid encoded data");
      }

      result.push(data[offset]);
      offset += 1;
    }

    // Read junk length
    if (offset >= data.length) {
      break;
    }

    const junkLen = data[offset];
    offset += 1;

    // Skip junk
    offset += junkLen;

    if (offset > data.length) {
      throw new Error("Invalid encoded data");
    }
  }

  return Uint8Array.from(result);
}

/**
 * ============================================
 * BASE64URL ENCODING
 * ============================================
 */

function bytesToBase64Url(bytes) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * ============================================
 * BASE64URL DECODING
 * ============================================
 */

function base64UrlToBytes(value) {
  // Base64URL -> Base64
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  // Add padding
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  const binary = atob(padded);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;

 
}

 const val =
  "JkLe2uxeaRsvyBEauUrRhyoMC+4fEPOWLqg0HKpcXwezo5+vF+1FYxsoFAoh53fYPkogIQgZiTmZgnyQ3aDhNN4/HXnVFV1KfmriQu1W59Utn4+XBZQ=";

console.log('val',val.length)
const encrypted = encodeText(val);

console.log("Encrypted:", encrypted);
console.log("Encrypted:", encrypted.length);
console.log('==================================')
const decrypted = decodeText(encrypted);

console.log("Decrypted:", decrypted);

console.log("Match:", val === decrypted);
