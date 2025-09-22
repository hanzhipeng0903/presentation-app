import React, { useState, useEffect, useCallback } from 'react';
import './Presentation.scss';

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
    switch (e.key) {
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
              <h1 className="title main-title">AI麦可换组分享</h1>
              <div className="subtitle " style={{fontSize:'50px',color:'#475569',marginBottom:0}}>工作方式与技术架构</div>
              <div className="presenter-info">
                <p>分享人：韩志朋</p>
                <p>2025-09-23</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="slide" id="slide-2" style={{paddingTop:0}}>
            <div className="slide-content">
              <h2 className="slide-title">目录</h2>
              <div className="content-list">
                <div className="content-item">
                  <span className="number">01</span>
                  <div className="content-details">
                    <span className="text">工作方式</span>
                    <p className="description">敏捷开发流程、版本发布流程</p>
                  </div>
                </div>
                <div className="content-item">
                  <span className="number">02</span>
                  <div className="content-details">
                    <span className="text">技术架构</span>
                    <p className="description">技术架构设计、前端技术栈、应用特性</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="slide" id="slide-3">
            <div className="slide-content">
              <div className="section">
                <h2 className="section-title module-title">工作方式</h2>
                <div className="module-intro">
                  <div className="subtitle-list">
                    <div className="subtitle-item">
                      <span className="number">01</span>
                      <span className="text">敏捷开发</span>
                    </div>
                    <div className="subtitle-item">
                      <span className="number">02</span>
                      <span className="text">版本流程</span>
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
              <div className="section">
                <h2 className="section-title topic-title">1.1 敏捷开发</h2>
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-content">
                      <h3 className="feature-title">每日站会</h3>
                      <p>分享进度、讨论问题、协调工作</p>
                      <div className="detail-points">
                        <ul>
                          <li>时间：每天固定时间（10:00）</li>
                          <li>时长：控制在15分钟内</li>
                          <li>内容：昨日完成、今日计划、遇到问题</li>
                          <li>参与：开发、测试、产品</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="feature-item">
                    <div className="feature-content">
                      <h3 className="feature-title">持续迭代</h3>
                      <p>快速响应需求变化</p>
                      <div className="detail-points">
                        <ul>
                          <li>迭代周期：每月迭代</li>
                          <li>需求管理：动态调整优先级</li>
                          <li>反馈机制：及时收集用户反馈</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="slide" id="slide-5" style={{ paddingTop: '200px' }}>
            <div className="slide-content">
              <div className="section">
                <h2 className="section-title topic-title">1.2 版本流程</h2>
                <div className="process-flow">
                  <div className="process-step">
                  <div className="user-feedback-standalone">
                  <div className="feedback-content">
                    <h3 className="feedback-title">用户反馈</h3>
                    <p>响应用户反馈，调整优先级</p>
                  </div>
                  <div className="feedback-arrow-to-dev"></div>
                </div>
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3 className="step-title">开发介入</h3>
                      <p>功能开发完成后立即进入测试</p>
                    </div>
                  </div>
                  <div className="arrow"></div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3 className="step-title">测试验证</h3>
                      <p>确保功能质量与稳定性</p>
                    </div>
                  </div>
                  <div className="arrow"></div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3 className="step-title">版本发布</h3>
                      <p>每月底发布新版本，发布版本更新通知</p>
                    </div>
                  </div>
                  <div className="arrow"></div>
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3 className="step-title">次月需求</h3>
                      <p>收集用户反馈，规划下月功能需求</p>
                    </div>
                  </div>
                  <div className="arrow"></div>
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3 className="step-title">开发介入</h3>
                      <p>功能开发完成后立即进入测试</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="slide" id="slide-7">
            <div className="slide-content">
              <div className="section">
                <h2 className="section-title module-title">技术架构</h2>
                <div className="module-intro">
                  <div className="subtitle-list">
                    <div className="subtitle-item">
                      <span className="number">01</span>
                      <span className="text">挂载VO页面</span>
                    </div>
                    <div className="subtitle-item">
                      <span className="number">02</span>
                      <span className="text">单页应用与状态管理</span>
                    </div>
                    <div className="subtitle-item">
                      <span className="number">03</span>
                      <span className="text">WebSocket推送</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="slide" id="slide-5">
            <div className="slide-content">
              <div className="section">
                <h2 className="section-title topic-title">2.1 挂载在VO页面</h2>
                <div className="tech-stack">
                  <div className="stack-item">
                    <div className="stack-content">
                      <h3 className="feature-title">动态注入</h3>
                      <p>通过JavaScript动态注入的方式挂载到VO页面，非侵入式集成</p>
                    </div>
                  </div>
                  <div className="stack-item">
                    <div className="stack-content">
                      <h3 className="feature-title">挂载位置</h3>
                      <p>fixed定位，1500层级，不影响VO页面布局</p>
                    </div>
                  </div>
                  <div className="stack-item">
                    <div className="stack-content">
                      <h3 className="feature-title">按需加载</h3>
                      <p>业务模块按需动态加载，支持代码分割，避免一次性加载所有代码</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="slide" id="slide-9">
            <div className="slide-content">
              <div className="section">
                <h2 className="section-title topic-title">2.2 单页应用与状态管理</h2>
                <div className="tech-stack">
                  <div className="stack-item">
                    <div className="stack-content">
                      <h3 className="feature-title">单页应用</h3>
                      <p>生命周期管理，状态同步，事件驱动更新</p>
                    </div>
                  </div>
                  <div className="stack-item">
                    <div className="stack-content">
                      <h3 className="feature-title">数据管理</h3>
                      <p>Svelte Stores状态管理，主子页面数据交互，事件总线通信</p>
                    </div>
                  </div>
                  <div className="stack-item">
                    <div className="stack-content">
                      <h3 className="feature-title">路由、缓存机制</h3>
                      <p>路由跳转API，实例缓存结构，生命周期跳过问题</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="slide" id="slide-10">
            <div className="slide-content">
              <div className="section">
                <h2 className="section-title topic-title">2.3 WebSocket推送</h2>
                <div className="spa-features">
                  <div className="feature-grid">
                    <div className="feature-card">
                      <h3 className="feature-title">技术栈选择</h3>
                      <p>SockJS + STOMP，自动降级，多传输方式支持</p>
                    </div>
                    <div className="feature-card">
                      <h3 className="feature-title">事件系统设计</h3>
                      <p>观察者模式，消息订阅机制，事件去重，错误容错</p>
                    </div>
                    <div className="feature-card">
                      <h3 className="feature-title">业务应用场景</h3>
                      <p>实时通知系统，业务状态同步，用户状态管理</p>
                    </div>
                    <div className="feature-card">
                      <h3 className="feature-title">性能优化策略</h3>
                      <p>消息去重，条件订阅，连接管理，容错机制</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="slide" id="slide-13" style={{paddingTop:0}}>
            <div className="slide-content">
              <div className="thank-you">
                <h2 className="thank-title" style={{fontSize:'100px'}}>感谢聆听！</h2>
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
        <span>← → 切换页面 | 空格键 下一页</span>
      </div>
    </div>
  );
};

export default Presentation;
