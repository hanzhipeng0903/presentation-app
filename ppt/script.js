// 幻灯片管理
let currentSlide = 1;
const totalSlides = 9;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide);
    updateIndicators();
    
    // 键盘事件监听
    document.addEventListener('keydown', handleKeyPress);
    
    // 触摸事件支持（移动端）
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwiping = false;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = false;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isSwiping) {
            const deltaX = Math.abs(e.changedTouches[0].screenX - touchStartX);
            const deltaY = Math.abs(e.changedTouches[0].screenY - touchStartY);
            
            // 如果水平滑动距离大于垂直滑动距离，则认为是水平滑动
            if (deltaX > deltaY && deltaX > 10) {
                isSwiping = true;
                e.preventDefault();
            }
        }
    }, { passive: false });
    
    document.addEventListener('touchend', function(e) {
        if (isSwiping) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });
});

// 显示指定幻灯片
function showSlide(slideNumber) {
    // 隐藏所有幻灯片
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 显示当前幻灯片
    const currentSlideElement = document.getElementById(`slide-${slideNumber}`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
    
    // 更新指示器
    updateIndicators();
    
    // 更新进度条
    updateProgressBar();
}

// 下一张幻灯片
function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

// 上一张幻灯片
function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// 跳转到指定幻灯片
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        showSlide(currentSlide);
    }
}

// 更新指示器状态
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// 键盘事件处理
function handleKeyPress(e) {
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
    }
}

// 触摸滑动处理
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动，下一张
            nextSlide();
        } else {
            // 向右滑动，上一张
            previousSlide();
        }
    }
}

// 全屏切换
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('全屏请求失败:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// 自动播放功能
let autoPlayInterval = null;

function startAutoPlay(interval = 8000) {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            goToSlide(1); // 循环播放
        }
    }, interval);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// 鼠标悬停时暂停自动播放
document.addEventListener('mouseenter', stopAutoPlay);
document.addEventListener('mouseleave', () => startAutoPlay());

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为内容项添加点击效果
    const contentItems = document.querySelectorAll('.content-item, .feature-item, .tech-item, .stack-item, .ws-feature');
    contentItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 为特性卡片添加悬停效果
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // 为流程步骤添加悬停效果
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 添加页面可见性检测，页面不可见时暂停自动播放
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});

// 初始化自动播放
document.addEventListener('DOMContentLoaded', function() {
    // 延迟3秒后开始自动播放
    setTimeout(() => {
        startAutoPlay(8000); // 8秒切换一次
    }, 3000);
});

// 添加进度条功能
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
}

// 更新进度条
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const progress = (currentSlide / totalSlides) * 100;
        progressBar.style.width = progress + '%';
    }
}

// 创建进度条
document.addEventListener('DOMContentLoaded', createProgressBar);

// 添加幻灯片切换动画效果
function addSlideTransitionEffects() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
        // 为每个幻灯片添加不同的进入动画
        slide.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // 添加内容动画
        const content = slide.querySelector('.slide-content');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(30px)';
            content.style.transition = 'all 0.8s ease 0.2s';
        }
    });
}

// 显示幻灯片时的内容动画
function animateSlideContent(slideNumber) {
    const currentSlideElement = document.getElementById(`slide-${slideNumber}`);
    if (currentSlideElement) {
        const content = currentSlideElement.querySelector('.slide-content');
        if (content) {
            // 先设置初始状态（从右侧进入）
            content.classList.add('sliding-in');
            
            setTimeout(() => {
                // 移除动画类，显示内容
                content.classList.remove('sliding-in');
                content.style.opacity = '1';
                content.style.transform = 'translateX(0)';
            }, 100);
        }
    }
}

// 隐藏幻灯片时的内容动画
function hideSlideContent(slideNumber) {
    const slideElement = document.getElementById(`slide-${slideNumber}`);
    if (slideElement) {
        const content = slideElement.querySelector('.slide-content');
        if (content) {
            // 添加消失动画类（向左滑出）
            content.classList.add('sliding-out');
            
            // 动画完成后重置状态
            setTimeout(() => {
                content.classList.remove('sliding-out');
                content.style.opacity = '0';
                content.style.transform = 'translateX(0)';
            }, 600);
        }
    }
}

// 重写showSlide函数以支持动画
const originalShowSlide = showSlide;
showSlide = function(slideNumber) {
    // 隐藏当前幻灯片内容
    hideSlideContent(currentSlide);
    
    // 调用原始函数
    originalShowSlide(slideNumber);
    
    // 显示新幻灯片内容
    animateSlideContent(slideNumber);
};

// 初始化动画效果
document.addEventListener('DOMContentLoaded', addSlideTransitionEffects);

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘快捷键提示
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'f':
                e.preventDefault();
                alert('按 ESC 键退出全屏模式');
                break;
        }
    }
});

// 添加触摸手势提示（移动端）
if ('ontouchstart' in window) {
    const touchHint = document.createElement('div');
    touchHint.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    touchHint.textContent = '左右滑动切换页面';
    document.body.appendChild(touchHint);
    
    // 3秒后隐藏提示
    setTimeout(() => {
        touchHint.style.opacity = '0';
        setTimeout(() => {
            touchHint.remove();
        }, 300);
    }, 3000);
}
