/**
 * 快捷键模块
 * 提供全局键盘快捷键支持
 */
const Hotkeys = {
    /**
     * 快捷键配置
     */
    config: {
        // 视图切换
        'ctrl+1': () => ViewManager.showView('home'),
        'ctrl+2': () => ViewManager.showView('workspace'),
        'ctrl+3': () => ViewManager.showView('history'),
        'ctrl+4': () => ViewManager.showView('codex'),
        
        // 模式切换
        'ctrl+e': () => {
            ViewManager.setMode('encrypt');
            UIUtils.showToast('切换到加密模式');
        },
        'ctrl+d': () => {
            ViewManager.setMode('decrypt');
            UIUtils.showToast('切换到解密模式');
        },
        
        // 操作
        'ctrl+enter': () => {
            if (AppState.currentView === 'workspace') {
                CipherCore.execute();
            }
        },
        'ctrl+l': () => UIUtils.clearInput(),
        'ctrl+v': () => UIUtils.pasteText(),
        'ctrl+c': () => UIUtils.copyOutput(),
        
        // 功能
        'f1': () => showShortcutsHelp(),
        'f5': (e) => {
            e.preventDefault();
            UIUtils.showToast('刷新页面');
        }
    },

    /**
     * 初始化快捷键
     */
    init() {
        document.addEventListener('keydown', (e) => {
            const key = this.getKeyString(e);
            const handler = this.config[key];
            
            if (handler) {
                e.preventDefault();
                handler();
            }
        });
    },

    /**
     * 获取按键字符串
     */
    getKeyString(e) {
        const parts = [];
        
        if (e.ctrlKey) parts.push('ctrl');
        if (e.shiftKey) parts.push('shift');
        if (e.altKey) parts.push('alt');
        
        const key = e.key.toLowerCase();
        if (key.length === 1) {
            parts.push(key);
        } else if (key.startsWith('f') && /^\d+$/.test(key.slice(1))) {
            parts.push(key);
        } else if (key === 'enter') {
            parts.push('enter');
        }
        
        return parts.join('+');
    },

    /**
     * 注册快捷键
     */
    register(key, handler) {
        this.config[key] = handler;
    },

    /**
     * 注销快捷键
     */
    unregister(key) {
        delete this.config[key];
    }
};

/**
 * 显示快捷键帮助
 */
function showShortcutsHelp() {
    const shortcuts = `
        <div class="glass-panel rounded-2xl p-6 max-w-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-display text-xl font-bold flex items-center gap-2">
                    <i class="fas fa-keyboard text-neon-blue"></i>
                    快捷键帮助
                </h3>
                <button onclick="this.closest('.modal').remove()" class="text-gray-500 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="font-semibold text-neon-blue mb-2">视图切换</h4>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span>控制台</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+1</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>工作台</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+2</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>档案库</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+3</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>密码图鉴</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+4</kbd>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-neon-purple mb-2">模式切换</h4>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span>加密模式</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+E</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>解密模式</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+D</kbd>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-neon-green mb-2">快捷操作</h4>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span>执行操作</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+Enter</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>清空输入</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+L</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>粘贴文本</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+V</kbd>
                        </div>
                        <div class="flex justify-between">
                            <span>复制输出</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+C</kbd>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-neon-gold mb-2">其他</h4>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span>显示帮助</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded text-xs">F1</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50';
    modal.innerHTML = shortcuts;
    document.body.appendChild(modal);
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Hotkeys;
}
