<template>
	<svg
		class="fill-current"
		:class="size"
	>
		<use :xlink:href="allIcons.src + `#${name}`"></use>
	</svg>
</template>

<script setup>
	import allIcons from '@assets/all-icons.svg'

	defineProps({
		name: {
			type: String,
			required: true
		},
		size: {
			type: String,
			default: () => 'w-6 h-6'
		}
	})
</script>
