/**
 * CIPHER NEXUS - 主应用入口
 * 初始化应用并注册全局事件
 */

// 批量处理状态
let batchMode = false;
let lastBatchResults = null;

// 组合密码状态
let currentComboId = 'double_caesar';
let comboParams = {};

// 多重翻译状态
let currentMultiPreset = 'classic_triple';
let multiCustomCiphers = [];

// 应用初始化
function initApp() {
    // 初始化状态
    AppState.init();
    
    // 初始化设置
    Settings.init();
    
    // 初始化快捷键
    Hotkeys.init();
    
    // 更新统计
    ViewManager.updateStats();
    
    // 渲染密码网格
    ViewManager.renderCipherGrid();
    
    // 渲染组合密码选择器
    renderComboSelector();
    
    // 渲染多重翻译预设
    renderMultiPresets();
    
    // 渲染设置面板
    renderSettings();
    
    // 渲染密码本模块
    initPasswordLab();
    
    // 注册事件监听
    registerEventListeners();
    
    console.log('CIPHER NEXUS 初始化完成');
}

// 注册全局事件监听器
function registerEventListeners() {
    // 输入框事件
    const inputText = document.getElementById('inputText');
    if (inputText) {
        inputText.addEventListener('input', () => UIUtils.updateCharCount());
        inputText.addEventListener('dragover', (e) => UIUtils.handleDragOver(e));
        inputText.addEventListener('dragleave', () => UIUtils.handleDragLeave());
        inputText.addEventListener('drop', (e) => UIUtils.handleDrop(e));
    }
    
    // 文件上传
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            UIUtils.handleFileUpload(e.target);
        });
    }
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);

// ==================== 全局函数导出 ====================

// 视图管理
window.showView = (viewName) => ViewManager.showView(viewName);
window.enterWorkspace = (mode) => ViewManager.enterWorkspace(mode);
window.setMode = (mode) => ViewManager.setMode(mode);

// 核心操作
window.executeCipher = () => CipherCore.execute();

// 工具函数
window.pasteText = () => UIUtils.pasteText();
window.clearInput = () => UIUtils.clearInput();
window.copyOutput = () => UIUtils.copyOutput();
window.downloadOutput = () => UIUtils.downloadOutput();
window.handleFileUpload = (input) => UIUtils.handleFileUpload(input);

// 历史记录
window.exportHistory = () => HistoryManager.export();
window.clearAllHistory = () => HistoryManager.clearAll();

// 密码选择
window.selectCipher = (key) => CipherUI.selectCipher(key);

// 批量处理功能
window.toggleBatchMode = () => {
    batchMode = !batchMode;
    const panel = document.getElementById('batchPanel');
    if (panel) {
        panel.classList.toggle('hidden', !batchMode);
    }
};

window.processBatch = () => {
    const batchInput = document.getElementById('batchInput');
    const batchProgress = document.getElementById('batchProgress');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const batchResult = document.getElementById('batchResult');
    const batchOutput = document.getElementById('batchOutput');
    
    if (!batchInput || !batchInput.value.trim()) {
        UIUtils.showToast('请输入批量文本', 'error');
        return;
    }
    
    const texts = BatchProcessor.parseInput(batchInput.value);
    if (texts.length === 0) {
        UIUtils.showToast('没有有效的文本行', 'error');
        return;
    }
    
    // 显示进度
    batchProgress.classList.remove('hidden');
    batchResult.classList.add('hidden');
    
    // 处理批量
    lastBatchResults = BatchProcessor.processBatch(texts, (processed, total) => {
        const percent = (processed / total) * 100;
        progressBar.style.width = percent + '%';
        progressText.textContent = `${processed}/${total}`;
    });
    
    // 显示结果
    const output = BatchProcessor.formatOutput(lastBatchResults);
    batchOutput.textContent = output;
    batchResult.classList.remove('hidden');
    
    UIUtils.showToast(`批量处理完成：${lastBatchResults.length} 项`);
};

