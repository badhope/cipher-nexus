/**
 * 加密方法配置模块
 * 提供多种加密算法选择和自定义加密参数配置
 */

const EncryptionMethods = {
    // 加密算法库
    algorithms: [
        {
            id: 'aes-256-cbc',
            name: 'AES-256-CBC',
            category: 'symmetric',
            description: '高级加密标准，256 位密钥长度，CBC 模式',
            strength: '军事级',
            speed: '快',
            useCases: ['文件加密', '数据库加密', '安全通信'],
            params: [
                { key: 'keySize', label: '密钥长度', type: 'select', options: [128, 192, 256], default: 256 },
                { key: 'mode', label: '工作模式', type: 'select', options: ['CBC', 'ECB', 'CFB', 'OFB'], default: 'CBC' },
                { key: 'padding', label: '填充方式', type: 'select', options: ['PKCS7', 'ZeroPadding', 'NoPadding'], default: 'PKCS7' }
            ],
            securityRating: 95,
            color: 'neon-blue'
        },
        {
            id: 'aes-256-gcm',
            name: 'AES-256-GCM',
            category: 'symmetric',
            description: 'AES-GCM 模式，提供认证加密',
            strength: '军事级',
            speed: '极快',
            useCases: ['TLS/SSL', '磁盘加密', '实时通信'],
            params: [
                { key: 'keySize', label: '密钥长度', type: 'select', options: [256], default: 256 },
                { key: 'tagLength', label: '认证标签长度', type: 'select', options: [128, 120, 112, 104, 96], default: 128 }
            ],
            securityRating: 98,
            color: 'neon-green'
        },
        {
            id: 'rsa-2048',
            name: 'RSA-2048',
            category: 'asymmetric',
            description: '非对称加密，基于大数分解难题',
            strength: '高',
            speed: '慢',
            useCases: ['数字签名', '密钥交换', '证书验证'],
            params: [
                { key: 'keySize', label: '密钥长度', type: 'select', options: [1024, 2048, 4096, 8192], default: 2048 },
                { key: 'padding', label: '填充方案', type: 'select', options: ['OAEP', 'PKCS1v15'], default: 'OAEP' },
                { key: 'hash', label: '哈希算法', type: 'select', options: ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'], default: 'SHA-256' }
            ],
            securityRating: 90,
            color: 'neon-purple'
        },
        {
            id: 'ecc-p256',
            name: 'ECC P-256',
            category: 'asymmetric',
            description: '椭圆曲线加密，256 位提供与 RSA-3072 相当安全性',
            strength: '极高',
            speed: '中等',
            useCases: ['移动设备', 'IoT 设备', '区块链'],
            params: [
                { key: 'curve', label: '椭圆曲线', type: 'select', options: ['P-256', 'P-384', 'P-521', 'secp256k1'], default: 'P-256' }
            ],
            securityRating: 96,
            color: 'neon-gold'
        },
        {
            id: 'sha-256',
            name: 'SHA-256',
            category: 'hash',
            description: '安全哈希算法，256 位输出',
            strength: '高',
            speed: '快',
            useCases: ['密码存储', '数据完整性', '区块链'],
            params: [
                { key: 'iterations', label: '迭代次数', type: 'range', min: 1000, max: 100000, step: 1000, default: 10000 },
                { key: 'salt', label: '盐值长度', type: 'range', min: 8, max: 64, default: 16 }
            ],
            securityRating: 92,
            color: 'neon-red'
        },
        {
            id: 'bcrypt',
            name: 'bcrypt',
            category: 'hash',
            description: '自适应哈希函数，专为密码存储设计',
            strength: '极高',
            speed: '慢',
            useCases: ['密码存储', '用户认证'],
            params: [
                { key: 'cost', label: '成本因子', type: 'range', min: 4, max: 31, default: 10 },
                { key: 'salt', label: '盐值长度', type: 'range', min: 16, max: 128, default: 32 }
            ],
            securityRating: 97,
            color: 'neon-purple'
        },
        {
            id: 'chacha20',
            name: 'ChaCha20-Poly1305',
            category: 'symmetric',
            description: '流密码，软件实现性能优于 AES',
            strength: '军事级',
            speed: '极快',
            useCases: ['移动设备', '实时通信', 'TLS 1.3'],
            params: [
                { key: 'keySize', label: '密钥长度', type: 'select', options: [256], default: 256 },
                { key: 'nonce', label: 'Nonce 长度', type: 'select', options: [96, 64], default: 96 }
            ],
            securityRating: 96,
            color: 'neon-blue'
        },
        {
            id: 'sm2-sm3-sm4',
            name: '国密 SM2/SM3/SM4',
            category: 'mixed',
            description: '中国国家密码管理局发布的密码标准',
            strength: '高',
            speed: '快',
            useCases: ['政务系统', '金融系统', '国内合规'],
            params: [
                { key: 'algorithm', label: '算法选择', type: 'select', options: ['SM2(非对称)', 'SM3(哈希)', 'SM4(对称)'], default: 'SM2' },
                { key: 'curve', label: '曲线参数', type: 'select', options: ['推荐曲线', '自定义曲线'], default: '推荐曲线' }
            ],
            securityRating: 94,
            color: 'neon-gold'
        }
    ],

    // 加密流程配置
    encryptionFlows: [
        {
            id: 'standard',
            name: '标准加密流程',
            description: '适合大多数场景的平衡方案',
            steps: [
                { order: 1, action: 'generate_salt', label: '生成随机盐值' },
                { order: 2, action: 'derive_key', label: '密钥派生 (PBKDF2)' },
                { order: 3, action: 'encrypt_data', label: '加密数据 (AES-256-GCM)' },
                { order: 4, action: 'append_tag', label: '附加认证标签' }
            ],
            recommended: true
        },
        {
            id: 'high_security',
            name: '高安全流程',
            description: '对安全性要求极高的场景',
            steps: [
                { order: 1, action: 'generate_entropy', label: '收集高熵随机数' },
                { order: 2, action: 'generate_salt', label: '生成 64 位盐值' },
                { order: 3, action: 'derive_key_bcrypt', label: '密钥派生 (bcrypt, cost=12)' },
                { order: 4, action: 'encrypt_aes', label: 'AES-256-GCM 加密' },
                { order: 5, action: 'hmac_verify', label: 'HMAC-SHA512 验证' },
                { order: 6, action: 'encode_base64', label: 'Base64 编码输出' }
            ],
            recommended: false
        },
        {
            id: 'fast',
            name: '快速加密流程',
            description: '性能优先，适合实时通信',
            steps: [
                { order: 1, action: 'generate_nonce', label: '生成一次性随机数' },
                { order: 2, action: 'encrypt_chacha20', label: 'ChaCha20 加密' },
                { order: 3, action: 'append_poly1305', label: 'Poly1305 认证' }
            ],
            recommended: false
        }
    ],

    // 安全评级说明
    securityRatings: [
        { min: 90, label: '优秀', color: 'neon-green', desc: '可抵御已知所有攻击' },
        { min: 80, label: '良好', color: 'neon-blue', desc: '安全性高，适合大多数场景' },
        { min: 70, label: '中等', color: 'neon-gold', desc: '基本安全，建议升级' },
        { min: 60, label: '较弱', color: 'neon-red', desc: '存在风险，不推荐使用' },
        { min: 0, label: '危险', color: 'neon-red', desc: '已被破解，严禁使用' }
    ],

    // 获取算法详情
    getAlgorithm(algoId) {
        return this.algorithms.find(algo => algo.id === algoId);
    },

    // 获取某类算法
    getAlgorithmsByCategory(category) {
        return this.algorithms.filter(algo => algo.category === category);
    },

    // 评估安全等级
    evaluateSecurity(algorithm, params) {
        const baseRating = algorithm.securityRating;
        
        // 根据参数调整评分
        let adjustedRating = baseRating;
        
        // 密钥长度影响
        if (params.keySize) {
            if (params.keySize >= 256) adjustedRating += 2;
            else if (params.keySize < 128) adjustedRating -= 10;
        }
        
        // 迭代次数影响
        if (params.iterations) {
            if (params.iterations >= 10000) adjustedRating += 1;
            else if (params.iterations < 1000) adjustedRating -= 15;
        }
        
        // 成本因子影响
        if (params.cost) {
            if (params.cost >= 12) adjustedRating += 2;
            else if (params.cost < 10) adjustedRating -= 10;
        }
        
        // 限制在 0-100
        adjustedRating = Math.min(100, Math.max(0, adjustedRating));
        
        const rating = this.securityRatings.find(r => adjustedRating >= r.min);
        
        return {
            score: adjustedRating,
            level: rating.label,
            color: rating.color,
            description: rating.desc,
            recommendations: this.getRecommendations(algorithm, params)
        };
    },

    // 获取优化建议
    getRecommendations(algorithm, params) {
        const recommendations = [];
        
        // 密钥长度建议
        if (params.keySize && params.keySize < 256) {
            recommendations.push({
                type: 'warning',
                message: `建议将密钥长度提升至 256 位，当前 ${params.keySize} 位安全性不足`
            });
        }
        
        // 迭代次数建议
        if (params.iterations && params.iterations < 10000) {
            recommendations.push({
                type: 'warning',
                message: `建议增加迭代次数至 10000 以上，当前值易受暴力破解`
            });
        }
        
        // 成本因子建议
        if (params.cost && params.cost < 12) {
            recommendations.push({
                type: 'info',
                message: `考虑将 bcrypt 成本因子提升至 12 或更高，以增强抗暴力破解能力`
            });
        }
        
        // 模式建议
        if (params.mode && params.mode === 'ECB') {
            recommendations.push({
                type: 'danger',
                message: 'ECB 模式不安全！相同明文会产生相同密文，建议使用 CBC 或 GCM 模式'
            });
        }
        
        // 哈希算法建议
        if (params.hash && params.hash === 'SHA-1') {
            recommendations.push({
                type: 'danger',
                message: 'SHA-1 已被证明不安全，存在碰撞攻击风险，请使用 SHA-256 或更高'
            });
        }
        
        return recommendations;
    },

    // 生成密钥
    generateKey(algorithm, params) {
        const keySize = params.keySize || 256;
        const array = new Uint8Array(keySize / 8);
        crypto.getRandomValues(array);
        return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // 生成盐值
    generateSalt(length = 16) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    },

    // 渲染算法选择器
    renderAlgorithmSelector(selectedAlgo = 'aes-256-cbc') {
        return `
            <div class="algorithm-selector">
                <h3 class="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-shield-alt text-neon-blue"></i>
                    选择加密算法
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${this.algorithms.map(algo => `
                        <div class="glass-panel rounded-xl p-4 cursor-pointer transition-all hover:border-${algo.color}/50 ${selectedAlgo === algo.id ? `border-${algo.color} bg-${algo.color}/10` : 'border-gray-800'}" 
                             onclick="selectAlgorithm('${algo.id}')">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-display font-bold text-white">${algo.name}</h4>
                                <span class="badge badge-${algo.color}">${algo.category}</span>
                            </div>
                            <p class="text-xs text-gray-400 mb-3">${algo.description}</p>
                            <div class="flex items-center justify-between text-xs">
                                <span class="text-gray-500">强度：<span class="text-${algo.color}">${algo.strength}</span></span>
                                <span class="text-gray-500">速度：${algo.speed}</span>
                            </div>
                            <div class="mt-3 flex flex-wrap gap-1">
                                ${algo.useCases.slice(0, 2).map(use => `
                                    <span class="text-[10px] text-gray-600 bg-black/30 px-2 py-1 rounded">${use}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 渲染参数配置
    renderParamsConfig(algorithmId, currentParams = {}) {
        const algorithm = this.getAlgorithm(algorithmId);
        if (!algorithm) return '';
        
        return `
            <div class="params-config glass-panel rounded-xl p-6 mt-6">
                <h4 class="font-display font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-sliders-h text-neon-purple"></i>
                    配置加密参数 - ${algorithm.name}
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${algorithm.params.map(param => `
                        <div>
                            <label class="block text-sm text-gray-400 mb-2">${param.label}</label>
                            ${param.type === 'select' ? `
                                <select class="w-full bg-black/40 border border-gray-800 rounded-lg px-4 py-2 text-sm focus:border-neon-blue focus:outline-none" 
                                        onchange="updateAlgorithmParam('${algorithmId}', '${param.key}', this.value)">
                                    ${param.options.map(opt => `
                                        <option value="${opt}" ${currentParams[param.key] === opt || (!currentParams[param.key] && opt === param.default) ? 'selected' : ''}>
                                            ${opt}
                                        </option>
                                    `).join('')}
                                </select>
                            ` : param.type === 'range' ? `
                                <div>
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="text-xs text-gray-600">${param.min}</span>
                                        <span class="text-sm text-neon-blue font-bold" id="${param.key}Value">${currentParams[param.key] || param.default}</span>
                                        <span class="text-xs text-gray-600">${param.max}</span>
                                    </div>
                                    <input type="range" min="${param.min}" max="${param.max}" step="${param.step || 1}" 
                                           value="${currentParams[param.key] || param.default}"
                                           class="w-full accent-neon-blue"
                                           oninput="document.getElementById('${param.key}Value').textContent = this.value; updateAlgorithmParam('${algorithmId}', '${param.key}', this.value)">
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                
                <!-- 安全评级 -->
                <div class="mt-6 p-4 rounded-xl bg-black/40">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm text-gray-400">安全评级</span>
                        <span id="securityRatingLabel" class="text-sm font-semibold text-neon-green">优秀</span>
                    </div>
                    <div class="progress-bar h-3 mb-2">
                        <div id="securityRatingBar" class="progress-fill" style="width: ${algorithm.securityRating}%; background: ${this.getRatingColor(algorithm.securityRating)}"></div>
                    </div>
                    <p id="securityRatingDesc" class="text-xs text-gray-500 mb-3">可抵御已知所有攻击</p>
                    
                    <div id="securityRecommendations" class="space-y-2">
                        ${this.getRecommendations(algorithm, currentParams).map(rec => `
                            <div class="p-3 rounded-lg border ${rec.type === 'danger' ? 'bg-neon-red/10 border-neon-red/30 text-neon-red' : rec.type === 'warning' ? 'bg-neon-gold/10 border-neon-gold/30 text-neon-gold' : 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue'}">
                                <p class="text-xs">${rec.message}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    // 获取评级颜色
    getRatingColor(rating) {
        const ratingInfo = this.securityRatings.find(r => rating >= r.min);
        return ratingInfo ? `var(--${ratingInfo.color})` : 'var(--neon-red)';
    },

    // 渲染流程配置
    renderFlowSelector(selectedFlow = 'standard') {
        return `
            <div class="flow-selector mt-6">
                <h4 class="font-display font-semibold mb-4 flex items-center gap-2">
                    <i class="fas fa-project-diagram text-neon-gold"></i>
                    选择加密流程
                </h4>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    ${this.encryptionFlows.map(flow => `
                        <div class="glass-panel rounded-xl p-5 cursor-pointer transition-all hover:border-neon-blue/50 ${selectedFlow === flow.id ? 'border-neon-blue bg-neon-blue/10' : 'border-gray-800'}"
                             onclick="selectEncryptionFlow('${flow.id}')">
                            <div class="flex items-center justify-between mb-3">
                                <h5 class="font-display font-bold text-white">${flow.name}</h5>
                                ${flow.recommended ? '<span class="badge badge-neon-green">推荐</span>' : ''}
                            </div>
                            <p class="text-sm text-gray-400 mb-4">${flow.description}</p>
                            
                            <div class="space-y-2">
                                ${flow.steps.map(step => `
                                    <div class="flex items-center gap-3 text-xs">
                                        <div class="w-6 h-6 rounded-full bg-neon-blue/20 border border-neon-blue/50 flex items-center justify-center text-neon-blue font-bold flex-shrink-0">
                                            ${step.order}
                                        </div>
                                        <span class="text-gray-300">${step.label}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 完整渲染加密方法配置
    renderEncryptionMethods() {
        return `
            <div class="encryption-methods-container">
                <div class="mb-8">
                    <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
                        加密方法配置
                    </h2>
                    <p class="text-gray-400">选择并配置适合您需求的加密方案</p>
                </div>
                
                ${this.renderAlgorithmSelector('aes-256-cbc')}
                ${this.renderParamsConfig('aes-256-cbc', {})}
                ${this.renderFlowSelector('standard')}
                
                <!-- 测试加密 -->
                <div class="test-encryption glass-panel rounded-xl p-6 mt-6">
                    <h4 class="font-display font-semibold mb-4 flex items-center gap-2">
                        <i class="fas fa-flask text-neon-red"></i>
                        测试加密
                    </h4>
                    
                    <div class="mb-4">
                        <label class="block text-sm text-gray-400 mb-2">测试文本</label>
                        <textarea id="testEncryptInput" class="text-area w-full h-24 p-3 text-sm" placeholder="输入要加密的文本...">Hello, World!</textarea>
                    </div>
                    
                    <div class="flex gap-4">
                        <button onclick="testEncryption()" class="action-btn flex-1 py-3 rounded-lg font-display font-semibold">
                            <span class="flex items-center justify-center gap-2">
                                <i class="fas fa-lock"></i>
                                加密测试
                            </span>
                        </button>
                        <button onclick="testDecryption()" class="action-btn flex-1 py-3 rounded-lg font-display font-semibold">
                            <span class="flex items-center justify-center gap-2">
                                <i class="fas fa-unlock"></i>
                                解密测试
                            </span>
                        </button>
                    </div>
                    
                    <div id="testResult" class="mt-4 hidden">
                        <div class="p-4 bg-black/40 rounded-lg">
                            <div class="text-xs text-gray-500 mb-2">加密结果:</div>
                            <div id="encryptedOutput" class="font-mono text-neon-green break-all text-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// 全局函数
let currentAlgorithm = 'aes-256-cbc';
let currentFlow = 'standard';
let algorithmParams = {};

window.selectAlgorithm = (algoId) => {
    currentAlgorithm = algoId;
    const container = document.querySelector('.encryption-methods-container');
    container.innerHTML = `
        <div class="mb-8">
            <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
                加密方法配置
            </h2>
            <p class="text-gray-400">选择并配置适合您需求的加密方案</p>
        </div>
        ${EncryptionMethods.renderAlgorithmSelector(algoId)}
        ${EncryptionMethods.renderParamsConfig(algoId, algorithmParams[algoId] || {})}
        ${EncryptionMethods.renderFlowSelector(currentFlow)}
        <div class="test-encryption glass-panel rounded-xl p-6 mt-6">
            <h4 class="font-display font-semibold mb-4 flex items-center gap-2">
                <i class="fas fa-flask text-neon-red"></i>
                测试加密
            </h4>
            <div class="mb-4">
                <label class="block text-sm text-gray-400 mb-2">测试文本</label>
                <textarea id="testEncryptInput" class="text-area w-full h-24 p-3 text-sm" placeholder="输入要加密的文本...">Hello, World!</textarea>
            </div>
            <div class="flex gap-4">
                <button onclick="testEncryption()" class="action-btn flex-1 py-3 rounded-lg font-display font-semibold">
                    <span class="flex items-center justify-center gap-2">
                        <i class="fas fa-lock"></i>
                        加密测试
                    </span>
                </button>
                <button onclick="testDecryption()" class="action-btn flex-1 py-3 rounded-lg font-display font-semibold">
                    <span class="flex items-center justify-center gap-2">
                        <i class="fas fa-unlock"></i>
                        解密测试
                    </span>
                </button>
            </div>
            <div id="testResult" class="mt-4 hidden">
                <div class="p-4 bg-black/40 rounded-lg">
                    <div class="text-xs text-gray-500 mb-2">加密结果:</div>
                    <div id="encryptedOutput" class="font-mono text-neon-green break-all text-sm"></div>
                </div>
            </div>
        </div>
    `;
};

window.updateAlgorithmParam = (algoId, key, value) => {
    if (!algorithmParams[algoId]) {
        algorithmParams[algoId] = {};
    }
    algorithmParams[algoId][key] = value;
    
    // 重新渲染参数配置以更新安全评级
    const container = document.querySelector('.encryption-methods-container');
    const algoSelector = EncryptionMethods.renderAlgorithmSelector(algoId);
    const paramsConfig = EncryptionMethods.renderParamsConfig(algoId, algorithmParams[algoId]);
    const flowSelector = EncryptionMethods.renderFlowSelector(currentFlow);
    
    container.innerHTML = `
        <div class="mb-8">
            <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
                加密方法配置
            </h2>
            <p class="text-gray-400">选择并配置适合您需求的加密方案</p>
        </div>
        ${algoSelector}
        ${paramsConfig}
        ${flowSelector}
        <div class="test-encryption glass-panel rounded-xl p-6 mt-6">
            <h4 class="font-display font-semibold mb-4 flex items-center gap-2">
                <i class="fas fa-flask text-neon-red"></i>
                测试加密
            </h4>
            <div class="mb-4">
                <label class="block text-sm text-gray-400 mb-2">测试文本</label>
                <textarea id="testEncryptInput" class="text-area w-full h-24 p-3 text-sm" placeholder="输入要加密的文本...">Hello, World!</textarea>
            </div>
            <div class="flex gap-4">
                <button onclick="testEncryption()" class="action-btn flex-1 py-3 rounded-lg font-display font-semibold">
                    <span class="flex items-center justify-center gap-2">
                        <i class="fas fa-lock"></i>
                        加密测试
                    </span>
                </button>
                <button onclick="testDecryption()" class="action-btn flex-1 py-3 rounded-lg font-display font-semibold">
                    <span class="flex items-center justify-center gap-2">
                        <i class="fas fa-unlock"></i>
                        解密测试
                    </span>
                </button>
            </div>
            <div id="testResult" class="mt-4 hidden">
                <div class="p-4 bg-black/40 rounded-lg">
                    <div class="text-xs text-gray-500 mb-2">加密结果:</div>
                    <div id="encryptedOutput" class="font-mono text-neon-green break-all text-sm"></div>
                </div>
            </div>
        </div>
    `;
};

window.selectEncryptionFlow = (flowId) => {
    currentFlow = flowId;
    UIUtils.showToast(`已选择${EncryptionMethods.encryptionFlows.find(f => f.id === flowId).name}`);
};

window.testEncryption = () => {
    const input = document.getElementById('testEncryptInput');
    const resultDiv = document.getElementById('testResult');
    const output = document.getElementById('encryptedOutput');
    
    if (!input || !input.value) {
        UIUtils.showToast('请输入测试文本', 'error');
        return;
    }
    
    // 模拟加密（实际应调用加密库）
    const mockEncrypted = btoa(input.value).split('').reverse().join('');
    
    output.textContent = mockEncrypted;
    resultDiv.classList.remove('hidden');
    UIUtils.showToast('加密测试成功');
};

window.testDecryption = () => {
    const input = document.getElementById('testEncryptInput');
    const resultDiv = document.getElementById('testResult');
    const output = document.getElementById('encryptedOutput');
    
    if (!input || !input.value) {
        UIUtils.showToast('请输入测试文本', 'error');
        return;
    }
    
    // 模拟解密
    const mockDecrypted = atob(input.value.split('').reverse().join(''));
    
    output.textContent = mockDecrypted;
    resultDiv.classList.remove('hidden');
    UIUtils.showToast('解密测试成功');
};
