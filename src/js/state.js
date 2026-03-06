/**
 * 应用状态管理模块
 * 负责管理全局应用状态和持久化存储
 */
const AppState = {
    currentView: 'home',
    currentMode: 'encrypt',
    currentCipher: 'morse',
    history: [],
    totalOps: 0,
    params: {
        caesar: { shift: 3 },
        railfence: { rails: 2 },
        vigenere: { key: 'KEY' },
        affine: { a: 5, b: 8 },
        playfair: { key: 'PLAYFAIR' },
        hill: { matrix: [[3, 3], [2, 5]] }
    },

    /**
     * 初始化状态
     */
    init() {
        this.loadFromStorage();
    },

    /**
     * 从本地存储加载数据
     */
    loadFromStorage() {
        try {
            const savedHistory = localStorage.getItem('cipherHistory');
            const savedOps = localStorage.getItem('totalOps');
            
            if (savedHistory) {
                this.history = JSON.parse(savedHistory);
            }
            
            if (savedOps) {
                this.totalOps = parseInt(savedOps, 10);
            }
        } catch (error) {
            console.error('加载存储数据失败:', error);
            this.history = [];
            this.totalOps = 0;
        }
    },

    /**
     * 保存数据到本地存储
     */
    saveToStorage() {
        try {
            localStorage.setItem('cipherHistory', JSON.stringify(this.history));
            localStorage.setItem('totalOps', this.totalOps.toString());
        } catch (error) {
            console.error('保存存储数据失败:', error);
        }
    },

    /**
     * 添加历史记录
     */
    addHistoryRecord(record) {
        this.history.unshift(record);
        
        // 限制历史记录数量为 50 条
        if (this.history.length > 50) {
            this.history.pop();
        }
        
        this.saveToStorage();
    },

    /**
     * 增加操作次数
     */
    incrementOps() {
        this.totalOps++;
        this.saveToStorage();
    },

    /**
     * 清空历史记录
     */
    clearHistory() {
        this.history = [];
        this.saveToStorage();
    },

    /**
     * 导出历史记录
     */
    exportHistory() {
        return JSON.stringify(this.history, null, 2);
    },

    /**
     * 获取统计信息
     */
    getStats() {
        return {
            totalOps: this.totalOps,
            historyCount: this.history.length,
            ciphersCount: Object.keys(CipherLibrary).length
        };
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppState;
}
