import { toast } from 'sonner';
import { CustomToast } from '@/components/custom-toast';

type ToastType = 'success' | 'error' | 'info';

// For display and trigger =>toast.custom
export const showToast = (message: string, type: ToastType = 'info') => {
	toast.custom(() => <CustomToast message={message} type={type} />, {
		duration: 4000,
	});
};
