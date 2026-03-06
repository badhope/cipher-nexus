/**
 * 密码操作核心模块
 * 负责执行加密/解密操作
 */
const CipherCore = {
    /**
     * 获取当前参数
     */
    getParams() {
        const cipher = AppState.currentCipher;
        if (cipher === 'caesar') return [AppState.params.caesar.shift];
        if (cipher === 'railfence') return [AppState.params.railfence.rails];
        if (cipher === 'vigenere') return [AppState.params.vigenere.key];
        if (cipher === 'affine') return [AppState.params.affine.a, AppState.params.affine.b];
        if (cipher === 'playfair') return [AppState.params.playfair.key];
        return [];
    },

    /**
     * 执行加密/解密操作
     */
    execute() {
        const inputText = document.getElementById('inputText');
        if (!inputText) return;
        
        const input = inputText.value;
        
        if (!input.trim()) {
            UIUtils.showToast('请输入文本内容', 'error');
            return;
        }
        
        const cipher = CipherLibrary[AppState.currentCipher];
        if (!cipher) {
            UIUtils.showToast('未选择密码算法', 'error');
            return;
        }
        
        const startTime = performance.now();
        let result;
        
        try {
            if (AppState.currentMode === 'encrypt') {
                result = cipher.encrypt(input, ...this.getParams());
            } else {
                if (!cipher.decrypt) {
                    UIUtils.showToast('该算法不支持解密 (单向哈希)', 'error');
                    return;
                }
                result = cipher.decrypt(input, ...this.getParams());
            }
            
            const endTime = performance.now();
            const processTime = endTime - startTime;
            
            // 更新输出
            UIUtils.updateOutput(result, processTime);
            
            // 保存历史
            this.saveHistory(input, result);
            
            // 更新统计
            AppState.incrementOps();
            ViewManager.updateStats();
            
            UIUtils.showToast('操作成功');
            
        } catch (e) {
            UIUtils.showToast('处理失败：' + e.message, 'error');
        }
    },

    /**
     * 保存历史记录
     */
    saveHistory(input, output) {
        const record = {
            id: Date.now(),
            input: input.substring(0, 100),
            output: output.substring(0, 100),
            fullInput: input,
            fullOutput: output,
            cipher: AppState.currentCipher,
            mode: AppState.currentMode,
            time: new Date().toLocaleString()
        };
        
        AppState.addHistoryRecord(record);
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CipherCore;
}
