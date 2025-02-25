import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Animated } from 'react-native';
import { ToastVariant, ToastPosition } from './toast';

export type ToastRenderProps = {
  id: string;
  title?: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  position: ToastPosition;
  onClose: () => void;
  progress: Animated.Value;
  opacity: Animated.Value;
};

export interface ToastConfig {
  // Default duration for toasts
  defaultDuration?: number;
  
  // Default position for toasts
  defaultPosition?: ToastPosition;
  
  // Maximum number of toasts to show at once
  maxToasts?: number;
  
  // Custom styles
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  closeButtonStyle?: StyleProp<ViewStyle>;
  progressBarStyle?: StyleProp<ViewStyle>;
  
  // Custom variant styles
  variantStyles?: {
    [key in ToastVariant]?: {
      containerStyle?: StyleProp<ViewStyle>;
      titleStyle?: StyleProp<TextStyle>;
      descriptionStyle?: StyleProp<TextStyle>;
      progressBarColor?: string;
    };
  };
  
  // Custom render functions with proper typing
  renderToast?: (props: ToastRenderProps) => React.ReactNode;
  renderTitle?: (title: string, variant: ToastVariant) => React.ReactNode;
  renderDescription?: (description: string, variant: ToastVariant) => React.ReactNode;
  renderCloseButton?: (onClose: () => void) => React.ReactNode;
  renderProgressBar?: (progress: Animated.Value, variant: ToastVariant) => React.ReactNode;
}

// Default configuration
export const defaultToastConfig: ToastConfig = {
  defaultDuration: 5000,
  defaultPosition: 'bottom',
  maxToasts: 3,
  variantStyles: {
    default: {
      progressBarColor: '#6b7280',
    },
    success: {
      progressBarColor: '#10b981',
    },
    error: {
      progressBarColor: '#ef4444',
    },
    warning: {
      progressBarColor: '#f59e0b',
    },
    info: {
      progressBarColor: '#3b82f6',
    },
  },
};

// Create a context for the toast configuration
export const ToastConfigContext = React.createContext<ToastConfig>(defaultToastConfig);

// Provider component for toast configuration
export interface ToastConfigProviderProps {
  config: ToastConfig;
  children: React.ReactNode;
}

export const ToastConfigProvider: React.FC<ToastConfigProviderProps> = ({ 
  config, 
  children 
}) => {
  const mergedConfig = React.useMemo(() => {
    return {
      ...defaultToastConfig,
      ...config,
      variantStyles: {
        ...defaultToastConfig.variantStyles,
        ...config.variantStyles,
      },
    };
  }, [config]);

  return (
    <ToastConfigContext.Provider value={mergedConfig}>
      {children}
    </ToastConfigContext.Provider>
  );
};

// Hook to use toast configuration
export const useToastConfig = () => {
  return React.useContext(ToastConfigContext);
}; 