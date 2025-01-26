import { toRef, getCurrentInstance, computed } from 'vue';

export const useModelProxy = () => {
	const modelValue = toRef(getCurrentInstance().props, 'modelValue');
	const emit = getCurrentInstance().emit;

	return computed({
		get() {
			return modelValue.value;
		},

		set(value) {
			emit('update:modelValue', value);
		},
	});
};
