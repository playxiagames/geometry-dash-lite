// 统一的分析事件追踪工具
// 避免在各个组件中重复事件追踪代码

/**
 * 追踪游戏相关事件
 * @param {string} eventName - 事件名称
 * @param {string} gameName - 游戏名称
 * @param {string} category - 事件分类
 * @param {Object} additionalData - 额外数据
 */
export const trackGameEvent = (eventName, gameName, category = 'Game', additionalData = {}) => {
  if (typeof window !== 'undefined' && window.trackGameEvent) {
    window.trackGameEvent(eventName, gameName, category);
  }
};

/**
 * 追踪自定义事件
 * @param {string} eventName - 事件名称
 * @param {Object} eventData - 事件数据
 */
export const trackCustomEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.trackCustomEvent) {
    window.trackCustomEvent(eventName, eventData);
  }
};

/**
 * 追踪用户交互事件
 * @param {string} action - 操作类型
 * @param {string} target - 目标对象
 * @param {Object} metadata - 元数据
 */
export const trackUserInteraction = (action, target, metadata = {}) => {
  trackCustomEvent(action, {
    event_category: 'User Interaction',
    event_label: target,
    ...metadata
  });
};

/**
 * 追踪导航事件
 * @param {string} page - 页面名称
 * @param {string} source - 来源
 */
export const trackNavigation = (page, source = 'direct') => {
  trackCustomEvent('page_navigation', {
    event_category: 'Navigation',
    event_label: page,
    source
  });
};

/**
 * 追踪性能事件
 * @param {string} metric - 性能指标
 * @param {number} value - 数值
 * @param {string} context - 上下文
 */
export const trackPerformance = (metric, value, context = 'General') => {
  trackCustomEvent(metric, {
    event_category: 'Performance',
    event_label: context,
    value: Math.round(value)
  });
}; 