/**
 * UI 工具模块
 * 提供通用 UI 交互功能
 */
const UIUtils = {
    /**
     * 显示 Toast 提示
     */
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const text = document.getElementById('toastText');
        
        if (!toast || !text) return;
        
        text.textContent = message;
        text.className = `text-sm ${type === 'error' ? 'text-neon-red' : 'text-neon-green'}`;
        
        toast.classList.remove('translate-x-full', 'success-toast', 'error-toast');
        toast.classList.add(type === 'error' ? 'error-toast' : 'success-toast');
        
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            toast.classList.remove('success-toast', 'error-toast');
        }, 2500);
    },

    /**
     * 更新字符计数
     */
    updateCharCount() {
        const inputText = document.getElementById('inputText');
        const charCount = document.getElementById('charCount');
        
        if (!inputText || !charCount) return;
        
        const count = inputText.value.length;
        charCount.textContent = `字符：${count.toLocaleString()}`;
    },

    /**
     * 清空输入框
     */
    clearInput() {
        const inputText = document.getElementById('inputText');
        if (inputText) {
            inputText.value = '';
            this.updateCharCount();
        }
    },

    /**
     * 粘贴文本
     */
    async pasteText() {
        try {
            const text = await navigator.clipboard.readText();
            const inputText = document.getElementById('inputText');
            if (inputText) {
                inputText.value = text;
                this.updateCharCount();
                this.showToast('已粘贴文本');
            }
        } catch (e) {
            this.showToast('无法访问剪贴板', 'error');
        }
    },

    /**
     * 复制输出
     */
    copyOutput() {
        const outputText = document.getElementById('outputText');
        if (!outputText) return;
        
        const text = outputText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('已复制到剪贴板');
        }).catch(() => {
            this.showToast('复制失败', 'error');
        });
    },

    /**
     * 下载输出文件
     */
    downloadOutput() {
        const outputText = document.getElementById('outputText');
        if (!outputText) return;
        
        const text = outputText.textContent;
        const cipher = AppState.currentCipher || 'unknown';
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cipher-${cipher}-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('文件已下载');
    },

    /**
     * 处理文件上传
     */
    handleFileUpload(input) {
        const file = input.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const inputText = document.getElementById('inputText');
            if (inputText) {
                inputText.value = e.target.result;
                this.updateCharCount();
            }
            this.showToast(`已加载文件：${file.name}`);
        };
        reader.readAsText(file);
    },

    /**
     * 处理拖拽上传
     */
    handleDrop(e) {
        e.preventDefault();
        const inputText = document.getElementById('inputText');
        if (!inputText) return;
        
        inputText.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                inputText.value = ev.target.result;
                this.updateCharCount();
            };
            reader.readAsText(file);
        }
    },

    /**
     * 处理拖拽经过
     */
    handleDragOver(e) {
        e.preventDefault();
        const inputText = document.getElementById('inputText');
        if (inputText) {
            inputText.style.borderColor = '#00f0ff';
        }
    },

    /**
     * 处理拖拽离开
     */
    handleDragLeave() {
        const inputText = document.getElementById('inputText');
        if (inputText) {
            inputText.style.borderColor = '';
        }
    },

    /**
     * 显示加载遮罩
     */
    showLoading() {
        const existing = document.querySelector('.loading-overlay');
        if (existing) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="glass-panel rounded-2xl p-8 flex flex-col items-center gap-4">
                <div class="loading-ring"></div>
                <p class="text-sm text-gray-400">处理中...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    },

    /**
     * 隐藏加载遮罩
     */
    hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    },

    /**
     * 更新输出区域
     */
    updateOutput(result, processTime) {
        const outputText = document.getElementById('outputText');
        const outputCount = document.getElementById('outputCount');
        const processTimeEl = document.getElementById('processTime');
        
        if (outputText) {
            outputText.textContent = result;
        }
        if (outputCount) {
            outputCount.textContent = `输出：${result.length} 字符`;
        }
        if (processTimeEl && processTime) {
            processTimeEl.textContent = `耗时：${processTime.toFixed(2)}ms`;
        }
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIUtils;
}
