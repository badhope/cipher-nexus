/**
 * 组合密码模块
 * 支持 2-3 重密码组合加密/解密
 */
const ComboCipher = {
    /**
     * 组合配置
     */
    combos: [
        {
            id: 'double_caesar',
            name: '双重凯撒',
            description: '凯撒密码加密两次，使用不同偏移量',
            ciphers: ['caesar', 'caesar'],
            params: [
                { name: '偏移量 1', key: 'shift1', default: 3 },
                { name: '偏移量 2', key: 'shift2', default: 7 }
            ]
        },
        {
            id: 'caesar_reverse',
            name: '凯撒 + 反转',
            description: '先凯撒加密，再反转字符串',
            ciphers: ['caesar', 'reverse'],
            params: [
                { name: '偏移量', key: 'shift', default: 3 }
            ]
        },
        {
            id: 'triple_mix',
            name: '三重混合',
            description: '凯撒 + 反转 + 十六进制',
            ciphers: ['caesar', 'reverse', 'hex'],
            params: [
                { name: '偏移量', key: 'shift', default: 3 }
            ]
        },
        {
            id: 'vigenere_caesar',
            name: '维吉尼亚 + 凯撒',
            description: '先维吉尼亚加密，再凯撒加密',
            ciphers: ['vigenere', 'caesar'],
            params: [
                { name: '密钥', key: 'key', default: 'KEY' },
                { name: '偏移量', key: 'shift', default: 3 }
            ]
        },
        {
            id: 'morse_binary',
            name: '摩斯 + 二进制',
            description: '先转为摩斯密码，再转为二进制',
            ciphers: ['morse', 'binary'],
            params: []
        },
        {
            id: 'base64_reverse',
            name: 'Base64 + 反转',
            description: '先 Base64 编码，再反转字符串',
            ciphers: ['base64', 'reverse'],
            params: []
        }
    ],

    /**
     * 执行组合加密
     */
    encrypt(text, comboId, params) {
        const combo = this.combos.find(c => c.id === comboId);
        if (!combo) {
            throw new Error('未找到组合配置');
        }
        
        let result = text;
        const cipherParams = this.buildParams(combo, params);
        
        // 依次应用每个密码
        combo.ciphers.forEach((cipherKey, index) => {
            const cipher = CipherLibrary[cipherKey];
            if (!cipher || !cipher.encrypt) {
                throw new Error(`密码 ${cipherKey} 不存在或不支持加密`);
            }
            
            const param = cipherParams[index] || [];
            result = cipher.encrypt(result, ...param);
        });
        
        return result;
    },

    /**
     * 执行组合解密
     */
    decrypt(text, comboId, params) {
        const combo = this.combos.find(c => c.id === comboId);
        if (!combo) {
            throw new Error('未找到组合配置');
        }
        
        let result = text;
        const cipherParams = this.buildParams(combo, params);
        
        // 逆序应用每个密码的解密
        for (let i = combo.ciphers.length - 1; i >= 0; i--) {
            const cipherKey = combo.ciphers[i];
            const cipher = CipherLibrary[cipherKey];
            
            if (!cipher || !cipher.decrypt) {
                throw new Error(`密码 ${cipherKey} 不存在或不支持解密`);
            }
            
            const param = cipherParams[i] || [];
            result = cipher.decrypt(result, ...param);
        }
        
        return result;
    },

    /**
     * 构建参数数组
     */
    buildParams(combo, userParams) {
        const params = [];
        
        combo.params.forEach((paramDef, index) => {
            const value = userParams ? userParams[paramDef.key] : paramDef.default;
            const cipherKey = combo.ciphers[index];
            const cipher = CipherLibrary[cipherKey];
            
            // 根据密码类型构建参数
            if (cipherKey === 'caesar') {
                params.push([parseInt(value) || paramDef.default]);
            } else if (cipherKey === 'vigenere') {
                params.push([value || paramDef.default]);
            } else {
                params.push([]);
            }
        });
        
        return params;
    },

    /**
     * 渲染组合选择器
     */
    renderSelector(selectedId, onChange) {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                ${this.combos.map(combo => `
                    <div class="cipher-tile p-4 ${selectedId === combo.id ? 'selected' : ''}" 
                         onclick="${onChange}('${combo.id}')">
                        <div class="text-neon-blue mb-2 font-display font-semibold">${combo.name}</div>
                        <div class="text-xs text-gray-400 mb-2">${combo.description}</div>
                        <div class="flex flex-wrap gap-1">
                            ${combo.ciphers.map(c => `
                                <span class="tag text-neon-purple">${CipherLibrary[c].name}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    /**
     * 渲染参数配置
     */
    renderParams(comboId, params, onChange) {
        const combo = this.combos.find(c => c.id === comboId);
        if (!combo || combo.params.length === 0) {
            return '';
        }
        
        return `
            <div class="mt-4 pt-4 border-t border-white/5">
                <div class="text-xs text-gray-400 mb-3">组合参数配置:</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${combo.params.map(param => `
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-400 w-20">${param.name}:</span>
                            ${param.key.includes('shift') ? `
                                <input type="range" min="1" max="25" 
                                    value="${params[param.key] || param.default}"
                                    class="flex-1 accent-neon-blue"
                                    oninput="${onChange}('${param.key}', parseInt(this.value))">
                                <span class="text-neon-blue font-mono w-6 text-center">${params[param.key] || param.default}</span>
                            ` : `
                                <input type="text" value="${params[param.key] || param.default}"
                                    class="text-area flex-1 px-3 py-2 text-sm"
                                    oninput="${onChange}('${param.key}', this.value)">
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComboCipher;
}
