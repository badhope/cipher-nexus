/**
 * 自定义密码生成器模块
 * 支持可配置的密码生成模式，包括长度、字符类型、排列规则等
 */

const PasswordGenerator = {
    // 字符集定义
    charSets: {
        digits: '0123456789',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    },

    // 密码强度评估
    strengthLevels: [
        { min: 0, label: '极弱', color: '#ff2a6d', tips: '密码长度太短或字符类型单一' },
        { min: 8, label: '弱', color: '#ff6b6b', tips: '建议增加长度和字符类型' },
        { min: 12, label: '中等', color: '#ffd700', tips: '还可以更强，考虑添加特殊符号' },
        { min: 16, label: '强', color: '#00ff9d', tips: '很好的密码！' },
        { min: 20, label: '极强', color: '#00f0ff', tips: '堡垒级安全！' }
    ],

    // 生成密码
    generate(options) {
        const {
            length = 16,
            useDigits = true,
            useLowercase = true,
            useUppercase = true,
            useSymbols = true,
            avoidAmbiguous = false,
            noRepeats = false,
            excludeChars = ''
        } = options;

        // 构建可用字符池
        let charPool = '';
        if (useDigits) charPool += this.charSets.digits;
        if (useLowercase) charPool += this.charSets.lowercase;
        if (useUppercase) charPool += this.charSets.uppercase;
        if (useSymbols) charPool += this.charSets.symbols;

        // 排除模糊字符 (0, O, 1, l, I)
        if (avoidAmbiguous) {
            charPool = charPool.replace(/[0O1lI]/g, '');
        }

        // 排除自定义字符
        if (excludeChars) {
            const escaped = excludeChars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            charPool = charPool.replace(new RegExp(escaped, 'g'), '');
        }

        if (charPool.length === 0) {
            throw new Error('没有可用的字符，请至少选择一种字符类型');
        }

        // 生成密码
        let password = '';
        const usedChars = new Set();

        // 确保每种选中的字符类型至少有一个
        if (useDigits) password += this.getRandomChar(this.charSets.digits);
        if (useLowercase) password += this.getRandomChar(this.charSets.lowercase);
        if (useUppercase) password += this.getRandomChar(this.charSets.uppercase);
        if (useSymbols) password += this.getRandomChar(this.charSets.symbols);

        // 填充剩余长度
        while (password.length < length) {
            const char = this.getRandomChar(charPool);
            
            if (noRepeats && usedChars.has(char)) {
                // 如果不允许重复且字符已使用，跳过
                if (usedChars.size >= charPool.length) {
                    throw new Error('字符池大小不足以生成无重复密码');
                }
                continue;
            }

            password += char;
            usedChars.add(char);
        }

        // 打乱密码
        password = this.shuffleString(password);

        return password;
    },

    // 评估密码强度
    evaluateStrength(password) {
        let score = 0;

        // 长度评分 (最多 40 分)
        if (password.length >= 8) score += 10;
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;
        if (password.length >= 20) score += 10;

        // 字符类型评分 (最多 40 分)
        if (/[0-9]/.test(password)) score += 10;
        if (/[a-z]/.test(password)) score += 10;
        if (/[A-Z]/.test(password)) score += 10;
        if (/[^a-zA-Z0-9]/.test(password)) score += 10;

        // 多样性评分 (最多 20 分)
        const uniqueChars = new Set(password).size;
        const diversity = uniqueChars / password.length;
        score += Math.floor(diversity * 20);

        // 扣分项：连续重复
        if (/(.)\1{2,}/.test(password)) score -= 10;
        
        // 扣分项：连续序列
        if (/012|123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(password.toLowerCase())) {
            score -= 5;
        }

        // 确保分数在 0-100 之间
        score = Math.max(0, Math.min(100, score));

        // 确定强度等级
        const level = this.strengthLevels.reduce((prev, curr) => {
            return password.length >= curr.min ? curr : prev;
        }, this.strengthLevels[0]);

        return {
            score,
            level: level.label,
            color: level.color,
            tips: level.tips,
            details: {
                length: password.length,
                uniqueChars: uniqueChars,
                hasDigits: /[0-9]/.test(password),
                hasLowercase: /[a-z]/.test(password),
                hasUppercase: /[A-Z]/.test(password),
                hasSymbols: /[^a-zA-Z0-9]/.test(password)
            }
        };
    },

    // 生成密码短语
    generatePassphrase(options = {}) {
        const {
            wordCount = 4,
            separator = '-',
            capitalize = false,
            includeNumber = false
        } = options;

        // 常用单词列表 (简化版)
        const commonWords = [
            'cipher', 'nexus', 'quantum', 'shadow', 'phantom', 'crypto', 'secure', 'protect',
            'guardian', ' fortress', 'vault', 'shield', 'stealth', 'phantom', 'mystery', 'enigma',
            'phoenix', 'dragon', 'titan', 'cosmos', 'nebula', 'stellar', 'vector', 'matrix',
            'alpha', 'omega', 'zenith', 'nexus', 'pulse', 'wave', 'storm', 'thunder',
            'blaze', 'frost', 'ember', 'spark', 'flame', 'inferno', 'glacier', 'tempest'
        ];

        const words = [];
        for (let i = 0; i < wordCount; i++) {
            let word = commonWords[Math.floor(Math.random() * commonWords.length)];
            if (capitalize) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }
            words.push(word);
        }

        let passphrase = words.join(separator);
        
        if (includeNumber) {
            passphrase += Math.floor(Math.random() * 1000);
        }

        return passphrase;
    },

    // 获取随机字符
    getRandomChar(charSet) {
        return charSet.charAt(Math.floor(Math.random() * charSet.length));
    },

    // 打乱字符串
    shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    },

    // 渲染生成器 UI
    renderUI() {
        return `
            <div class="password-generator">
                <div class="glass-panel rounded-2xl p-6">
                    <h3 class="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                        <i class="fas fa-key text-neon-blue"></i>
                        自定义密码生成器
                    </h3>
                    
                    <!-- 密码长度 -->
                    <div class="mb-6">
                        <label class="block text-sm text-gray-400 mb-2">
                            密码长度：<span id="pwdLengthValue" class="text-neon-blue font-bold">16</span>
                        </label>
                        <input type="range" id="pwdLength" min="8" max="32" value="16" 
                               class="w-full accent-neon-blue" 
                               oninput="document.getElementById('pwdLengthValue').textContent = this.value">
                        <div class="flex justify-between text-xs text-gray-600 mt-1">
                            <span>8</span>
                            <span>32</span>
                        </div>
                    </div>
                    
                    <!-- 字符类型选择 -->
                    <div class="mb-6">
                        <label class="block text-sm text-gray-400 mb-3">字符类型组合</label>
                        <div class="grid grid-cols-2 gap-3">
                            <label class="flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                                <input type="checkbox" id="useDigits" checked class="w-4 h-4 accent-neon-blue">
                                <span class="text-sm">
                                    <span class="text-neon-blue font-mono">0-9</span>
                                    <span class="text-gray-500 ml-2">数字</span>
                                </span>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                                <input type="checkbox" id="useLowercase" checked class="w-4 h-4 accent-neon-blue">
                                <span class="text-sm">
                                    <span class="text-neon-purple font-mono">a-z</span>
                                    <span class="text-gray-500 ml-2">小写字母</span>
                                </span>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                                <input type="checkbox" id="useUppercase" checked class="w-4 h-4 accent-neon-blue">
                                <span class="text-sm">
                                    <span class="text-neon-green font-mono">A-Z</span>
                                    <span class="text-gray-500 ml-2">大写字母</span>
                                </span>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                                <input type="checkbox" id="useSymbols" checked class="w-4 h-4 accent-neon-blue">
                                <span class="text-sm">
                                    <span class="text-neon-gold font-mono">!@#$</span>
                                    <span class="text-gray-500 ml-2">特殊符号</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- 高级选项 -->
                    <div class="mb-6">
                        <label class="block text-sm text-gray-400 mb-3">高级选项</label>
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                                <input type="checkbox" id="avoidAmbiguous" class="w-4 h-4 accent-neon-blue">
                                <span class="text-sm text-gray-300">
                                    排除模糊字符
                                    <span class="text-xs text-gray-500 block">避免 0, O, 1, l, I 等易混淆字符</span>
                                </span>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                                <input type="checkbox" id="noRepeats" class="w-4 h-4 accent-neon-blue">
                                <span class="text-sm text-gray-300">
                                    禁止重复字符
                                    <span class="text-xs text-gray-500 block">每个字符只出现一次</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- 排除字符 -->
                    <div class="mb-6">
                        <label class="block text-sm text-gray-400 mb-2">
                            排除特定字符
                            <span class="text-xs text-gray-600 block">输入不想在密码中出现的字符</span>
                        </label>
                        <input type="text" id="excludeChars" 
                               class="w-full bg-black/40 border border-gray-800 rounded-lg px-4 py-2 text-sm focus:border-neon-blue focus:outline-none"
                               placeholder="例如：0O1lI">
                    </div>
                    
                    <!-- 生成按钮 -->
                    <button onclick="generatePassword()" class="action-btn w-full py-4 rounded-xl font-display font-semibold tracking-wide mb-6">
                        <span class="flex items-center justify-center gap-2">
                            <i class="fas fa-magic"></i>
                            生成密码
                        </span>
                    </button>
                    
                    <!-- 生成结果 -->
                    <div id="passwordResult" class="hidden">
                        <div class="relative">
                            <div class="text-area w-full p-4 text-center font-mono text-lg text-neon-green break-all" id="generatedPassword"></div>
                            <button onclick="copyGeneratedPassword()" class="absolute right-2 top-2 p-2 text-gray-500 hover:text-neon-blue transition-colors">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                        
                        <!-- 强度指示器 -->
                        <div class="mt-4 p-4 rounded-xl bg-black/40">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-gray-400">密码强度</span>
                                <span id="strengthLabel" class="text-sm font-semibold"></span>
                            </div>
                            <div class="progress-bar h-2 mb-2">
                                <div id="strengthBar" class="progress-fill" style="width: 0%"></div>
                            </div>
                            <p id="strengthTips" class="text-xs text-gray-500"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// 全局函数
window.generatePassword = () => {
    const options = {
        length: parseInt(document.getElementById('pwdLength').value),
        useDigits: document.getElementById('useDigits').checked,
        useLowercase: document.getElementById('useLowercase').checked,
        useUppercase: document.getElementById('useUppercase').checked,
        useSymbols: document.getElementById('useSymbols').checked,
        avoidAmbiguous: document.getElementById('avoidAmbiguous').checked,
        noRepeats: document.getElementById('noRepeats').checked,
        excludeChars: document.getElementById('excludeChars').value
    };

    try {
        const password = PasswordGenerator.generate(options);
        const strength = PasswordGenerator.evaluateStrength(password);

        document.getElementById('generatedPassword').textContent = password;
        document.getElementById('passwordResult').classList.remove('hidden');
        
        // 更新强度显示
        const strengthLabel = document.getElementById('strengthLabel');
        const strengthBar = document.getElementById('strengthBar');
        const strengthTips = document.getElementById('strengthTips');
        
        strengthLabel.textContent = strength.level;
        strengthLabel.style.color = strength.color;
        strengthBar.style.width = strength.score + '%';
        strengthBar.style.background = strength.color;
        strengthTips.textContent = strength.tips;
        
        UIUtils.showToast('密码生成成功');
    } catch (e) {
        UIUtils.showToast(e.message, 'error');
    }
};

window.copyGeneratedPassword = () => {
    const password = document.getElementById('generatedPassword').textContent;
    navigator.clipboard.writeText(password).then(() => {
        UIUtils.showToast('已复制到剪贴板');
    }).catch(() => {
        UIUtils.showToast('复制失败', 'error');
    });
};
