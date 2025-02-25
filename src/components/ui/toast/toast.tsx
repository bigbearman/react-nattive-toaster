import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { useToastConfig } from './toast-config';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastProps {
	id: string;
	title?: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
	position?: ToastPosition;
	onClose: (id: string) => void;
	// Custom render props
	customContent?: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({
	id,
	title,
	description,
	variant = 'default',
	duration,
	position,
	onClose,
	customContent,
}) => {
	const config = useToastConfig();
	
	// Use config defaults if props are not provided
	const finalDuration = duration ?? config.defaultDuration ?? 5000;
	const finalPosition = position ?? config.defaultPosition ?? 'bottom';
	
	const opacity = React.useRef(new Animated.Value(0)).current;
	const progressWidth = React.useRef(new Animated.Value(100)).current;

	React.useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true,
		}).start();

		// Animate progress bar from 100% to 0% over the duration time
		if (finalDuration > 0) {
			Animated.timing(progressWidth, {
				toValue: 0,
				duration: finalDuration,
				useNativeDriver: false,
			}).start();
		}

		let timer: NodeJS.Timeout | null = null;
		if (finalDuration > 0) {
			timer = setTimeout(() => {
				handleClose();
			}, finalDuration);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, []);

	const handleClose = () => {
		Animated.timing(opacity, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {
			onClose(id);
		});
	};

	const getVariantStyles = () => {
		switch (variant) {
			case 'success':
				return styles.success;
			case 'error':
				return styles.error;
			case 'warning':
				return styles.warning;
			case 'info':
				return styles.info;
			default:
				return styles.default;
		}
	};

	const getPositionStyles = () => {
		switch (finalPosition) {
			case 'top':
				return styles.top;
			case 'top-left':
				return styles.topLeft;
			case 'top-right':
				return styles.topRight;
			case 'bottom-left':
				return styles.bottomLeft;
			case 'bottom-right':
				return styles.bottomRight;
			case 'bottom':
			default:
				return styles.bottom;
		}
	};

	const getProgressColor = () => {
		// Use custom variant color from config if available
		const variantConfig = config.variantStyles?.[variant];
		if (variantConfig?.progressBarColor) {
			return variantConfig.progressBarColor;
		}
		
		switch (variant) {
			case 'success':
				return '#10b981';
			case 'error':
				return '#ef4444';
			case 'warning':
				return '#f59e0b';
			case 'info':
				return '#3b82f6';
			default:
				return '#6b7280';
		}
	};

	const renderProgressBar = () => {
		if (config.renderProgressBar) {
			return config.renderProgressBar(progressWidth, variant);
		}
		
		return (
			<Animated.View 
				style={[
					styles.progressBar, 
					config.progressBarStyle,
					{ 
						backgroundColor: getProgressColor(),
						width: progressWidth.interpolate({
							inputRange: [0, 100],
							outputRange: ['0%', '100%'],
						}),
					}
				]} 
			/>
		);
	};

	// Use custom content if provided
	if (customContent) {
		return (
			<Animated.View style={[styles.container, getVariantStyles(), getPositionStyles(), config.containerStyle, { opacity }]}>
				{customContent}
				{finalDuration > 0 && renderProgressBar()}
			</Animated.View>
		);
	}

	const renderTitle = () => {
		if (!title) return null;
		
		if (config.renderTitle) {
			return config.renderTitle(title, variant);
		}
		
		const variantTitleStyle = config.variantStyles?.[variant]?.titleStyle;
		
		return (
			<Text style={[styles.title, config.titleStyle, variantTitleStyle]}>
				{title}
			</Text>
		);
	};

	const renderDescription = () => {
		if (!description) return null;
		
		if (config.renderDescription) {
			return config.renderDescription(description, variant);
		}
		
		const variantDescStyle = config.variantStyles?.[variant]?.descriptionStyle;
		
		return (
			<Text style={[styles.description, config.descriptionStyle, variantDescStyle]}>
				{description}
			</Text>
		);
	};

	const renderCloseButton = () => {
		if (config.renderCloseButton) {
			return config.renderCloseButton(() => handleClose());
		}
		
		return (
			<TouchableOpacity onPress={handleClose} style={[styles.closeButton, config.closeButtonStyle]}>
				<X size={18} color="#000" />
			</TouchableOpacity>
		);
	};

	// Get variant container style from config
	const variantContainerStyle = config.variantStyles?.[variant]?.containerStyle;

	return (
		<Animated.View style={[
			styles.container, 
			getVariantStyles(), 
			getPositionStyles(), 
			config.containerStyle,
			variantContainerStyle,
			{ opacity }
		]}>
			<View style={styles.content}>
				{renderTitle()}
				{renderDescription()}
			</View>
			{renderCloseButton()}
			
			{finalDuration > 0 && renderProgressBar()}
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 8,
		marginVertical: 4,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		overflow: 'hidden', // Important for the progress bar
		position: 'relative', // Important for absolute positioning of progress bar
		maxWidth: '90%',
	},
	content: {
		flex: 1,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 2,
	},
	description: {
		fontSize: 14,
	},
	closeButton: {
		marginLeft: 12,
	},
	progressBar: {
		height: 3,
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	// Position styles
	top: {
		alignSelf: 'center',
		marginTop: 40,
	},
	bottom: {
		alignSelf: 'center',
		marginBottom: 40,
	},
	topLeft: {
		alignSelf: 'flex-start',
		marginTop: 40,
		marginLeft: 20,
	},
	topRight: {
		alignSelf: 'flex-end',
		marginTop: 40,
		marginRight: 20,
	},
	bottomLeft: {
		alignSelf: 'flex-start',
		marginBottom: 40,
		marginLeft: 20,
	},
	bottomRight: {
		alignSelf: 'flex-end',
		marginBottom: 40,
		marginRight: 20,
	},
	// Variant styles
	default: {
		backgroundColor: '#ffffff',
	},
	success: {
		backgroundColor: '#dcfce7',
	},
	error: {
		backgroundColor: '#fee2e2',
	},
	warning: {
		backgroundColor: '#fef3c7',
	},
	info: {
		backgroundColor: '#dbeafe',
	},
});