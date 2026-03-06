/**
 * 密码历史与知识库模块
 * 包含密码发展时间轴、历史名人、各领域密码应用等
 */

const PasswordKnowledge = {
    // 密码发展时间轴
    timeline: [
        {
            era: '古代密码',
            period: '公元前 5 世纪 - 公元 15 世纪',
            icon: 'fa-scroll',
            color: 'neon-gold',
            items: [
                {
                    name: '斯巴达密码棒 (Scytale)',
                    time: '公元前 5 世纪',
                    description: '古希腊斯巴达人使用的最早加密工具之一。将羊皮纸螺旋缠绕在特定直径的木棒上书写，展开后文字顺序被打乱，只有使用相同直径的木棒才能读取。',
                    principle: '置换加密',
                    application: '军事通信'
                },
                {
                    name: '凯撒密码 (Caesar Cipher)',
                    time: '公元前 1 世纪',
                    description: '古罗马凯撒大帝发明的替换加密技术，将字母表每个字母向前或向后移动固定位数。传说凯撒用此保护军事命令。',
                    principle: '字母替换',
                    application: '军事指挥',
                    figure: {
                        name: '盖乌斯·尤利乌斯·凯撒',
                        quote: '知识就是力量，而保密则是力量的守护者',
                        contribution: '开创了系统化军事加密的先河'
                    }
                },
                {
                    name: '阿拉伯频率分析',
                    time: '公元 9 世纪',
                    description: '阿拉伯学者阿尔·金迪首次提出频率分析法，通过统计字母出现频率破解替换密码，标志着密码分析学的诞生。',
                    principle: '统计分析',
                    application: '密码破译',
                    figure: {
                        name: '阿尔·金迪 (Al-Kindi)',
                        quote: '万物皆有规律，密码亦不例外',
                        contribution: '密码分析学之父，首次用数学方法破解密码'
                    }
                }
            ]
        },
        {
            era: '近代密码',
            period: '公元 15 世纪 - 1945 年',
            icon: 'fa-machine',
            color: 'neon-purple',
            items: [
                {
                    name: '维吉尼亚密码 (Vigenère Cipher)',
                    time: '1553 年',
                    description: '法国密码学家维吉尼亚发明的多表替换密码，使用密钥词控制多个凯撒密码的组合，曾被称为"不可破译的密码"。',
                    principle: '多表替换',
                    application: '外交机密',
                    figure: {
                        name: '布莱斯·德·维吉尼亚',
                        quote: '复杂源于简单，安全生于变化',
                        contribution: '开创了多表加密的新纪元'
                    }
                },
                {
                    name: '恩尼格玛机 (Enigma)',
                    time: '1918 年',
                    description: '德国发明的转子加密机器，通过多个转子的复杂组合产生天文数字般的加密可能性。二战期间被德军广泛使用，最终被图灵团队破解。',
                    principle: '机械转子加密',
                    application: '二战军事通信',
                    figure: {
                        name: '阿瑟·谢尔比乌斯',
                        quote: '机械的智慧胜过人脑的局限',
                        contribution: '发明了史上最著名的加密机器'
                    }
                },
                {
                    name: '图灵与密码破译',
                    time: '1939-1945 年',
                    description: '英国数学家艾伦·图灵领导团队设计"炸弹机"，成功破解德军恩尼格玛密码，据估计缩短了二战至少两年时间，拯救了数百万生命。',
                    principle: '机电密码分析',
                    application: '密码破译',
                    figure: {
                        name: '艾伦·图灵 (Alan Turing)',
                        quote: '有时候，正是那些无人看好之人，最终成就了无人能及之事',
                        contribution: '计算机科学之父，密码分析天才，用智慧拯救了千万生命',
                        impact: '图灵的破译工作使盟军能预判德军行动，诺曼底登陆的成功也得益于此'
                    }
                }
            ]
        },
        {
            era: '现代密码学',
            period: '1945 年 - 至今',
            icon: 'fa-microchip',
            color: 'neon-blue',
            items: [
                {
                    name: 'DES 加密标准',
                    time: '1977 年',
                    description: 'IBM 开发的数据加密标准 (DES)，成为首个被广泛采用的商业加密标准，开启了现代密码学的新篇章。',
                    principle: '对称密钥加密',
                    application: '商业与政府通信'
                },
                {
                    name: 'RSA 公钥加密',
                    time: '1977 年',
                    description: '罗纳德·李维斯特、阿迪·萨莫尔和伦纳德·阿德勒曼发明 RSA 算法，首次实现非对称加密，解决了密钥分发难题。',
                    principle: '大数分解难题',
                    application: '安全通信、数字签名',
                    figure: {
                        name: '罗纳德·李维斯特 (Ron Rivest)',
                        quote: '真正的安全，建立在数学的确定性之上',
                        contribution: 'RSA 算法创始人之一，现代公钥密码学奠基人',
                        impact: 'RSA 至今仍是互联网安全的基石，每天保护着数十亿次的网络交易'
                    }
                },
                {
                    name: 'AES 高级加密标准',
                    time: '2001 年',
                    description: '美国国家标准与技术研究院选定的新一代加密标准，采用 Rijndael 算法，至今仍是全球最广泛使用的对称加密算法。',
                    principle: '分组密码',
                    application: '政府、金融、互联网安全'
                },
                {
                    name: '区块链与比特币',
                    time: '2008 年',
                    description: '中本聪提出比特币概念，结合 SHA-256 哈希、椭圆曲线加密和分布式共识，开创了去中心化数字货币时代。',
                    principle: '哈希函数 + 非对称加密',
                    application: '加密货币、智能合约',
                    figure: {
                        name: '中本聪 (Satoshi Nakamoto)',
                        quote: '根问题在于，传统模型中，交易双方必须互相信任，而密码学让我们可以信任数学',
                        contribution: '神秘的身份，革命性的思想，重新定义了货币与信任',
                        impact: '区块链技术已超越金融领域，应用于供应链、医疗、投票等多个行业'
                    }
                },
                {
                    name: '量子密码学',
                    time: '21 世纪',
                    description: '利用量子力学原理进行加密，理论上不可破解。中国"墨子号"量子卫星成功实现洲际量子密钥分发。',
                    principle: '量子纠缠与测不准原理',
                    application: '超安全通信'
                }
            ]
        }
    ],

    // 各领域密码应用
    domains: [
        {
            name: '军事国防',
            icon: 'fa-shield-alt',
            color: 'neon-red',
            description: '军事领域是密码学最早和最深入应用的领域',
            applications: [
                {
                    title: '战术通信加密',
                    content: '现代军队使用跳频扩频技术 (FHSS)，每秒改变频率数千次，使敌方无法干扰或监听。北约军队使用的 SINCGARS 无线电系统可在 2320 个频率间快速切换。'
                },
                {
                    title: '核武器控制系统',
                    'content': '核武器发射采用"双人规则"和多层加密验证。每枚导弹需要多个授权人员同时输入不同的密码代码，这些代码分散在不同基地，确保单人无法发动核打击。'
                },
                {
                    title: '卫星通信',
                    content: '军事卫星使用量子加密和抗干扰技术。GPS 卫星的 P(Y) 码信号采用加密，只有授权接收器才能解码，精度可达厘米级。'
                }
            ],
            historicalCase: {
                title: '中途岛海战密码战',
                content: '1942 年，美军密码分析员破译日军"AF"代号为中途岛，设下埋伏击沉日军 4 艘航母。为验证情报，美军故意用明码报告中途岛淡水设备故障，日军果然用 JN-25 密码报告"AF 缺水"，证实了情报准确性。'
            }
        },
        {
            name: '金融银行',
            icon: 'fa-landmark',
            color: 'neon-gold',
            description: '金融行业是密码学应用最严格的领域之一',
            applications: [
                {
                    title: 'EMV 芯片卡加密',
                    content: '现代银行卡采用 EMV 芯片技术，每笔交易生成一次性动态密码。芯片使用 RSA-2048 或 ECC 加密，即使盗取交易数据也无法复制卡片。相比磁条卡，欺诈率降低 70%。'
                },
                {
                    title: '网银 U 盾技术',
                    content: '中国银行业广泛使用的 U 盾，内置智能卡芯片和加密算法。采用国密 SM2/SM3/SM4 或国际 RSA/AES 算法，配合 PIN 码实现双因素认证，单笔交易限额可达数百万。'
                },
                {
                    title: 'SWIFT 国际汇款',
                    content: 'SWIFT 系统使用三重 DES 和 RSA 加密跨境交易信息。每家银行拥有唯一的 BIC 代码和加密密钥，每天处理超过 5 万亿美元的跨境支付，准确率 99.99%。'
                },
                {
                    title: '区块链金融',
                    content: '数字货币使用椭圆曲线加密 (ECDSA) 保护钱包地址。比特币的私钥是 256 位随机数，可能组合比宇宙原子还多，暴力破解需要全人类计算数亿年。'
                }
            ],
            historicalCase: {
                title: '2016 年孟加拉国央行大盗',
                content: '黑客利用 SWIFT 系统漏洞，伪造加密指令试图盗取 9.51 亿美元。因拼写错误"Foundation"写成"Fundation"引起怀疑，最终损失 8100 万美元。此事件促使 SWIFT 全面升级加密验证机制。'
            }
        },
        {
            name: '互联网安全',
            icon: 'fa-globe',
            color: 'neon-blue',
            description: '互联网让密码学成为每个人的日常保护伞',
            applications: [
                {
                    title: 'SSL/TLS 协议',
                    content: 'HTTPS 网站使用 TLS 1.3 协议，结合 RSA/ECC 密钥交换和 AES-256 加密。每次访问网站都会进行"握手"，验证身份并协商会话密钥，保护浏览数据不被窃听。'
                },
                {
                    title: '端到端加密',
                    content: 'WhatsApp、Signal 等通讯应用使用 Signal 协议，消息在发送方设备加密，仅接收方能解密。即使服务器被攻破，也无法读取消息内容。密钥指纹验证可防止中间人攻击。'
                },
                {
                    title: '密码哈希存储',
                    content: '正规网站使用 bcrypt、Argon2 等算法存储密码哈希。即使数据库泄露，黑客也无法还原原始密码。加盐技术确保相同密码产生不同哈希，防止彩虹表攻击。'
                }
            ],
            historicalCase: {
                title: '心脏出血漏洞 (Heartbleed)',
                content: '2014 年曝光的 OpenSSL 漏洞影响全球 2/3 网站。攻击者可读取服务器内存，窃取私钥和用户数据。事件后，整个互联网紧急更换证书和密码，成为史上最大规模的安全应急响应。'
            }
        },
        {
            name: '智能家居与物联网',
            icon: 'fa-home',
            color: 'neon-green',
            description: '万物互联时代的密码保护',
            applications: [
                {
                    title: '智能门锁加密',
                    content: '高端智能锁使用 AES-128 加密无线通信，配合临时密码和生物识别。部分产品支持一次性密码 (OTP)，访客只能在指定时间段开门。'
                },
                {
                    title: '车联网安全',
                    content: '现代汽车有 100+ 个 ECU 控制单元，使用 CAN 总线加密通信。特斯拉采用证书验证和 OTA 加密更新，防止远程劫持。'
                }
            ]
        },
        {
            name: '医疗健康',
            icon: 'fa-heartbeat',
            color: 'neon-purple',
            description: '保护生命数据的加密技术',
            applications: [
                {
                    title: '电子病历加密',
                    content: 'HIPAA 法案要求医疗数据必须加密存储和传输。医院使用 AES-256 加密病历，只有授权医生能访问，保护患者隐私。'
                },
                {
                    title: '植入设备安全',
                    content: '心脏起搏器、胰岛素泵等植入设备使用加密无线通信，防止恶意篡改剂量。早期设备曾被证明可在 40 米外被黑客攻击，现代设备已加强防护。'
                }
            ]
        }
    ],

    // 密码学先驱名言墙
    quotes: [
        {
            author: '艾伦·图灵',
            role: '计算机科学之父',
            quote: '我们只能看到前方很短的距离，但我们可以看到有很多事情需要完成。',
            contribution: '破解恩尼格玛，拯救千万生命，奠定计算机理论基础'
        },
        {
            author: '罗纳德·李维斯特',
            role: 'RSA 算法创始人',
            quote: '密码学不是关于完美，而是关于实际可行性。',
            contribution: '发明 RSA 算法，开创公钥密码学新时代'
        },
        {
            author: '惠特菲尔德·迪菲',
            role: '公钥密码学先驱',
            quote: '隐私是民主社会的基本需求，而密码学是保护隐私的技术手段。',
            contribution: '提出 Diffie-Hellman 密钥交换，解决密钥分发难题'
        },
        {
            author: '布鲁斯·施奈尔',
            role: '安全专家',
            quote: '任何人，从门外汉到专家，设计出的密码算法都能让自己相信是安全的。真正的考验是能否经受住时间的检验。',
            contribution: '推动开放密码学研究，倡导透明安全'
        }
    ],

    // 幽默安全警示
    securityWarnings: [
        {
            title: '如何"成功"让黑客破解你的密码',
            icon: 'fa-exclamation-triangle',
            tone: 'humor',
            tips: [
                '使用"123456"或"password"——黑客会感谢你的，这能让他们提前下班',
                '用生日当密码——反正你的生日在社交媒体上谁都知道',
                '所有网站用同一个密码——这样黑客只要攻破一个小网站，就能访问你的银行账户了！',
                '把密码写在便利贴上——贴在显示器旁边，方便自己也方便"访客"',
                '三年不换密码——持久才是"美"德，虽然安全不是'
            ],
            seriousAdvice: '开个玩笑！请使用强密码、启用双重验证、定期更换密码'
        },
        {
            title: '银行密码破解"教程"(请勿尝试)',
            icon: 'fa-ban',
            tone: 'warning',
            content: '温馨提示：试图破解银行密码的唯一结果——银手镯套餐 + 免费住宿 + 法律教育。现代银行使用军规级加密，破解难度相当于用勺子挖穿地球。',
            legalWarning: '根据《中华人民共和国刑法》第 285 条，非法侵入计算机信息系统罪可处三年以下有期徒刑。请做守法公民！'
        },
        {
            title: '朋友约你打王者，你却忘了密码',
            icon: 'fa-gamepad',
            tone: 'relatable',
            scenario: '朋友："上号！"你："等等，我找回密码..."30 分钟后，朋友："游戏结束了"你："我还在等验证码..."'
        }
    ],

    // 渲染时间轴
    renderTimeline() {
        return `
            <div class="password-timeline">
                ${this.timeline.map(era => `
                    <div class="timeline-era mb-12">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-${era.color}/20 border border-${era.color}/50">
                                <i class="fas ${era.icon} text-${era.color} text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-display text-xl font-bold text-white">${era.era}</h3>
                                <p class="text-sm text-gray-500">${era.period}</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${era.items.map(item => `
                                <div class="glass-panel rounded-xl p-5 hover:border-${era.color}/50 transition-colors">
                                    <h4 class="font-display text-lg font-semibold mb-2 text-white">${item.name}</h4>
                                    <p class="text-xs text-${era.color} mb-3">${item.time}</p>
                                    <p class="text-sm text-gray-400 mb-4">${item.description}</p>
                                    <div class="flex flex-wrap gap-2 mb-4">
                                        <span class="badge badge-${era.color}">${item.principle}</span>
                                        <span class="badge badge-gray">${item.application}</span>
                                    </div>
                                    ${item.figure ? `
                                        <div class="mt-4 p-3 bg-black/30 rounded-lg border-l-2 border-${era.color}">
                                            <p class="text-xs text-gray-500 mb-1">💡 ${item.figure.name}</p>
                                            <p class="text-sm italic text-gray-300 mb-2">"${item.figure.quote}"</p>
                                            <p class="text-xs text-gray-400">${item.figure.contribution}</p>
                                            ${item.figure.impact ? `
                                                <p class="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">📊 ${item.figure.impact}</p>
                                            ` : ''}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // 渲染领域知识库
    renderDomains() {
        return `
            <div class="password-domains">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    ${this.domains.map(domain => `
                        <div class="glass-panel rounded-2xl p-6">
                            <div class="flex items-center gap-4 mb-4">
                                <div class="w-14 h-14 rounded-xl flex items-center justify-center bg-${domain.color}/20 border border-${domain.color}/50">
                                    <i class="fas ${domain.icon} text-${domain.color} text-2xl"></i>
                                </div>
                                <div>
                                    <h3 class="font-display text-xl font-bold text-white">${domain.name}</h3>
                                    <p class="text-sm text-gray-500">${domain.description}</p>
                                </div>
                            </div>
                            
                            <div class="space-y-4 mb-6">
                                ${domain.applications.map(app => `
                                    <div class="p-4 bg-black/20 rounded-lg">
                                        <h4 class="font-semibold text-white mb-2">${app.title}</h4>
                                        <p class="text-sm text-gray-400">${app.content}</p>
                                    </div>
                                `).join('')}
                            </div>
                            
                            ${domain.historicalCase ? `
                                <div class="p-4 bg-gradient-to-r from-${domain.color}/10 to-transparent rounded-lg border-l-4 border-${domain.color}">
                                    <h4 class="font-semibold text-white mb-2">📜 ${domain.historicalCase.title}</h4>
                                    <p class="text-sm text-gray-400">${domain.historicalCase.content}</p>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 渲染名言墙
    renderQuotes() {
        return `
            <div class="quotes-wall">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${this.quotes.map(quote => `
                        <div class="glass-panel rounded-xl p-6">
                            <div class="flex items-start gap-4">
                                <div class="text-4xl text-neon-purple/50 font-serif">"</div>
                                <div class="flex-1">
                                    <p class="text-gray-300 italic mb-4">${quote.quote}</p>
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold">
                                            ${quote.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p class="text-sm font-semibold text-white">${quote.author}</p>
                                            <p class="text-xs text-gray-500">${quote.role}</p>
                                            <p class="text-xs text-gray-400 mt-1">${quote.contribution}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // 渲染安全警示
    renderSecurityWarnings() {
        return `
            <div class="security-warnings mt-12">
                <h3 class="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                    <i class="fas fa-shield-alt text-neon-red"></i>
                    密码安全警示
                </h3>
                
                ${this.securityWarnings.map(warning => `
                    <div class="glass-panel rounded-2xl p-6 mb-6 ${warning.tone === 'humor' ? 'border-neon-gold/30' : ''} ${warning.tone === 'warning' ? 'border-neon-red/30' : ''}">
                        <div class="flex items-center gap-3 mb-4">
                            <i class="fas ${warning.icon} text-2xl ${warning.tone === 'humor' ? 'text-neon-gold' : 'text-neon-red'}"></i>
                            <h4 class="font-display text-lg font-bold text-white">${warning.title}</h4>
                        </div>
                        
                        ${warning.tips ? `
                            <ul class="space-y-2 mb-4">
                                ${warning.tips.map(tip => `
                                    <li class="flex items-start gap-3 text-gray-400">
                                        <i class="fas fa-arrow-right text-neon-gold mt-1"></i>
                                        <span>${tip}</span>
                                    </li>
                                `).join('')}
                            </ul>
                            <div class="p-4 bg-neon-green/10 rounded-lg border border-neon-green/30">
                                <p class="text-sm text-neon-green">✅ ${warning.seriousAdvice}</p>
                            </div>
                        ` : ''}
                        
                        ${warning.content ? `
                            <p class="text-gray-400 mb-4">${warning.content}</p>
                            ${warning.legalWarning ? `
                                <div class="p-4 bg-neon-red/10 rounded-lg border border-neon-red/30">
                                    <p class="text-sm text-neon-red">⚠️ ${warning.legalWarning}</p>
                                </div>
                            ` : ''}
                        ` : ''}
                        
                        ${warning.scenario ? `
                            <div class="p-4 bg-black/30 rounded-lg">
                                <p class="text-gray-400">${warning.scenario}</p>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    },

    // 完整渲染密码本视图
    renderPasswordCodex() {
        return `
            <div class="password-codex-container">
                <!-- 标签导航 -->
                <div class="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button class="px-6 py-3 rounded-xl font-display font-semibold whitespace-nowrap bg-neon-blue/20 border border-neon-blue/50 text-neon-blue" onclick="showCodexTab('timeline')">
                        <i class="fas fa-history mr-2"></i>密码发展史
                    </button>
                    <button class="px-6 py-3 rounded-xl font-display font-semibold whitespace-nowrap bg-black/40 border border-gray-800 text-gray-400 hover:text-white" onclick="showCodexTab('domains')">
                        <i class="fas fa-globe mr-2"></i>领域应用
                    </button>
                    <button class="px-6 py-3 rounded-xl font-display font-semibold whitespace-nowrap bg-black/40 border border-gray-800 text-gray-400 hover:text-white" onclick="showCodexTab('quotes')">
                        <i class="fas fa-quote-left mr-2"></i>先驱名言
                    </button>
                    <button class="px-6 py-3 rounded-xl font-display font-semibold whitespace-nowrap bg-black/40 border border-gray-800 text-gray-400 hover:text-white" onclick="showCodexTab('security')">
                        <i class="fas fa-exclamation-triangle mr-2"></i>安全警示
                    </button>
                </div>
                
                <!-- 时间轴内容 -->
                <div id="codex-timeline" class="codex-tab-content">
                    <div class="mb-8">
                        <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-gold via-neon-purple to-neon-blue bg-clip-text text-transparent">
                            密码学发展时间轴
                        </h2>
                        <p class="text-gray-400 mb-6">从古代军事通信到现代量子加密，探索密码学的千年演进历程</p>
                    </div>
                    ${this.renderTimeline()}
                </div>
                
                <!-- 领域应用内容 -->
                <div id="codex-domains" class="codex-tab-content hidden">
                    <div class="mb-8">
                        <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-red via-neon-gold to-neon-green bg-clip-text text-transparent">
                            密码学应用领域
                        </h2>
                        <p class="text-gray-400 mb-6">探索密码学在军事、金融、互联网等关键领域的核心作用</p>
                    </div>
                    ${this.renderDomains()}
                </div>
                
                <!-- 先驱名言内容 -->
                <div id="codex-quotes" class="codex-tab-content hidden">
                    <div class="mb-8">
                        <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green bg-clip-text text-transparent">
                            密码学先驱思想
                        </h2>
                        <p class="text-gray-400 mb-6">聆听改变世界的智慧之声</p>
                    </div>
                    ${this.renderQuotes()}
                </div>
                
                <!-- 安全警示内容 -->
                <div id="codex-security" class="codex-tab-content hidden">
                    <div class="mb-8">
                        <h2 class="font-display text-3xl font-bold mb-4 bg-gradient-to-r from-neon-gold via-neon-red to-neon-purple bg-clip-text text-transparent">
                            密码安全教育
                        </h2>
                        <p class="text-gray-400 mb-6">在幽默中学习安全最佳实践</p>
                    </div>
                    ${this.renderSecurityWarnings()}
                </div>
            </div>
        `;
    }
};

// 全局函数
window.showCodexTab = (tabName) => {
    const tabs = document.querySelectorAll('.codex-tab-content');
    const buttons = document.querySelectorAll('.password-codex-container button');
    
    tabs.forEach(tab => tab.classList.add('hidden'));
    buttons.forEach(btn => {
        btn.classList.remove('bg-neon-blue/20', 'border-neon-blue/50', 'text-neon-blue');
        btn.classList.add('bg-black/40', 'border-gray-800', 'text-gray-400');
    });
    
    document.getElementById(`codex-${tabName}`).classList.remove('hidden');
    event.target.classList.remove('bg-black/40', 'border-gray-800', 'text-gray-400');
    event.target.classList.add('bg-neon-blue/20', 'border-neon-blue/50', 'text-neon-blue');
};