window.exportBatchResult = () => {
    if (!lastBatchResults || lastBatchResults.length === 0) {
        UIUtils.showToast('没有可导出的结果', 'error');
        return;
    }
    BatchProcessor.exportToCSV(lastBatchResults);
};

// 密文分析功能
window.analyzeOutput = () => {
    const outputText = document.getElementById('outputText');
    const analysisPanel = document.getElementById('analysisPanel');
    
    if (!outputText || !outputText.textContent || outputText.textContent === '等待操作...') {
        UIUtils.showToast('请先执行加密/解密操作', 'error');
        return;
    }
    
    const analysis = CipherAnalyzer.analyze(outputText.textContent);
    if (analysis) {
        analysisPanel.innerHTML = CipherAnalyzer.render(analysis);
        analysisPanel.classList.remove('hidden');
        analysisPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

// 导出模块供 HTML 使用
window.CipherUI = CipherUI;

// ==================== 组合密码功能 ====================
window.renderComboSelector = () => {
    const container = document.getElementById('comboSelector');
    if (!container) return;
    
    container.innerHTML = ComboCipher.renderSelector(currentComboId, 'onComboSelect');
    renderComboParams();
};

window.onComboSelect = (id) => {
    currentComboId = id;
    renderComboSelector();
};

window.renderComboParams = () => {
    const container = document.getElementById('comboParams');
    if (!container) return;
    
    const combo = ComboCipher.combos.find(c => c.id === currentComboId);
    if (!combo || combo.params.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = ComboCipher.renderParams(currentComboId, comboParams, 'onComboParamChange');
};

window.onComboParamChange = (key, value) => {
    comboParams[key] = value;
    renderComboParams();
};

window.executeCombo = (mode) => {
    const input = document.getElementById('comboInput');
    const resultDiv = document.getElementById('comboResult');
    const output = document.getElementById('comboOutput');
    
    if (!input || !input.value.trim()) {
        UIUtils.showToast('请输入文本', 'error');
        return;
    }
    
    try {
        let result;
        if (mode === 'encrypt') {
            result = ComboCipher.encrypt(input.value, currentComboId, comboParams);
        } else {
            result = ComboCipher.decrypt(input.value, currentComboId, comboParams);
        }
        
        output.textContent = result;
        resultDiv.classList.remove('hidden');
        UIUtils.showToast('操作成功');
        
        // 保存历史
        const record = {
            id: Date.now(),
            input: input.value.substring(0, 100),
            output: result.substring(0, 100),
            fullInput: input.value,
            fullOutput: result,
            cipher: `combo:${currentComboId}`,
            mode,
            time: new Date().toLocaleString()
        };
        AppState.addHistoryRecord(record);
        AppState.incrementOps();
        
    } catch (e) {
        UIUtils.showToast('操作失败：' + e.message, 'error');
    }
};

// ==================== 多重翻译功能 ====================
window.renderMultiPresets = () => {
    const container = document.getElementById('multiPresets');
    if (!container) return;
    
    container.innerHTML = MultiTranslator.renderPresets(currentMultiPreset, 'onMultiPresetSelect');
    
    const customDiv = document.getElementById('multiCustom');
    if (customDiv) {
        customDiv.classList.toggle('hidden', currentMultiPreset !== 'custom');
        if (currentMultiPreset === 'custom') {
            customDiv.innerHTML = MultiTranslator.renderCustomSelector(multiCustomCiphers, 'onMultiCipherToggle');
        }
    }
};

window.onMultiPresetSelect = (id) => {
    currentMultiPreset = id;
    renderMultiPresets();
};

window.onMultiCipherToggle = (cipher) => {
    const index = multiCustomCiphers.indexOf(cipher);
    if (index > -1) {
        multiCustomCiphers.splice(index, 1);
    } else if (multiCustomCiphers.length < 5) {
        multiCustomCiphers.push(cipher);
    }
    renderMultiPresets();
};

window.executeMultiTranslate = () => {
    const input = document.getElementById('multiInput');
    const resultDiv = document.getElementById('multiResult');
    
    if (!input || !input.value.trim()) {
        UIUtils.showToast('请输入文本', 'error');
        return;
    }
    
    try {
        const result = MultiTranslator.translate(input.value, currentMultiPreset, multiCustomCiphers);
        resultDiv.innerHTML = MultiTranslator.renderResults(result);
        UIUtils.showToast('翻译完成');
        
    } catch (e) {
        UIUtils.showToast('操作失败：' + e.message, 'error');
    }
};

window.exportMultiResult = (format) => {
    const resultDiv = document.getElementById('multiResult');
    if (!resultDiv.innerHTML) {
        UIUtils.showToast('没有可导出的结果', 'error');
        return;
    }
    
    const result = {
        input: document.getElementById('multiInput').value,
        preset: currentMultiPreset,
        timestamp: new Date().toLocaleString()
    };
    
    if (format === 'json') {
        MultiTranslator.exportToJSON(result);
    } else {
        MultiTranslator.exportToText(result);
    }
};

// ==================== 设置功能 ====================
window.renderSettings = () => {
    const container = document.getElementById('settingsContainer');
    if (!container) return;
    
    container.innerHTML = Settings.render();
};

// ==================== 密码本功能 ====================
window.initPasswordLab = () => {
    // 渲染密码生成器
    const generatorUI = document.getElementById('passwordGeneratorUI');
    if (generatorUI) {
        generatorUI.innerHTML = PasswordGenerator.renderUI();
    }
    
    // 渲染密码知识
    const knowledgeUI = document.getElementById('passwordKnowledgeUI');
    if (knowledgeUI) {
        knowledgeUI.innerHTML = PasswordKnowledge.renderPasswordCodex();
    }
    
    // 渲染加密方法
    const encryptionUI = document.getElementById('encryptionMethodsUI');
    if (encryptionUI) {
        encryptionUI.innerHTML = EncryptionMethods.renderEncryptionMethods();
    }
    
    // 渲染使用指南
    const guideUI = document.getElementById('passwordGuideUI');
    if (guideUI) {
        guideUI.innerHTML = PasswordGuide.renderGuide();
    }
};

window.showPasswordLabTab = (tabName) => {
    const tabs = document.querySelectorAll('.password-lab-tab-content');
    const buttons = document.querySelectorAll('#view-password-lab .flex button');
    
    tabs.forEach(tab => tab.classList.add('hidden'));
    buttons.forEach(btn => {
        btn.classList.remove('bg-neon-gold/20', 'border-neon-gold/50', 'text-neon-gold');
        btn.classList.add('bg-black/40', 'border-gray-800', 'text-gray-400');
    });
    
    document.getElementById(`password-lab-${tabName}`).classList.remove('hidden');
    event.target.classList.remove('bg-black/40', 'border-gray-800', 'text-gray-400');
    event.target.classList.add('bg-neon-gold/20', 'border-neon-gold/50', 'text-neon-gold');
};

window.updatePasswordLabUI = (tabName) => {
    if (tabName === 'generator') {
        const generatorUI = document.getElementById('passwordGeneratorUI');
        if (generatorUI) {
            generatorUI.innerHTML = PasswordGenerator.renderUI();
        }
    } else if (tabName === 'history') {
        const knowledgeUI = document.getElementById('passwordKnowledgeUI');
        if (knowledgeUI) {
            knowledgeUI.innerHTML = PasswordKnowledge.renderPasswordCodex();
        }
    } else if (tabName === 'encryption') {
        const encryptionUI = document.getElementById('encryptionMethodsUI');
        if (encryptionUI) {
            encryptionUI.innerHTML = EncryptionMethods.renderEncryptionMethods();
        }
    } else if (tabName === 'guide') {
        const guideUI = document.getElementById('passwordGuideUI');
        if (guideUI) {
            guideUI.innerHTML = PasswordGuide.renderGuide();
        }
    }
};
