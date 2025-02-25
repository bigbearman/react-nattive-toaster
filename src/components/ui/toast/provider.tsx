import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Toast, ToastProps } from './toast';

type ToastWithId = ToastProps & { id: string };

interface ToastContextType {
	toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void;
	dismiss: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = React.useState<ToastWithId[]>([]);

	const toast = React.useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
		const id = Math.random().toString(36).substring(2, 9);
		const newToast: ToastWithId = {
			...props,
			id,
			onClose: () => dismiss(id),
		};

		setToasts((prevToasts) => [...prevToasts, newToast]);

		// Auto dismiss after duration
		if (props.duration !== Infinity) {
			setTimeout(() => {
				dismiss(id);
			}, props.duration || 5000);
		}

		return id;
	}, []);

	const dismiss = React.useCallback((id: string) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toast, dismiss }}>
			{children}
			<View style={styles.toastContainer}>
				{toasts.map((toastProps) => (
					<Toast key={toastProps.id} {...toastProps} />
				))}
			</View>
		</ToastContext.Provider>
	);
};

const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		zIndex: 9999,
	},
});