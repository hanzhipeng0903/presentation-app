import React, { useState, useEffect, useCallback } from 'react';
import './Presentation.css';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 10;

  // 幻灯片控制函数
  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideNumber) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.log('全屏请求失败:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // 键盘事件处理
  const handleKeyPress = useCallback((e) => {
    switch(e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        previousSlide();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      case 'Escape':
        toggleFullscreen();
        break;
      default:
        break;
    }
  }, [currentSlide, totalSlides]);

  // 事件监听器
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // 渲染幻灯片内容
  const renderSlide = (slideNumber) => {
    switch (slideNumber) {
      case 1:
        return (
          <div className="slide" id="slide-1">
            <div className="slide-content">
              <h1 className="title">换组分享</h1>
              <div className="subtitle">工作方式与技术架构</div>
              <div className="date">2024年</div>
              <div className="presenter-info">
                <p>分享人：[您的姓名]</p>
                <p>部门：[您的部门]</p>
                <p>时间：[分享时间]</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="slide" id="slide-2">
            <div className="slide-content">
              <h2 className="slide-title">分享内容</h2>
              <div className="content-list">
                <div className="content-item">
                  <span className="number">01</span>
                  <div className="content-details">
                    <span className="text">工作方式的不同</span>
                    <p className="description">敏捷开发流程、开发测试模式、版本发布策略</p>
                  </div>
                </div>
                <div className="content-item">
                  <span className="number">02</span>
                  <div className="content-details">
                    <span className="text">技术方面</span>
                    <p className="description">技术架构设计、前端技术栈、应用特性与挑战</p>
                  </div>
                </div>
              </div>
              <div className="additional-notes">
                <h3>补充说明</h3>
                <p>[这里可以添加其他需要分享的内容要点]</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="slide" id="slide-3">
            <div className="slide-content">
              <h2 className="slide-title">工作方式的不同</h2>
              <div className="section">
                <h3 className="section-title">1. 敏捷开发</h3>
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-content">
                      <h4>每日站会</h4>
                      <p>分享进度、讨论问题、协调工作</p>
                      <div className="detail-points">
                        <ul>
                          <li>时间：每天固定时间（如9:30）</li>
                          <li>时长：控制在15分钟内</li>
                          <li>内容：昨天完成、今天计划、遇到问题</li>
                          <li>参与：开发、测试、产品等相关人员</li>
                        </ul>
                      </div>
                      <div className="manual-input">
                        <p><strong>补充内容：</strong>[请在这里添加具体的站会流程、工具使用等]</p>
                      </div>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-content">
                      <h4>持续迭代</h4>
                      <p>快速响应需求变化，持续交付价值</p>
                      <div className="detail-points">
                        <ul>
                          <li>迭代周期：2-4周一个迭代</li>
                          <li>需求管理：动态调整优先级</li>
                          <li>交付方式：小步快跑，持续集成</li>
                          <li>反馈机制：及时收集用户反馈</li>
                        </ul>
                      </div>
                      <div className="manual-input">
                        <p><strong>补充内容：</strong>[请在这里添加具体的迭代流程、工具使用等]</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="slide" id="slide-4">
            <div className="slide-content">
              <h2 className="slide-title">工作方式的不同</h2>
              <div className="section">
                <h3 className="section-title">2. 开发测试流程</h3>
                <div className="process-flow">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>开发完成</h4>
                      <p>功能开发完成后立即进入测试</p>
                      <div className="step-details">
                        <ul>
                          <li>代码审查：提交前进行代码review</li>
                          <li>单元测试：确保基础功能正常</li>
                          <li>自测验证：开发人员先进行基本测试</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>测试验证</h4>
                      <p>确保功能质量与稳定性</p>
                      <div className="step-details">
                        <ul>
                          <li>功能测试：验证业务逻辑正确性</li>
                          <li>集成测试：检查模块间协作</li>
                          <li>性能测试：确保响应时间达标</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>版本发布</h4>
                      <p>每月固定时间发布新版本</p>
                      <div className="step-details">
                        <ul>
                          <li>发布时间：每月第一个工作日</li>
                          <li>发布流程：灰度发布、全量发布</li>
                          <li>回滚机制：问题出现时快速回退</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manual-input">
                  <p><strong>补充内容：</strong>[请在这里添加具体的测试流程、发布流程等]</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="slide" id="slide-5">
            <div className="slide-content">
              <h2 className="slide-title">技术方面</h2>
              <div className="section">
                <h3 className="section-title">1. 挂载在VO页面</h3>
                <div className="tech-info">
                  <div className="tech-item">
                    <div className="tech-content">
                      <h4>集成方式</h4>
                      <p>作为子应用挂载到现有的VO系统中</p>
                      <div className="tech-details">
                        <ul>
                          <li>微前端架构：独立开发、独立部署</li>
                          <li>通信机制：通过事件总线进行数据交换</li>
                          <li>样式隔离：避免样式冲突</li>
                          <li>权限控制：复用现有权限体系</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tech-item">
                    <div className="tech-content">
                      <h4>优势</h4>
                      <p>复用现有基础设施，降低维护成本</p>
                      <div className="tech-details">
                        <ul>
                          <li>基础设施：复用登录、权限、日志等</li>
                          <li>开发效率：专注业务逻辑开发</li>
                          <li>维护成本：减少重复建设</li>
                          <li>用户体验：统一的界面风格</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manual-input">
                  <p><strong>补充内容：</strong>[请在这里添加具体的集成技术细节、遇到的问题等]</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="slide" id="slide-6">
            <div className="slide-content">
              <h2 className="slide-title">技术方面</h2>
              <div className="section">
                <h3 className="section-title">2. Svelte技术栈</h3>
                <div className="tech-stack">
                  <div className="stack-item">
                    <div className="stack-content">
                      <h4>编译时框架</h4>
                      <p>在构建时生成高效代码，运行时性能优异</p>
                      <div className="stack-details">
                        <ul>
                          <li>编译优化：生成原生JavaScript代码</li>
                          <li>包体积：相比React/Vue更小</li>
                          <li>运行时：无虚拟DOM，直接操作DOM</li>
                          <li>性能：首屏加载快，交互响应快</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="stack-item">
                    <div className="stack-content">
                      <h4>组件化开发</h4>
                      <p>简洁的语法，易于维护和扩展</p>
                      <div className="stack-details">
                        <ul>
                          <li>语法简洁：类似HTML的模板语法</li>
                          <li>状态管理：响应式声明，自动更新</li>
                          <li>组件通信：props、events、stores</li>
                          <li>生命周期：onMount、onDestroy等</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="stack-item">
                    <div className="stack-content">
                      <h4>开发体验</h4>
                      <p>热重载、类型支持、丰富的生态</p>
                      <div className="stack-details">
                        <ul>
                          <li>开发工具：VSCode插件支持</li>
                          <li>类型检查：TypeScript集成</li>
                          <li>构建工具：Vite、Rollup等</li>
                          <li>社区生态：组件库、工具库</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manual-input">
                  <p><strong>补充内容：</strong>[请在这里添加具体的开发经验、遇到的问题等]</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="slide" id="slide-7">
            <div className="slide-content">
              <h2 className="slide-title">技术方面</h2>
              <div className="section">
                <h3 className="section-title">3. 单页应用特性</h3>
                <div className="spa-features">
                  <div className="feature-grid">
                    <div className="feature-card">
                      <h4>路由跳转</h4>
                      <p>客户端路由，页面切换流畅</p>
                      <div className="feature-details">
                        <ul>
                          <li>路由库：使用SvelteKit或自定义路由</li>
                          <li>页面切换：无刷新切换，体验流畅</li>
                          <li>URL管理：支持浏览器前进后退</li>
                          <li>路由守卫：权限控制、登录检查</li>
                        </ul>
                      </div>
                    </div>
                    <div className="feature-card">
                      <h4>页面缓存</h4>
                      <p>提升用户体验，减少重复加载</p>
                      <div className="feature-details">
                        <ul>
                          <li>组件缓存：keep-alive类似机制</li>
                          <li>数据缓存：避免重复API调用</li>
                          <li>状态保持：页面切换时保持状态</li>
                          <li>性能优化：减少DOM重建</li>
                        </ul>
                      </div>
                    </div>
                    <div className="feature-card">
                      <h4>生命周期</h4>
                      <p>传统生命周期钩子不生效</p>
                      <div className="feature-details">
                        <ul>
                          <li>问题描述：mounted、unmounted等不工作</li>
                          <li>解决方案：使用Svelte原生生命周期</li>
                          <li>替代方案：onMount、onDestroy等</li>
                          <li>注意事项：避免在组件外部使用</li>
                        </ul>
                      </div>
                    </div>
                    <div className="feature-card">
                      <h4>状态管理</h4>
                      <p>需要特殊处理组件状态</p>
                      <div className="feature-details">
                        <ul>
                          <li>全局状态：使用Svelte stores</li>
                          <li>组件状态：响应式声明变量</li>
                          <li>状态同步：父子组件状态传递</li>
                          <li>持久化：localStorage、sessionStorage</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manual-input">
                  <p><strong>补充内容：</strong>[请在这里添加具体的实现细节、遇到的问题等]</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="slide" id="slide-8">
            <div className="slide-content">
              <h2 className="slide-title">技术方面</h2>
              <div className="section">
                <h3 className="section-title">4. WebSocket信息推送</h3>
                <div className="websocket-info">
                  <div className="ws-feature">
                    <div className="ws-content">
                      <h4>实时通信</h4>
                      <p>建立持久连接，实现双向实时数据传输</p>
                      <div className="ws-details">
                        <ul>
                          <li>连接建立：握手协议，升级HTTP连接</li>
                          <li>数据格式：支持文本、二进制数据</li>
                          <li>双向通信：客户端可主动发送消息</li>
                          <li>事件驱动：基于事件的通信模型</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="ws-feature">
                    <div className="ws-content">
                      <h4>低延迟</h4>
                      <p>相比HTTP轮询，响应更快更高效</p>
                      <div className="ws-details">
                        <ul>
                          <li>连接复用：避免重复建立连接</li>
                          <li>头部开销：相比HTTP请求头更小</li>
                          <li>实时性：消息立即推送，无延迟</li>
                          <li>带宽利用：减少无效的网络传输</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="ws-feature">
                    <div className="ws-content">
                      <h4>自动重连</h4>
                      <p>连接断开时自动重连，保证服务可用性</p>
                      <div className="ws-details">
                        <ul>
                          <li>重连策略：指数退避算法</li>
                          <li>心跳检测：定期发送ping消息</li>
                          <li>状态管理：连接状态监控</li>
                          <li>错误处理：网络异常时的降级方案</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="manual-input">
                  <p><strong>补充内容：</strong>[请在这里添加具体的实现细节、遇到的问题等]</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="slide" id="slide-9">
            <div className="slide-content">
              <h2 className="slide-title">总结</h2>
              <div className="summary-content">
                <div className="summary-section">
                  <h3>工作方式</h3>
                  <p>敏捷开发 + 持续测试 + 定期发布</p>
                  <div className="summary-details">
                    <ul>
                      <li>敏捷开发提升了团队协作效率</li>
                      <li>持续测试确保了产品质量</li>
                      <li>定期发布建立了稳定的交付节奏</li>
                    </ul>
                  </div>
                </div>
                <div className="summary-section">
                  <h3>技术架构</h3>
                  <p>VO集成 + Svelte + SPA + WebSocket</p>
                  <div className="summary-details">
                    <ul>
                      <li>微前端架构实现了技术栈的灵活性</li>
                      <li>Svelte提供了优秀的开发体验</li>
                      <li>SPA特性优化了用户体验</li>
                      <li>WebSocket实现了实时通信能力</li>
                    </ul>
                  </div>
                </div>
                <div className="summary-section">
                  <h3>核心价值</h3>
                  <p>提升开发效率，优化用户体验</p>
                  <div className="summary-details">
                    <ul>
                      <li>开发效率：快速迭代，快速响应需求</li>
                      <li>用户体验：流畅的交互，实时的信息</li>
                      <li>维护成本：降低系统复杂度</li>
                      <li>技术债务：减少技术遗留问题</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="thank-you">
                <h3>谢谢大家！</h3>
                <p>欢迎提问交流</p>
              </div>
              <div className="manual-input">
                <p><strong>补充内容：</strong>[请在这里添加其他总结要点、未来规划等]</p>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="slide" id="slide-10">
            <div className="slide-content">
              <h2 className="slide-title">新页面示例</h2>
              <div className="section">
                <h3 className="section-title">这是新增的第10页</h3>
                <div className="content-list">
                  <div className="content-item">
                    <span className="number">01</span>
                    <div className="content-details">
                      <span className="text">新功能特性</span>
                      <p className="description">展示新增页面的功能和特性</p>
                    </div>
                  </div>
                  <div className="content-item">
                    <span className="number">02</span>
                    <div className="content-details">
                      <span className="text">技术亮点</span>
                      <p className="description">突出技术实现的关键点</p>
                    </div>
                  </div>
                </div>
                <div className="manual-input">
                  <p><strong>补充内容：</strong>[请在这里添加具体的功能描述、技术细节等]</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="presentation-container"
    >
      {/* 进度条 */}
      {/* <div 
        className="progress-bar" 
        style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
      ></div> */}

      {/* 幻灯片容器 */}
      <div 
        className="slides-container"
        style={{ transform: `translateX(-${(currentSlide - 1) * 100}vw)` }}
      >
        {/* 渲染所有幻灯片 */}
        {Array.from({ length: totalSlides }, (_, index) => renderSlide(index + 1))}
      </div>

      {/* 导航控制 */}
      {/* <div className="navigation">
        <button className="nav-btn prev-btn" onClick={previousSlide}>
          ‹
        </button>
        <div className="slide-indicators">
          {Array.from({ length: totalSlides }, (_, index) => (
            <span
              key={index + 1}
              className={`indicator ${index + 1 === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index + 1)}
            ></span>
          ))}
        </div>
        <button className="nav-btn next-btn" onClick={nextSlide}>
          ›
        </button>
      </div> */}

      {/* 快捷键提示 */}
      <div className="shortcuts">
        <span>← → 切换页面 | 空格键 下一页 | ESC 全屏</span>
      </div>
    </div>
  );
};

export default Presentation;
