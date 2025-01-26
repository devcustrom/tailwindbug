export default {
	beforeMount(el, binding) {
		el.clickOutsideEvent = event => {
			// Check that click was outside the el and his children
			if (!(el == event.target || el.contains(event.target))) {
				// Call method provided in attribute value
				binding.value();
			}
		};
		document.addEventListener("click", el.clickOutsideEvent);
	},
	unmounted(el) {
		document.removeEventListener("click", el.clickOutsideEvent);
	}
}
