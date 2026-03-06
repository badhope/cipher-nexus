/**
 * 历史记录管理模块
 * 负责历史记录的渲染、管理和操作
 */
const HistoryManager = {
    /**
     * 渲染历史记录列表
     */
    render() {
        const container = document.getElementById('historyContainer');
        const empty = document.getElementById('emptyHistory');
        
        if (!container) return;
        
        if (AppState.history.length === 0) {
            container.innerHTML = '';
            if (empty) empty.classList.remove('hidden');
            return;
        }
        
        if (empty) empty.classList.add('hidden');
        
        container.innerHTML = AppState.history.map(item => `
            <div class="history-card p-4 cursor-pointer" onclick="HistoryManager.loadHistoryItem(${item.id})">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-display font-semibold ${item.mode === 'encrypt' ? 'text-neon-blue' : 'text-neon-green'}">
                            ${item.mode === 'encrypt' ? '加密' : '解密'}
                        </span>
                        <span class="text-xs text-gray-500">•</span>
                        <span class="text-xs text-neon-purple">${CipherLibrary[item.cipher]?.name || '未知'}</span>
                    </div>
                    <span class="text-[10px] text-gray-600">${item.time}</span>
                </div>
                <div class="text-xs text-gray-400 truncate">
                    <span class="text-gray-500">输入:</span> ${item.input}
                </div>
                <div class="text-xs text-gray-400 truncate mt-1">
                    <span class="text-gray-500">输出:</span> ${item.output}
                </div>
            </div>
        `).join('');
    },

    /**
     * 加载历史记录项
     */
    loadHistoryItem(id) {
        const item = AppState.history.find(h => h.id === id);
        if (!item) return;
        
        const inputText = document.getElementById('inputText');
        if (inputText) {
            inputText.value = item.fullInput;
        }
        
        AppState.currentCipher = item.cipher;
        AppState.currentMode = item.mode;
        
        ViewManager.setMode(item.mode);
        ViewManager.renderCipherGrid();
        ViewManager.renderParamConfig(item.cipher);
        ViewManager.showView('workspace');
        
        UIUtils.showToast('已加载历史记录');
    },

    /**
     * 清空所有历史记录
     */
    clearAll() {
        if (confirm('确定要清空所有历史记录吗？')) {
            AppState.clearHistory();
            this.render();
            UIUtils.showToast('历史记录已清空');
        }
    },

    /**
     * 导出历史记录
     */
    export() {
        const data = AppState.exportHistory();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cipher-history-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        UIUtils.showToast('历史记录已导出');
    },

    /**
     * 删除单条历史记录
     */
    deleteItem(id, event) {
        if (event) event.stopPropagation();
        
        const index = AppState.history.findIndex(h => h.id === id);
        if (index !== -1) {
            AppState.history.splice(index, 1);
            AppState.saveToStorage();
            this.render();
            UIUtils.showToast('记录已删除');
        }
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HistoryManager;
}
