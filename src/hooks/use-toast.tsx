import { useContext } from 'react';
import { ToastContext } from '../components/ui/toast/provider';
import type { ToastProps } from '../components/ui/toast/toast';

export const useToast = () => {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}

	return {
		toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => context.toast(props),
		dismiss: (id: string) => context.dismiss(id),
	};
};