/**
 * 批量处理模块
 * 支持批量加密/解密操作
 */
const BatchProcessor = {
    /**
     * 批量处理文本
     */
    processBatch(texts, callback) {
        const results = [];
        let processed = 0;
        
        texts.forEach((text, index) => {
            if (!text.trim()) return;
            
            try {
                const cipher = CipherLibrary[AppState.currentCipher];
                if (!cipher) return;
                
                let result;
                if (AppState.currentMode === 'encrypt') {
                    result = cipher.encrypt(text, ...CipherCore.getParams());
                } else {
                    if (!cipher.decrypt) {
                        results.push({
                            index,
                            input: text,
                            error: '该算法不支持解密'
                        });
                        return;
                    }
                    result = cipher.decrypt(text, ...CipherCore.getParams());
                }
                
                results.push({
                    index,
                    input: text,
                    output: result,
                    success: true
                });
                
            } catch (e) {
                results.push({
                    index,
                    input: text,
                    error: e.message
                });
            }
            
            processed++;
            if (callback) {
                callback(processed, texts.length);
            }
        });
        
        return results;
    },

    /**
     * 解析批量输入（按行分割）
     */
    parseInput(text) {
        return text.split('\n').filter(line => line.trim());
    },

    /**
     * 格式化批量输出
     */
    formatOutput(results) {
        return results.map(r => {
            if (r.success) {
                return `[${r.index + 1}] ${r.output}`;
            } else {
                return `[${r.index + 1}] 错误：${r.error}`;
            }
        }).join('\n');
    },

    /**
     * 导出批量结果为 CSV
     */
    exportToCSV(results) {
        const csvContent = [
            ['序号', '输入', '输出', '状态'],
            ...results.map(r => [
                r.index + 1,
                `"${r.input.replace(/"/g, '""')}"`,
                r.success ? `"${r.output.replace(/"/g, '""')}"` : '错误',
                r.success ? '成功' : '失败'
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `batch-cipher-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BatchProcessor;
}
