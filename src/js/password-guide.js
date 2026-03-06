/**
 * 密码使用指南模块
 * 提供密码最佳实践、安全存储方法、定期更换建议等
 */

const PasswordGuide = {
    // 密码最佳实践
    bestPractices: [
        {
            category: '密码复杂度',
            icon: 'fa-chart-bar',
            color: 'neon-blue',
            tips: [
                {
                    title: '最小长度要求',
                    content: '密码至少 12 位，推荐 16 位以上。每增加一位，破解难度呈指数级增长。',
                    priority: 'critical',
                    example: '✅ 推荐：Tr0ub4dor&3.7#9xK2\n❌ 避免：password123'
                },
                {
                    title: '字符多样性',
                    content: '混合使用大小写字母、数字和特殊符号。至少包含 3 种字符类型。',
                    priority: 'high',
                    example: '✅ 推荐：MyD0g$N@me!sMax\n❌ 避免：mydogismax'
                },
                {
                    title: '避免常见模式',
                    content: '不要使用连续数字 (123456)、键盘模式 (qwerty)、重复字符 (aaaaaa)。',
                    priority: 'high',
                    example: '✅ 推荐：随机组合\n❌ 避免：123456, qwerty, abcabc'
                },
                {
                    title: '拒绝个人信息',
                    content: '避免使用生日、姓名、电话等易被猜到的信息。这些信息常在社交媒体暴露。',
                    priority: 'medium',
                    example: '✅ 推荐：无意义组合\n❌ 避免：zhang1990, li@13800138000'
                }
            ]
        },
        {
            category: '密码管理',
            icon: 'fa-tasks',
            color: 'neon-green',
            tips: [
                {
                    title: '一账号一密码',
                    content: '每个网站使用不同密码。即使小网站泄露，也不会危及重要账户。',
                    priority: 'critical',
                    example: '💡 策略：使用密码管理器生成并保存独特密码'
                },
                {
                    title: '使用密码管理器',
                    content: '推荐工具：Bitwarden(免费开源)、1Password、LastPass。只需记住一个主密码，其他交给管理器。',
                    priority: 'critical',
                    example: '🔐 主密码建议：使用密码短语，如"Blue#Coffee$Mountain2024"'
                },
                {
                    title: '启用双重验证 (2FA)',
                    content: '即使密码泄露，黑客也无法登录。推荐使用认证器 App，而非短信验证。',
                    priority: 'critical',
                    example: '📱 推荐 App: Google Authenticator, Microsoft Authenticator, Authy'
                },
                {
                    title: '定期更换策略',
                    content: '重要账户 (银行、邮箱) 每 90 天更换；普通账户每 180 天；不常用账户至少每年一次。',
                    priority: 'medium',
                    example: '📅 设置日历提醒，或使用密码管理器的到期提醒功能'
                }
            ]
        },
        {
            category: '安全存储',
            icon: 'fa-vault',
            color: 'neon-gold',
            tips: [
                {
                    title: '数字存储方案',
                    content: '使用加密密码管理器。主密码要足够强，启用主密码保护功能。',
                    priority: 'critical',
                    comparison: {
                        recommended: '密码管理器 + 主密码 + 2FA',
                        avoid: '明文文档、浏览器保存、便签'
                    }
                },
                {
                    title: '物理备份',
                    content: '将重要账户的密码和恢复密钥写在纸上，存放在安全地方 (保险箱)。防火防水防潮。',
                    priority: 'medium',
                    example: '📝 记录：主邮箱、银行、密码管理器主密码的恢复密钥'
                },
                {
                    title: '云端备份',
                    content: '密码管理器通常提供加密云同步。确保启用端到端加密，服务商也无法查看你的密码。',
                    priority: 'low',
                    example: '☁️ 推荐：Bitwarden 加密同步、1Password 家庭版'
                },
                {
                    title: '避免的存储方式',
                    content: '不要存在手机备忘录、微信文件传输助手、未加密 Excel、浏览器密码保存功能。',
                    priority: 'high',
                    example: '❌ 危险：手机备忘录、QQ 收藏、浏览器自动保存'
                }
            ]
        },
        {
            category: '场景化策略',
            icon: 'fa-sitemap',
            color: 'neon-purple',
            tips: [
                {
                    title: '极高安全账户',
                    content: '银行、支付、主邮箱。使用 20 位以上随机密码 + 硬件密钥 (YubiKey) + 单独设备登录。',
                    priority: 'critical',
                    accounts: '网上银行、支付宝、微信支付、Apple ID、Google 账户'
                },
                {
                    title: '高安全账户',
                    content: '社交网络、工作账户。使用 16 位以上随机密码 + 2FA 验证器。',
                    priority: 'high',
                    accounts: '微信、QQ、微博、公司系统、GitHub'
                },
                {
                    title: '中等安全账户',
                    content: '购物、娱乐网站。使用 12 位以上随机密码，可启用短信验证。',
                    priority: 'medium',
                    accounts: '淘宝、京东、Netflix、Spotify'
                },
                {
                    title: '低安全账户',
                    content: '临时注册、不重要论坛。可使用 8-10 位密码，但仍需保证唯一性。',
                    priority: 'low',
                    accounts: '临时邮箱、一次性注册、论坛灌水账号'
                }
            ]
        }
    ],

    // 密码更换周期建议
    replacementSchedule: {
        critical: {
            label: '关键账户',
            period: 90,
            unit: '天',
            color: 'neon-red',
            accounts: ['银行', '支付', '主邮箱', '密码管理器'],
            reminder: '建议设置季度提醒，使用密码管理器可自动提醒'
        },
        high: {
            label: '重要账户',
            period: 180,
            unit: '天',
            color: 'neon-gold',
            accounts: ['社交网络', '工作账户', '云存储'],
            reminder: '半年更换一次，可与年度体检同时记忆'
        },
        medium: {
            label: '普通账户',
            period: 365,
            unit: '天',
            color: 'neon-blue',
            accounts: ['购物网站', '娱乐平台', '订阅服务'],
            reminder: '每年更换一次，建议新年时统一更新'
        },
        low: {
            label: '临时账户',
            period: -1,
            unit: '按需',
            color: 'neon-green',
            accounts: ['临时注册', '一次性使用'],
            reminder: '用完即弃，无需长期保存'
        }
    },

    // 常见错误与解决方案
    commonMistakes: [
        {
            mistake: '所有网站用同一个密码',
            risk: '一旦某个网站泄露，所有账户沦陷',
            solution: '使用密码管理器，为每个网站生成独特密码',
            severity: 'critical'
        },
        {
            mistake: '密码太短或太简单',
            risk: '暴力破解可在数分钟内完成',
            solution: '至少 12 位，混合字符类型，使用密码生成器',
            severity: 'high'
        },
        {
            mistake: '使用个人信息',
            risk: '社交工程攻击可轻松猜到',
            solution: '使用无意义的随机组合或密码短语',
            severity: 'high'
        },
        {
            mistake: '从不更换密码',
            risk: '泄露后长期暴露，损失扩大',
            solution: '设置定期提醒，关键账户 90 天更换',
            severity: 'medium'
        },
        {
            mistake: '在公共电脑保存密码',
            risk: '下一个人可直接访问你的账户',
            solution: '永远不要在公共设备登录重要账户',
            severity: 'critical'
        },
        {
            mistake: '点击钓鱼邮件输入密码',
            risk: '密码直接发送给黑客',
            solution: '仔细检查网址，不点击可疑链接',
            severity: 'critical'
        }
    ],

    // 密码强度自测
    selfTest: [
        {
            question: '您的密码是否至少有 12 位？',
            weight: 20,
            yes: true
        },
        {
            question: '是否包含大小写字母、数字和特殊符号？',
            weight: 20,
            yes: true
        },
        {
            question: '是否避免了生日、姓名等个人信息？',
            weight: 15,
            yes: true
        },
        {
            question: '是否每个重要账户都有独特密码？',
            weight: 25,
            yes: true
        },
        {
            question: '是否启用了双重验证 (2FA)？',
            weight: 20,
            yes: true
        }
    ],

    // 渲染最佳实践
    renderBestPractices() {
        return `
            <div class="best-practices">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${this.bestPractices.map(category => `
                        <div class="glass-panel rounded-2xl p-6">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-${category.color}/20 border border-${category.color}/50">
                                    <i class="fas ${category.icon} text-${category.color} text-xl"></i>
                                </div>
                                <h3 class="font-display text-xl font-bold text-white">${category.category}</h3>
                            </div>
                            
                            <div class="space-y-4">
                                ${category.tips.map(tip => `
                                    <div class="p-4 bg-black/20 rounded-lg border-l-4 border-${tip.priority === 'critical' ? 'neon-red' : tip.priority === 'high' ? 'neon-gold' : 'neon-blue'}">
                                        <h4 class="font-semibold text-white mb-2">${tip.title}</h4>
                                        <p class="text-sm text-gray-400 mb-3">${tip.content}</p>
                                        ${tip.example ? `
                                            <div class="text-xs font-mono bg-black/40 p-2 rounded text-neon-green">${tip.example}</div>
                                        ` : ''}
                                        ${tip.accounts ? `
                                            <div class="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">适用：${tip.accounts}</div>
                                        ` : ''}
                                        ${tip.comparison ? `
                                            <div class="mt-3 space-y-2">
                                                <div class="text-xs text-neon-green">✅ ${tip.comparison.recommended}</div>
                                                <div class="text-xs text-neon-red">❌ ${tip.comparison.avoid}</div>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 渲染更换周期
    renderReplacementSchedule() {
        return `
            <div class="replacement-schedule glass-panel rounded-2xl p-6">
                <h3 class="font-display text-xl font-bold mb-6 flex items-center gap-3">
                    <i class="fas fa-calendar-alt text-neon-purple"></i>
                    密码更换周期建议
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${Object.values(this.replacementSchedule).map(schedule => `
                        <div class="p-5 rounded-xl bg-black/30 border border-${schedule.color}/30">
                            <div class="text-sm text-gray-400 mb-2">${schedule.label}</div>
                            <div class="text-3xl font-bold text-${schedule.color} mb-2">
                                ${schedule.period === -1 ? '按需' : schedule.period}
                            </div>
                            <div class="text-xs text-gray-500 mb-3">${schedule.unit}</div>
                            <div class="text-xs text-gray-400 mb-3">适用：${schedule.accounts.join(', ')}</div>
                            <div class="text-xs text-gray-600">💡 ${schedule.reminder}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 渲染常见错误
    renderCommonMistakes() {
        return `
            <div class="common-mistakes glass-panel rounded-2xl p-6 mt-6">
                <h3 class="font-display text-xl font-bold mb-6 flex items-center gap-3">
                    <i class="fas fa-exclamation-triangle text-neon-red"></i>
                    常见密码错误与解决方案
                </h3>
                
                <div class="space-y-4">
                    ${this.commonMistakes.map((item, index) => `
                        <div class="p-4 rounded-xl bg-black/20 ${item.severity === 'critical' ? 'border border-neon-red/30' : ''}">
                            <div class="flex items-start gap-4">
                                <div class="w-8 h-8 rounded-full bg-neon-red/20 border border-neon-red/50 flex items-center justify-center text-neon-red font-bold flex-shrink-0">
                                    ${index + 1}
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h4 class="font-semibold text-white">${item.mistake}</h4>
                                        <span class="badge badge-${item.severity === 'critical' ? 'neon-red' : item.severity === 'high' ? 'neon-gold' : 'neon-blue'}">${item.severity === 'critical' ? '严重' : item.severity === 'high' ? '高危' : '中等'}</span>
                                    </div>
                                    <p class="text-sm text-gray-400 mb-3">⚠️ 风险：${item.risk}</p>
                                    <p class="text-sm text-neon-green">✅ 解决：${item.solution}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 渲染自测问卷
    renderSelfTest() {
        return `
            <div class="self-test glass-panel rounded-2xl p-6 mt-6">
                <h3 class="font-display text-xl font-bold mb-6 flex items-center gap-3">
                    <i class="fas fa-clipboard-check text-neon-green"></i>
                    密码安全自测
                </h3>
                
                <div class="space-y-4 mb-6">
                    ${this.selfTest.map((item, index) => `
                        <label class="flex items-center gap-4 p-4 rounded-lg bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                            <input type="checkbox" class="w-5 h-5 accent-neon-green self-test-checkbox" data-weight="${item.weight}">
                            <span class="text-gray-300 flex-1">${item.question}</span>
                            <span class="text-xs text-gray-500">+${item.weight}分</span>
                        </label>
                    `).join('')}
                </div>
                
                <button onclick="calculateSelfTestScore()" class="action-btn w-full py-4 rounded-xl font-display font-semibold">
                    <span class="flex items-center justify-center gap-2">
                        <i class="fas fa-calculator"></i>
                        计算安全评分
                    </span>
                </button>
                
                <div id="selfTestResult" class="mt-6 hidden">
                    <div class="text-center p-6 rounded-xl bg-black/40">
                        <div class="text-sm text-gray-400 mb-2">您的密码安全评分</div>
                        <div id="selfTestScore" class="text-5xl font-bold text-neon-green mb-4">0</div>
                        <div id="selfTestLevel" class="text-lg font-semibold text-white mb-4"></div>
                        <div id="selfTestAdvice" class="text-sm text-gray-400"></div>
                    </div>
                </div>
            </div>
        `;
    },

    // 完整渲染使用指南
    renderGuide() {
        return `
            <div class="password-guide-container">
                <div class="mb-8">
                    <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                        密码使用指南
                    </h2>
                    <p class="text-gray-400">掌握密码安全最佳实践，保护您的数字生活</p>
                </div>
                
                ${this.renderBestPractices()}
                ${this.renderReplacementSchedule()}
                ${this.renderCommonMistakes()}
                ${this.renderSelfTest()}
            </div>
        `;
    }
};

// 全局函数
window.calculateSelfTestScore = () => {
    const checkboxes = document.querySelectorAll('.self-test-checkbox:checked');
    let score = 0;
    
    checkboxes.forEach(cb => {
        score += parseInt(cb.dataset.weight);
    });
    
    const resultDiv = document.getElementById('selfTestResult');
    const scoreDiv = document.getElementById('selfTestScore');
    const levelDiv = document.getElementById('selfTestLevel');
    const adviceDiv = document.getElementById('selfTestAdvice');
    
    let level, advice, color;
    
    if (score >= 90) {
        level = '优秀';
        advice = '您的密码安全意识非常强！继续保持良好习惯。';
        color = 'neon-green';
    } else if (score >= 70) {
        level = '良好';
        advice = '不错！但还有提升空间，建议检查未得分项。';
        color = 'neon-blue';
    } else if (score >= 50) {
        level = '中等';
        advice = '需要改进！您的密码安全存在风险，请尽快提升。';
        color = 'neon-gold';
    } else {
        level = '危险';
        advice = '非常危险！您的密码安全堪忧，请立即采取行动。';
        color = 'neon-red';
    }
    
    scoreDiv.textContent = score;
    scoreDiv.className = `text-5xl font-bold mb-4 text-${color}`;
    levelDiv.textContent = level;
    levelDiv.className = `text-lg font-semibold mb-4 text-${color}`;
    adviceDiv.textContent = advice;
    resultDiv.classList.remove('hidden');
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};
