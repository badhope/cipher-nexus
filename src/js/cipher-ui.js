/**
 * 密码 UI 辅助模块
 * 提供密码选择等 UI 相关功能
 */
const CipherUI = {
    /**
     * 选择密码算法
     */
    selectCipher(key) {
        AppState.currentCipher = key;
        
        // 更新选中状态
        document.querySelectorAll('.cipher-tile').forEach(tile => {
            tile.classList.remove('selected');
        });
        
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('selected');
        }
        
        // 更新显示名称
        const selectedCipherName = document.getElementById('selectedCipherName');
        if (selectedCipherName) {
            selectedCipherName.textContent = CipherLibrary[key].name;
        }
        
        // 渲染参数配置
        ViewManager.renderParamConfig(key);
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CipherUI;
}
