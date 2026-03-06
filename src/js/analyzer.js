/**
 * 密文强度分析模块
 * 分析加密文本的复杂度和安全性
 */
const CipherAnalyzer = {
    /**
     * 分析密文强度
     */
    analyze(text) {
        if (!text) return null;
        
        const analysis = {
            length: text.length,
            entropy: this.calculateEntropy(text),
            charDistribution: this.getCharDistribution(text),
            hasNumbers: /\d/.test(text),
            hasSpecialChars: /[^a-zA-Z0-9\s]/.test(text),
            uppercaseRatio: (text.match(/[A-Z]/g) || []).length / text.length,
            lowercaseRatio: (text.match(/[a-z]/g) || []).length / text.length,
            numberRatio: (text.match(/\d/g) || []).length / text.length,
            uniqueChars: new Set(text).size,
            score: 0,
            level: '弱',
            suggestions: []
        };
        
        // 计算综合评分
        analysis.score = this.calculateScore(analysis);
        
        // 确定强度等级
        if (analysis.score >= 80) {
            analysis.level = '强';
        } else if (analysis.score >= 60) {
            analysis.level = '中等';
        } else if (analysis.score >= 40) {
            analysis.level = '较弱';
        }
        
        // 生成建议
        analysis.suggestions = this.generateSuggestions(analysis);
        
        return analysis;
    },

    /**
     * 计算信息熵
     */
    calculateEntropy(text) {
        const freq = {};
        for (let char of text) {
            freq[char] = (freq[char] || 0) + 1;
        }
        
        let entropy = 0;
        const len = text.length;
        for (let count of Object.values(freq)) {
            const p = count / len;
            entropy -= p * Math.log2(p);
        }
        
        return entropy;
    },

    /**
     * 获取字符分布
     */
    getCharDistribution(text) {
        const freq = {};
        for (let char of text) {
            freq[char] = (freq[char] || 0) + 1;
        }
        
        // 返回前 10 个最频繁字符
        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([char, count]) => ({
                char,
                count,
                percentage: ((count / text.length) * 100).toFixed(2) + '%'
            }));
    },

    /**
     * 计算强度评分
     */
    calculateScore(analysis) {
        let score = 0;
        
        // 长度评分 (最高 30 分)
        if (analysis.length >= 64) score += 30;
        else if (analysis.length >= 32) score += 25;
        else if (analysis.length >= 16) score += 20;
        else if (analysis.length >= 8) score += 10;
        
        // 熵值评分 (最高 30 分)
        if (analysis.entropy >= 4) score += 30;
        else if (analysis.entropy >= 3) score += 25;
        else if (analysis.entropy >= 2) score += 15;
        else if (analysis.entropy >= 1) score += 10;
        
        // 字符多样性评分 (最高 20 分)
        const uniqueRatio = analysis.uniqueChars / analysis.length;
        if (uniqueRatio >= 0.5) score += 20;
        else if (uniqueRatio >= 0.3) score += 15;
        else if (uniqueRatio >= 0.2) score += 10;
        
        // 特殊字符评分 (最高 20 分)
        if (analysis.hasSpecialChars) score += 10;
        if (analysis.hasNumbers) score += 5;
        if (analysis.uppercaseRatio > 0.1 && analysis.lowercaseRatio > 0.1) score += 5;
        
        return Math.min(100, score);
    },

    /**
     * 生成改进建议
     */
    generateSuggestions(analysis) {
        const suggestions = [];
        
        if (analysis.length < 32) {
            suggestions.push('增加文本长度以提高安全性');
        }
        
        if (analysis.entropy < 3) {
            suggestions.push('增加字符的随机性和多样性');
        }
        
        if (!analysis.hasSpecialChars) {
            suggestions.push('考虑使用包含特殊字符的加密方式');
        }
        
        if (analysis.uniqueChars / analysis.length < 0.3) {
            suggestions.push('增加不同字符的使用频率');
        }
        
        if (analysis.uppercaseRatio > 0.9 || analysis.lowercaseRatio > 0.9) {
            suggestions.push('混合使用大小写字母可提高复杂度');
        }
        
        return suggestions;
    },

    /**
     * 渲染分析结果
     */
    render(analysis) {
        if (!analysis) return '';
        
        const levelColors = {
            '强': 'text-neon-green',
            '中等': 'text-neon-blue',
            '较弱': 'text-neon-gold',
            '弱': 'text-neon-red'
        };
        
        return `
            <div class="glass-panel rounded-xl p-4 mt-4">
                <h4 class="font-display text-sm font-semibold mb-3 flex items-center gap-2">
                    <i class="fas fa-chart-bar text-neon-purple"></i>
                    密文强度分析
                </h4>
                
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="text-xs">
                        <span class="text-gray-500">长度:</span>
                        <span class="text-neon-blue ml-2">${analysis.length} 字符</span>
                    </div>
                    <div class="text-xs">
                        <span class="text-gray-500">信息熵:</span>
                        <span class="text-neon-purple ml-2">${analysis.entropy.toFixed(2)} bits</span>
                    </div>
                    <div class="text-xs">
                        <span class="text-gray-500">唯一字符:</span>
                        <span class="text-neon-green ml-2">${analysis.uniqueChars} 个</span>
                    </div>
                    <div class="text-xs">
                        <span class="text-gray-500">强度等级:</span>
                        <span class="${levelColors[analysis.level]} ml-2 font-semibold">${analysis.level}</span>
                    </div>
                </div>
                
                <div class="mb-3">
                    <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500">综合评分</span>
                        <span class="text-neon-blue">${analysis.score}/100</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${analysis.score}%"></div>
                    </div>
                </div>
                
                ${analysis.suggestions.length > 0 ? `
                    <div class="text-xs text-gray-400">
                        <div class="font-semibold mb-2 text-neon-gold">改进建议:</div>
                        <ul class="list-disc list-inside space-y-1">
                            ${analysis.suggestions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CipherAnalyzer;
}
