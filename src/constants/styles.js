// 游戏卡片尺寸配置
export const GAME_CARD_SIZES = {
  small: {
    container: 'rounded-lg shadow-sm hover:shadow-md',
    image: 'h-24',
    title: 'text-sm font-medium',
    description: 'text-xs',
    stats: 'text-xs'
  },
  medium: {
    container: 'rounded-lg shadow-md hover:shadow-lg',
    image: 'h-32',
    title: 'text-base font-semibold',
    description: 'text-sm',
    stats: 'text-sm'
  },
  large: {
    container: 'rounded-lg shadow-lg hover:shadow-xl',
    image: 'h-40',
    title: 'text-lg font-bold',
    description: 'text-base',
    stats: 'text-base'
  }
};

// 按钮尺寸配置
export const BUTTON_SIZES = {
  small: {
    container: 'px-2 py-1 text-xs',
    icon: 'w-3 h-3',
    text: 'ml-1'
  },
  medium: {
    container: 'px-3 py-2 text-sm',
    icon: 'w-4 h-4',
    text: 'ml-1.5'
  },
  large: {
    container: 'px-4 py-2 text-base',
    icon: 'w-5 h-5',
    text: 'ml-2'
  },
  icon: {
    container: 'p-2',
    icon: 'w-5 h-5',
    text: 'sr-only'
  },
  custom: {
    container: 'px-3 py-1.5',
    icon: 'w-4 h-4',
    text: 'sr-only'
  }
};

// 主题切换按钮尺寸
export const THEME_TOGGLE_SIZES = {
  small: 'w-8 h-8 text-sm',
  medium: 'w-10 h-10 text-base',
  large: 'w-12 h-12 text-lg'
};

// 通用过渡类
export const TRANSITIONS = {
  colors: 'transition-colors',
  all: 'transition-all duration-300',
  theme: 'transition-all duration-200',
  transform: 'transform hover:-translate-y-1'
};

// 通用间距类
export const SPACING = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-8',
  card: 'p-4'
};

// 网格配置
export const GRID_CONFIGS = {
  default: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  compact: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8',
  wide: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
};

// 文本样式
export const TEXT_STYLES = {
  heading: {
    h1: 'text-3xl font-bold text-gray-900 dark:text-white',
    h2: 'text-2xl font-bold text-gray-900 dark:text-white',
    h3: 'text-xl font-bold text-gray-900 dark:text-white'
  },
  body: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400'
  }
};

// 背景样式
export const BACKGROUND_STYLES = {
  primary: 'bg-white dark:bg-slate-800',
  secondary: 'bg-gray-50 dark:bg-slate-900',
  card: 'bg-white dark:bg-slate-800',
  accent: {
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20',
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    green: 'bg-green-50 dark:bg-green-900/20',
    red: 'bg-red-50 dark:bg-red-900/20'
  }
}; 