import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
	id: string;
	title?: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
	onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({
	id,
	title,
	description,
	variant = 'default',
	onClose,
}) => {
	const opacity = React.useRef(new Animated.Value(0)).current;

	React.useEffect(() => {
		Animated.sequence([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start();
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

	return (
		<Animated.View style={[styles.container, getVariantStyles(), { opacity }]}>
			<View style={styles.content}>
				{title && <Text style={styles.title}>{title}</Text>}
				{description && <Text style={styles.description}>{description}</Text>}
			</View>
			<TouchableOpacity onPress={handleClose} style={styles.closeButton}>
				<X size={18} color="#000" />
			</TouchableOpacity>
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