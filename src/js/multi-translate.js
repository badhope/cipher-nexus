/**
 * 多重翻译模块
 * 支持同时翻译为多种格式（摩斯、二进制、十六进制等）
 */
const MultiTranslator = {
    /**
     * 预设翻译组合
     */
    presets: [
        {
            id: 'classic_triple',
            name: '古典三重奏',
            description: '摩斯 + 二进制 + 十六进制',
            ciphers: ['morse', 'binary', 'hex']
        },
        {
            id: 'modern_triple',
            name: '现代三重奏',
            description: 'Base64 + URL + ASCII',
            ciphers: ['base64', 'url', 'ascii']
        },
        {
            id: 'mixed_quad',
            name: '混合四重奏',
            description: '反转 + 凯撒 + 二进制 + 十六进制',
            ciphers: ['reverse', 'caesar', 'binary', 'hex'],
            params: { caesar: { shift: 3 } }
        },
        {
            id: 'custom',
            name: '自定义',
            description: '自由组合最多 5 种密码',
            ciphers: []
        }
    ],

    /**
     * 执行多重翻译
     */
    translate(text, presetId, customCiphers = []) {
        const preset = this.presets.find(p => p.id === presetId);
        if (!preset) {
            throw new Error('未找到翻译预设');
        }
        
        const ciphers = presetId === 'custom' ? customCiphers : preset.ciphers;
        
        if (ciphers.length === 0) {
            throw new Error('请选择至少一种翻译方式');
        }
        
        const results = {};
        
        ciphers.forEach(cipherKey => {
            const cipher = CipherLibrary[cipherKey];
            if (!cipher || !cipher.encrypt) {
                results[cipherKey] = {
                    error: `密码 ${cipherKey} 不存在`
                };
                return;
            }
            
            try {
                const params = preset.params && preset.params[cipherKey] ? 
                    Object.values(preset.params[cipherKey]) : [];
                results[cipherKey] = {
                    success: true,
                    output: cipher.encrypt(text, ...params)
                };
            } catch (e) {
                results[cipherKey] = {
                    error: e.message
                };
            }
        });
        
        return {
            input: text,
            preset: preset.name,
            results,
            timestamp: new Date().toLocaleString()
        };
    },

    /**
     * 渲染预设选择器
     */
    renderPresets(selectedId, onSelect) {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                ${this.presets.map(preset => `
                    <div class="cipher-tile p-4 ${selectedId === preset.id ? 'selected' : ''}" 
                         onclick="${onSelect}('${preset.id}')">
                        <div class="text-neon-blue mb-2 font-display font-semibold">${preset.name}</div>
                        <div class="text-xs text-gray-400 mb-2">${preset.description}</div>
                        <div class="flex flex-wrap gap-1">
                            ${preset.ciphers.map(c => `
                                <span class="tag text-neon-purple">${CipherLibrary[c].name}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    /**
     * 渲染自定义密码选择
     */
    renderCustomSelector(selectedCiphers, onToggle) {
        const availableCiphers = ['morse', 'binary', 'hex', 'base64', 'url', 'ascii', 'reverse', 'caesar', 'rot13', 'atbash'];
        
        return `
            <div class="glass-panel rounded-xl p-4 mb-4">
                <div class="text-sm font-semibold mb-3 flex items-center gap-2">
                    <i class="fas fa-sliders-h text-neon-gold"></i>
                    选择翻译方式（最多 5 种）
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    ${availableCiphers.map(key => `
                        <button onclick="${onToggle}('${key}')" 
                                class="px-3 py-2 rounded-lg text-xs font-display transition-all ${
                                    selectedCiphers.includes(key) ? 
                                    'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue' : 
                                    'bg-transparent border border-gray-700 text-gray-400'
                                }">
                            ${CipherLibrary[key].name}
                        </button>
                    `).join('')}
                </div>
                <div class="text-xs text-gray-500 mt-2">
                    已选：${selectedCiphers.length}/5
                </div>
            </div>
        `;
    },

    /**
     * 渲染翻译结果
     */
    renderResults(translationResult) {
        if (!translationResult) return '';
        
        return `
            <div class="space-y-3">
                ${Object.entries(translationResult.results).map(([key, result]) => `
                    <div class="glass-panel rounded-xl p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <div class="text-neon-blue">${CipherLibrary[key].icon}</div>
                                <span class="font-display font-semibold text-sm">${CipherLibrary[key].name}</span>
                            </div>
                            ${result.success ? 
                                '<span class="tag text-neon-green">成功</span>' : 
                                '<span class="tag text-neon-red">失败</span>'}
                        </div>
                        ${result.success ? `
                            <div class="text-area p-3 text-sm text-neon-green overflow-auto max-h-32">
                                ${result.output}
                            </div>
                            <div class="flex gap-2 mt-2">
                                <button onclick="navigator.clipboard.writeText('${result.output.replace(/'/g, "\\'")}'); UIUtils.showToast('已复制')" 
                                        class="text-xs text-gray-400 hover:text-neon-blue transition-colors">
                                    <i class="fas fa-copy mr-1"></i>复制
                                </button>
                            </div>
                        ` : `
                            <div class="text-xs text-neon-red">${result.error}</div>
                        `}
                    </div>
                `).join('')}
            </div>
        `;
    },

    /**
     * 导出翻译结果为 JSON
     */
    exportToJSON(translationResult) {
        const data = JSON.stringify(translationResult, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `multi-translate-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    /**
     * 导出翻译结果为文本
     */
    exportToText(translationResult) {
        let text = `多重翻译结果\n`;
        text += `================\n\n`;
        text += `原文：${translationResult.input}\n`;
        text += `预设：${translationResult.preset}\n`;
        text += `时间：${translationResult.timestamp}\n\n`;
        text += `================\n\n`;
        
        Object.entries(translationResult.results).forEach(([key, result]) => {
            text += `${CipherLibrary[key].name}:\n`;
            if (result.success) {
                text += `${result.output}\n`;
            } else {
                text += `错误：${result.error}\n`;
            }
            text += `\n`;
        });
        
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `multi-translate-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiTranslator;
}
