/**
 * 视图管理器模块
 * 负责管理应用视图切换和 UI 状态
 */
const ViewManager = {
    /**
     * 切换到指定视图
     */
    showView(viewName) {
        AppState.currentView = viewName;
        
        // 隐藏所有视图
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        // 显示目标视图
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) {
            targetView.classList.add('active');
        }
        
        // 更新导航状态
        this.updateNavigation(viewName);
        
        // 特定视图初始化
        if (viewName === 'history') {
            HistoryManager.render();
        }
        if (viewName === 'codex') {
            this.renderCodex();
        }
        if (viewName === 'workspace') {
            this.renderCipherGrid();
        }
        
        // 更新统计
        this.updateStats();
    },

    /**
     * 更新导航状态
     */
    updateNavigation(viewName) {
        document.querySelectorAll('.nav-btn, .mobile-nav button').forEach(btn => {
            const isActive = btn.dataset.view === viewName;
            btn.classList.toggle('active', isActive);
            if (btn.closest('.mobile-nav')) {
                btn.classList.toggle('text-neon-blue', isActive);
                btn.classList.toggle('text-gray-500', !isActive);
            }
        });
    },

    /**
     * 进入工作台模式
     */
    enterWorkspace(mode) {
        AppState.currentMode = mode;
        this.setMode(mode);
        this.showView('workspace');
    },

    /**
     * 设置工作模式（加密/解密）
     */
    setMode(mode) {
        AppState.currentMode = mode;
        
        document.querySelectorAll('.mode-btn').forEach(btn => {
            const isActive = btn.dataset.mode === mode;
            
            // 移除所有样式
            btn.classList.remove('bg-neon-blue/20', 'bg-neon-green/20', 
                'border-neon-blue/50', 'border-neon-green/50',
                'text-neon-blue', 'text-neon-green',
                'bg-transparent', 'border-gray-700', 'text-gray-400');
            
            if (isActive) {
                if (mode === 'encrypt') {
                    btn.classList.add('bg-neon-blue/20', 'border-neon-blue/50', 'text-neon-blue');
                } else {
                    btn.classList.add('bg-neon-green/20', 'border-neon-green/50', 'text-neon-green');
                }
            } else {
                btn.classList.add('bg-transparent', 'border-gray-700', 'text-gray-400');
            }
        });
        
        const actionBtnText = document.getElementById('actionBtnText');
        if (actionBtnText) {
            actionBtnText.textContent = mode === 'encrypt' ? '执行加密' : '执行解密';
        }
    },

    /**
     * 渲染密码选择网格
     */
    renderCipherGrid() {
        const grid = document.getElementById('cipherGrid');
        if (!grid) return;
        
        grid.innerHTML = Object.entries(CipherLibrary).map(([key, cipher]) => `
            <div class="cipher-tile p-3 ${AppState.currentCipher === key ? 'selected' : ''}" 
                 onclick="CipherUI.selectCipher('${key}')">
                <div class="text-neon-blue mb-2">${cipher.icon}</div>
                <div class="text-xs font-semibold truncate">${cipher.name}</div>
                <div class="text-[10px] text-gray-500">${cipher.category}</div>
            </div>
        `).join('');
    },

    /**
     * 渲染密码图鉴
     */
    renderCodex() {
        const container = document.getElementById('codexContainer');
        if (!container) return;
        
        container.innerHTML = Object.entries(CipherLibrary).map(([key, cipher]) => `
            <div class="codex-card p-5">
                <div class="flex items-start gap-4">
                    <div class="text-neon-blue">${cipher.icon}</div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <h4 class="font-display font-semibold">${cipher.name}</h4>
                            <span class="tag text-neon-purple">${cipher.category}</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-2">${cipher.description}</p>
                        <div class="flex gap-2">
                            ${cipher.decrypt ? 
                                '<span class="tag text-neon-green">双向</span>' : 
                                '<span class="tag text-neon-red">单向</span>'}
                            ${cipher.hasParams ? '<span class="tag text-neon-gold">可配置</span>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * 更新统计信息
     */
    updateStats() {
        const stats = AppState.getStats();
        const statTotalOps = document.getElementById('statTotalOps');
        const statCiphers = document.getElementById('statCiphers');
        const statHistory = document.getElementById('statHistory');
        
        if (statTotalOps) statTotalOps.textContent = stats.totalOps;
        if (statCiphers) statCiphers.textContent = stats.ciphersCount;
        if (statHistory) statHistory.textContent = stats.historyCount;
    },

    /**
     * 渲染参数配置区域
     */
    renderParamConfig(key) {
        const config = document.getElementById('paramConfig');
        if (!config) return;
        
        const cipher = CipherLibrary[key];
        
        if (!cipher || !cipher.hasParams) {
            config.classList.add('hidden');
            return;
        }
        
        config.classList.remove('hidden');
        let html = '';
        
        if (key === 'caesar') {
            html = `
                <div class="flex items-center gap-4">
                    <span class="text-xs text-gray-400 w-16">偏移量:</span>
                    <input type="range" min="1" max="25" value="${AppState.params.caesar.shift}" 
                        class="flex-1 accent-neon-blue" 
                        oninput="AppState.params.caesar.shift = parseInt(this.value); document.getElementById('paramVal').textContent = this.value">
                    <span id="paramVal" class="text-neon-blue font-mono w-6 text-center">${AppState.params.caesar.shift}</span>
                </div>`;
        } else if (key === 'railfence') {
            html = `
                <div class="flex items-center gap-4">
                    <span class="text-xs text-gray-400 w-16">栅栏数:</span>
                    <input type="range" min="2" max="10" value="${AppState.params.railfence.rails}" 
                        class="flex-1 accent-neon-purple" 
                        oninput="AppState.params.railfence.rails = parseInt(this.value); document.getElementById('paramVal').textContent = this.value">
                    <span id="paramVal" class="text-neon-purple font-mono w-6 text-center">${AppState.params.railfence.rails}</span>
                </div>`;
        } else if (key === 'vigenere') {
            html = `
                <div class="flex items-center gap-4">
                    <span class="text-xs text-gray-400 w-16">密钥:</span>
                    <input type="text" value="${AppState.params.vigenere.key}" 
                        class="text-area flex-1 px-3 py-2 text-sm"
                        oninput="AppState.params.vigenere.key = this.value.toUpperCase().replace(/[^A-Z]/g, '')"
                        placeholder="输入密钥 (字母)">
                </div>`;
        } else if (key === 'affine') {
            html = `
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-400">参数 A:</span>
                        <input type="number" value="${AppState.params.affine.a}" min="1" max="25"
                            class="text-area flex-1 px-2 py-1 text-sm"
                            oninput="AppState.params.affine.a = parseInt(this.value)">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-400">参数 B:</span>
                        <input type="number" value="${AppState.params.affine.b}" min="0" max="25"
                            class="text-area flex-1 px-2 py-1 text-sm"
                            oninput="AppState.params.affine.b = parseInt(this.value)">
                    </div>
                </div>
                <p class="text-[10px] text-gray-500 mt-2">* 参数 A 必须与 26 互质 (1,3,5,7,9,11,15,17,19,21,23,25)</p>`;
        } else if (key === 'playfair') {
            html = `
                <div class="flex items-center gap-4">
                    <span class="text-xs text-gray-400 w-16">密钥:</span>
                    <input type="text" value="${AppState.params.playfair.key}" 
                        class="text-area flex-1 px-3 py-2 text-sm"
                        oninput="AppState.params.playfair.key = this.value.toUpperCase().replace(/[^A-Z]/g, '')"
                        placeholder="输入密钥">
                </div>`;
        }
        
        config.innerHTML = html;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViewManager;
}
