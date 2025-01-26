<template>
	<transition
		enter-active-class="animate-opacity-enter"
		leave-active-class="animate-opacity-leave"
	>
		<div
			v-if="true"
			class="fixed transition-all delay-300 duration-300 bg-white inset-0 flex items-center justify-center w-screen z-[1000]"
		>
			<img
				class="h-8 xl:h-12 object-contain object-center animate-pulse"
				src="/favicon.svg"
				alt="Логотип Seller"
			/>
		</div>
	</transition>
</template>

<script setup>

</script>
