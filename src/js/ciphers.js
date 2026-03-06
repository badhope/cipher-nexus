/**
 * 密码算法库模块
 * 包含所有支持的密码算法实现
 */
const CipherLibrary = {
    // ==================== 古典密码 ====================
    morse: {
        name: '摩斯密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`,
        category: '古典',
        description: '使用点和划表示字母的电报编码系统',
        hasParams: false,
        map: {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
            '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.', ' ': '/'
        },
        encrypt: (text) => {
            return text.toUpperCase().split('').map(c => 
                CipherLibrary.morse.map[c] || c
            ).join(' ');
        },
        decrypt: (text) => {
            const reverseMap = Object.entries(CipherLibrary.morse.map).reduce((acc, [k, v]) => {
                acc[v] = k;
                return acc;
            }, {});
            return text.split(' ').map(c => reverseMap[c] || c).join('').replace('/', ' ');
        }
    },

    caesar: {
        name: '凯撒密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>`,
        category: '古典',
        description: '字母偏移加密，古罗马军事通信',
        hasParams: true,
        encrypt: (text, shift = 3) => {
            return text.split('').map(c => {
                if (c.match(/[a-z]/i)) {
                    const base = c === c.toUpperCase() ? 65 : 97;
                    return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
                }
                return c;
            }).join('');
        },
        decrypt: (text, shift = 3) => {
            return CipherLibrary.caesar.encrypt(text, 26 - shift);
        }
    },

    rot13: {
        name: 'ROT13',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6"/></svg>`,
        category: '古典',
        description: '字母旋转 13 位，ROT13 是自身的逆运算',
        hasParams: false,
        encrypt: (text) => CipherLibrary.caesar.encrypt(text, 13),
        decrypt: (text) => CipherLibrary.caesar.encrypt(text, 13)
    },

    atbash: {
        name: '埃特巴什',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="3"/></svg>`,
        category: '古典',
        description: '字母表镜像替换，最古老的替换密码之一',
        hasParams: false,
        encrypt: (text) => {
            return text.split('').map(c => {
                if (c.match(/[a-z]/i)) {
                    const base = c === c.toUpperCase() ? 65 : 97;
                    return String.fromCharCode(base + 25 - (c.charCodeAt(0) - base));
                }
                return c;
            }).join('');
        },
        decrypt: (text) => CipherLibrary.atbash.encrypt(text)
    },

    railfence: {
        name: '栅栏密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M3 6l6 12M9 6l6 12M15 6l6 12"/></svg>`,
        category: '古典',
        description: '按栅栏形状重排字符的置换密码',
        hasParams: true,
        encrypt: (text, rails = 2) => {
            if (rails >= text.length || rails < 2) return text;
            const fence = Array(rails).fill('').map(() => []);
            let rail = 0, dir = 1;
            for (let c of text) {
                fence[rail].push(c);
                rail += dir;
                if (rail === 0 || rail === rails - 1) dir *= -1;
            }
            return fence.flat().join('');
        },
        decrypt: (text, rails = 2) => {
            if (rails >= text.length || rails < 2) return text;
            const fence = Array(rails).fill(null).map(() => []);
            const pattern = [];
            let rail = 0, dir = 1;
            for (let i = 0; i < text.length; i++) {
                pattern.push(rail);
                rail += dir;
                if (rail === 0 || rail === rails - 1) dir *= -1;
            }
            const counts = Array(rails).fill(0);
            pattern.forEach(r => counts[r]++);
            let idx = 0;
            for (let r = 0; r < rails; r++) {
                fence[r] = text.slice(idx, idx + counts[r]).split('');
                idx += counts[r];
            }
            const pos = Array(rails).fill(0);
            return pattern.map(r => fence[r][pos[r]++]).join('');
        }
    },

    vigenere: {
        name: '维吉尼亚密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>`,
        category: '古典',
        description: '多表替换密码，使用密钥控制偏移量',
        hasParams: true,
        encrypt: (text, key = 'KEY') => {
            if (!key) return text;
            key = key.toUpperCase().replace(/[^A-Z]/g, '');
            let ki = 0;
            return text.split('').map(c => {
                if (c.match(/[a-z]/i)) {
                    const base = c === c.toUpperCase() ? 65 : 97;
                    const shift = key[ki % key.length].charCodeAt(0) - 65;
                    ki++;
                    return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
                }
                return c;
            }).join('');
        },
        decrypt: (text, key = 'KEY') => {
            if (!key) return text;
            key = key.toUpperCase().replace(/[^A-Z]/g, '');
            let ki = 0;
            return text.split('').map(c => {
                if (c.match(/[a-z]/i)) {
                    const base = c === c.toUpperCase() ? 65 : 97;
                    const shift = key[ki % key.length].charCodeAt(0) - 65;
                    ki++;
                    return String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base);
                }
                return c;
            }).join('');
        }
    },

    affine: {
        name: '仿射密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><line x1="4" y1="20" x2="20" y2="4"/><circle cx="8" cy="16" r="2"/><circle cx="16" cy="8" r="2"/></svg>`,
        category: '古典',
        description: '线性变换加密 y = ax + b',
        hasParams: true,
        encrypt: (text, a = 5, b = 8) => {
            const modInverse = (n, m) => {
                for (let i = 1; i < m; i++) {
                    if ((n * i) % m === 1) return i;
                }
                return -1;
            };
            if (modInverse(a, 26) === -1) return '错误：参数 a 必须与 26 互质';
            return text.split('').map(c => {
                if (c.match(/[a-z]/i)) {
                    const base = c === c.toUpperCase() ? 65 : 97;
                    return String.fromCharCode((a * (c.charCodeAt(0) - base) + b) % 26 + base);
                }
                return c;
            }).join('');
        },
        decrypt: (text, a = 5, b = 8) => {
            const modInverse = (n, m) => {
                for (let i = 1; i < m; i++) {
                    if ((n * i) % m === 1) return i;
                }
                return -1;
            };
            const aInv = modInverse(a, 26);
            if (aInv === -1) return '错误：参数 a 必须与 26 互质';
            return text.split('').map(c => {
                if (c.match(/[a-z]/i)) {
                    const base = c === c.toUpperCase() ? 65 : 97;
                    return String.fromCharCode((aInv * ((c.charCodeAt(0) - base) - b + 26)) % 26 + base);
                }
                return c;
            }).join('');
        }
    },

    bacon: {
        name: '培根密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
        category: '古典',
        description: '使用 A/B 五进制编码的替换密码',
        hasParams: false,
        encrypt: (text) => {
            const map = {
                'A': 'aaaaa', 'B': 'aaaab', 'C': 'aaaba', 'D': 'aaabb', 'E': 'aabaa',
                'F': 'aabab', 'G': 'aabba', 'H': 'aabbb', 'I': 'abaaa', 'J': 'abaab',
                'K': 'ababa', 'L': 'ababb', 'M': 'abbaa', 'N': 'abbab', 'O': 'abbba',
                'P': 'abbbb', 'Q': 'baaaa', 'R': 'baaab', 'S': 'baaba', 'T': 'baabb',
                'U': 'babaa', 'V': 'babab', 'W': 'babba', 'X': 'babbb', 'Y': 'bbaaa',
                'Z': 'bbaab'
            };
            return text.toUpperCase().split('').filter(c => c >= 'A' && c <= 'Z')
                .map(c => map[c]).join(' ').replace(/a/g, 'A').replace(/b/g, 'B');
        },
        decrypt: (text) => {
            const map = {
                'aaaaa': 'A', 'aaaab': 'B', 'aaaba': 'C', 'aaabb': 'D', 'aabaa': 'E',
                'aabab': 'F', 'aabba': 'G', 'aabbb': 'H', 'abaaa': 'I', 'abaab': 'J',
                'ababa': 'K', 'ababb': 'L', 'abbaa': 'M', 'abbab': 'N', 'abbba': 'O',
                'abbbb': 'P', 'baaaa': 'Q', 'baaab': 'R', 'baaba': 'S', 'baabb': 'T',
                'babaa': 'U', 'babab': 'V', 'babba': 'W', 'babbb': 'X', 'bbaaa': 'Y',
                'bbaab': 'Z'
            };
            return text.replace(/[^ABab]/g, '').toLowerCase().match(/.{5}/g)
                ?.map(g => map[g] || '?').join('') || '';
        }
    },

    playfair: {
        name: '普莱费尔密码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18M15 3v18M3 15h18"/></svg>`,
        category: '古典',
        description: '使用 5x5 矩阵的双字母替换密码',
        hasParams: true,
        encrypt: (text, key = 'PLAYFAIR') => {
            // 构建 5x5 矩阵
            const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
            key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
            let matrix = '';
            const seen = new Set();
            
            for (let c of key + alphabet) {
                if (!seen.has(c)) {
                    matrix += c;
                    seen.add(c);
                }
            }
            
            // 准备明文
            text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
            let prepared = '';
            for (let i = 0; i < text.length; i += 2) {
                prepared += text[i];
                if (i + 1 < text.length) {
                    if (text[i] === text[i + 1]) {
                        prepared += 'X';
                        i--;
                    } else {
                        prepared += text[i + 1];
                    }
                }
            }
            if (prepared.length % 2 === 1) prepared += 'X';
            
            // 加密
            let result = '';
            for (let i = 0; i < prepared.length; i += 2) {
                const a = prepared[i], b = prepared[i + 1];
                const posA = matrix.indexOf(a), posB = matrix.indexOf(b);
                const rowA = Math.floor(posA / 5), colA = posA % 5;
                const rowB = Math.floor(posB / 5), colB = posB % 5;
                
                if (rowA === rowB) {
                    result += matrix[(rowA * 5 + ((colA + 1) % 5))] + 
                              matrix[(rowB * 5 + ((colB + 1) % 5))];
                } else if (colA === colB) {
                    result += matrix[((((rowA + 1) % 5) * 5) + colA)] + 
                              matrix[((((rowB + 1) % 5) * 5) + colB)];
                } else {
                    result += matrix[(rowA * 5 + colB)] + matrix[(rowB * 5 + colA)];
                }
            }
            return result;
        },
        decrypt: (text, key = 'PLAYFAIR') => {
            const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
            key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
            let matrix = '';
            const seen = new Set();
            
            for (let c of key + alphabet) {
                if (!seen.has(c)) {
                    matrix += c;
                    seen.add(c);
                }
            }
            
            text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
            let result = '';
            
            for (let i = 0; i < text.length; i += 2) {
                const a = text[i], b = text[i + 1];
                const posA = matrix.indexOf(a), posB = matrix.indexOf(b);
                const rowA = Math.floor(posA / 5), colA = posA % 5;
                const rowB = Math.floor(posB / 5), colB = posB % 5;
                
                if (rowA === rowB) {
                    result += matrix[(rowA * 5 + ((colA - 1 + 5) % 5))] + 
                              matrix[(rowB * 5 + ((colB - 1 + 5) % 5))];
                } else if (colA === colB) {
                    result += matrix[((((rowA - 1 + 5) % 5) * 5) + colA)] + 
                              matrix[((((rowB - 1 + 5) % 5) * 5) + colB)];
                } else {
                    result += matrix[(rowA * 5 + colB)] + matrix[(rowB * 5 + colA)];
                }
            }
            return result.replace(/X/g, '');
        }
    },

    // ==================== 现代编码 ====================
    base64: {
        name: 'Base64',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>`,
        category: '现代',
        description: '二进制到文本的编码方案',
        hasParams: false,
        encrypt: (text) => btoa(unescape(encodeURIComponent(text))),
        decrypt: (text) => decodeURIComponent(escape(atob(text)))
    },

    binary: {
        name: '二进制',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/><path d="M10 7h4M7 10v4M14 17h0"/></svg>`,
        category: '现代',
        description: '字符转二进制表示',
        hasParams: false,
        encrypt: (text) => text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
        decrypt: (text) => text.split(' ').filter(b => b).map(b => String.fromCharCode(parseInt(b, 2))).join('')
    },

    hex: {
        name: '十六进制',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>`,
        category: '现代',
        description: '字符转十六进制表示',
        hasParams: false,
        encrypt: (text) => text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '),
        decrypt: (text) => text.split(' ').filter(h => h).map(h => String.fromCharCode(parseInt(h, 16))).join('')
    },

    url: {
        name: 'URL 编码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
        category: '现代',
        description: '网址安全编码',
        hasParams: false,
        encrypt: (text) => encodeURIComponent(text),
        decrypt: (text) => decodeURIComponent(text)
    },

    ascii: {
        name: 'ASCII 码',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/></svg>`,
        category: '现代',
        description: '字符转 ASCII 数值',
        hasParams: false,
        encrypt: (text) => text.split('').map(c => c.charCodeAt(0)).join(' '),
        decrypt: (text) => text.split(' ').filter(n => n).map(n => String.fromCharCode(parseInt(n))).join('')
    },

    reverse: {
        name: '反转',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
        category: '基础',
        description: '字符串顺序反转',
        hasParams: false,
        encrypt: (text) => text.split('').reverse().join(''),
        decrypt: (text) => text.split('').reverse().join('')
    },

    // ==================== 哈希算法 ====================
    md5: {
        name: 'MD5',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12l8-8"/><circle cx="20" cy="4" r="2"/></svg>`,
        category: '哈希',
        description: '消息摘要算法 (单向不可逆)',
        hasParams: false,
        encrypt: (text) => CryptoJS.MD5(text).toString(),
        decrypt: null
    },

    sha1: {
        name: 'SHA-1',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        category: '哈希',
        description: '安全哈希算法 (单向不可逆)',
        hasParams: false,
        encrypt: (text) => CryptoJS.SHA1(text).toString(),
        decrypt: null
    },

    sha256: {
        name: 'SHA-256',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        category: '哈希',
        description: '256 位安全哈希 (单向不可逆)',
        hasParams: false,
        encrypt: (text) => CryptoJS.SHA256(text).toString(),
        decrypt: null
    },

    sha512: {
        name: 'SHA-512',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M12 1v6M12 17v6"/></svg>`,
        category: '哈希',
        description: '512 位安全哈希 (单向不可逆)',
        hasParams: false,
        encrypt: (text) => CryptoJS.SHA512(text).toString(),
        decrypt: null
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CipherLibrary;
}
