/**
 * 设置管理模块
 * 管理应用设置（主题、音效、语言等）
 */
const Settings = {
    /**
     * 默认设置
     */
    defaults: {
        theme: 'cyberpunk',
        sound: true,
        language: 'zh-CN',
        autoSave: true,
        confirmDelete: true,
        showAnimations: true,
        compactMode: false
    },

    /**
     * 当前设置
     */
    current: {},

    /**
     * 初始化设置
     */
    init() {
        this.load();
    },

    /**
     * 加载设置
     */
    load() {
        try {
            const saved = localStorage.getItem('cipherSettings');
            this.current = saved ? JSON.parse(saved) : { ...this.defaults };
        } catch (e) {
            this.current = { ...this.defaults };
        }
        this.apply();
    },

    /**
     * 保存设置
     */
    save() {
        try {
            localStorage.setItem('cipherSettings', JSON.stringify(this.current));
            this.apply();
            UIUtils.showToast('设置已保存');
        } catch (e) {
            UIUtils.showToast('保存失败', 'error');
        }
    },

    /**
     * 应用设置
     */
    apply() {
        // 应用主题
        this.applyTheme(this.current.theme);
        
        // 应用动画设置
        if (!this.current.showAnimations) {
            document.documentElement.style.setProperty('--transition-base', '0s');
        }
        
        // 应用紧凑模式
        if (this.current.compactMode) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
    },

    /**
     * 应用主题
     */
    applyTheme(themeName) {
        const themes = {
            cyberpunk: {
                bg: '#05080f',
                primary: '#00f0ff',
                secondary: '#bf00ff'
            },
            deepspace: {
                bg: '#0a0e1a',
                primary: '#00d4ff',
                secondary: '#9d00ff'
            },
            aurora: {
                bg: '#f0f4f8',
                primary: '#0066ff',
                secondary: '#6600ff'
            }
        };
        
        const theme = themes[themeName] || themes.cyberpunk;
        
        document.documentElement.style.setProperty('--theme-bg', theme.bg);
        document.documentElement.style.setProperty('--theme-primary', theme.primary);
        document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    },

    /**
     * 更新设置
     */
    update(key, value) {
        this.current[key] = value;
        this.save();
    },

    /**
     * 重置设置
     */
    reset() {
        if (confirm('确定要重置所有设置吗？')) {
            this.current = { ...this.defaults };
            this.save();
        }
    },

    /**
     * 渲染设置面板
     */
    render() {
        return `
            <div class="glass-panel rounded-2xl p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-display text-xl font-bold flex items-center gap-2">
                        <i class="fas fa-cog text-neon-gold"></i>
                        系统设置
                    </h3>
                    <button onclick="Settings.reset()" class="text-xs text-gray-400 hover:text-neon-red transition-colors">
                        <i class="fas fa-undo mr-1"></i>重置
                    </button>
                </div>
                
                <div class="space-y-6">
                    <!-- 主题选择 -->
                    <div>
                        <label class="text-sm font-semibold mb-3 block">主题风格</label>
                        <div class="grid grid-cols-3 gap-3">
                            <button onclick="Settings.update('theme', 'cyberpunk')" 
                                    class="p-4 rounded-xl border-2 transition-all ${this.current.theme === 'cyberpunk' ? 'border-neon-blue bg-neon-blue/10' : 'border-gray-700'}">
                                <div class="w-full h-16 rounded-lg mb-2" style="background: linear-gradient(135deg, #05080f, #0a1020);"></div>
                                <div class="text-xs font-semibold">赛博朋克</div>
                            </button>
                            <button onclick="Settings.update('theme', 'deepspace')" 
                                    class="p-4 rounded-xl border-2 transition-all ${this.current.theme === 'deepspace' ? 'border-neon-blue bg-neon-blue/10' : 'border-gray-700'}">
                                <div class="w-full h-16 rounded-lg mb-2" style="background: linear-gradient(135deg, #0a0e1a, #1a1f3a);"></div>
                                <div class="text-xs font-semibold">深空秘境</div>
                            </button>
                            <button onclick="Settings.update('theme', 'aurora')" 
                                    class="p-4 rounded-xl border-2 transition-all ${this.current.theme === 'aurora' ? 'border-neon-blue bg-neon-blue/10' : 'border-gray-700'}">
                                <div class="w-full h-16 rounded-lg mb-2" style="background: linear-gradient(135deg, #f0f4f8, #e0e8f0);"></div>
                                <div class="text-xs font-semibold">极光之境</div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 功能开关 -->
                    <div class="space-y-3">
                        <label class="text-sm font-semibold">功能选项</label>
                        
                        <div class="flex items-center justify-between p-3 rounded-lg bg-black/20">
                            <div class="text-sm">
                                <div class="font-semibold">音效反馈</div>
                                <div class="text-xs text-gray-500">操作时播放音效</div>
                            </div>
                            <button onclick="Settings.update('sound', !this.current.sound)" 
                                    class="w-12 h-6 rounded-full transition-all ${this.current.sound ? 'bg-neon-blue/50' : 'bg-gray-700'}">
                                <div class="w-5 h-5 rounded-full bg-white transform transition-transform ${this.current.sound ? 'translate-x-6' : 'translate-x-1'}"></div>
                            </button>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-lg bg-black/20">
                            <div class="text-sm">
                                <div class="font-semibold">动画效果</div>
                                <div class="text-xs text-gray-500">显示过渡动画</div>
                            </div>
                            <button onclick="Settings.update('showAnimations', !this.current.showAnimations)" 
                                    class="w-12 h-6 rounded-full transition-all ${this.current.showAnimations ? 'bg-neon-blue/50' : 'bg-gray-700'}">
                                <div class="w-5 h-5 rounded-full bg-white transform transition-transform ${this.current.showAnimations ? 'translate-x-6' : 'translate-x-1'}"></div>
                            </button>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-lg bg-black/20">
                            <div class="text-sm">
                                <div class="font-semibold">紧凑模式</div>
                                <div class="text-xs text-gray-500">减小间距和字体</div>
                            </div>
                            <button onclick="Settings.update('compactMode', !this.current.compactMode)" 
                                    class="w-12 h-6 rounded-full transition-all ${this.current.compactMode ? 'bg-neon-blue/50' : 'bg-gray-700'}">
                                <div class="w-5 h-5 rounded-full bg-white transform transition-transform ${this.current.compactMode ? 'translate-x-6' : 'translate-x-1'}"></div>
                            </button>
                        </div>
                        
                        <div class="flex items-center justify-between p-3 rounded-lg bg-black/20">
                            <div class="text-sm">
                                <div class="font-semibold">删除确认</div>
                                <div class="text-xs text-gray-500">删除前显示确认对话框</div>
                            </div>
                            <button onclick="Settings.update('confirmDelete', !this.current.confirmDelete)" 
                                    class="w-12 h-6 rounded-full transition-all ${this.current.confirmDelete ? 'bg-neon-blue/50' : 'bg-gray-700'}">
                                <div class="w-5 h-5 rounded-full bg-white transform transition-transform ${this.current.confirmDelete ? 'translate-x-6' : 'translate-x-1'}"></div>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 信息 -->
                    <div class="pt-4 border-t border-gray-700">
                        <div class="text-xs text-gray-500">
                            <div class="mb-2">版本：2.0.0</div>
                            <div class="mb-2">构建日期：2026-03-06</div>
                            <div>CIPHER NEXUS © 2026</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Settings;
}
