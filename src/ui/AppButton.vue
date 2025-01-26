<template>
	<component :is="$attrs.href ? 'a' : 'button'"
		:type="$attrs.href ? null : type || 'button'"
		:class="[
			fullArea && !loader ? 'after:absolute after:inset-0' : '',
			'flex items-center justify-center rounded-full transition-all disabled:cursor-default ring-2 font-bold ring-inset focus:outline-none outline-none disabled:bg-silver duration-300',
			{
				green: 'bg-caribbean-green ring-transparent hover:bg-persian-green text-white focus-visible:ring-big-stone active:bg-deep-sea active:text-silver disabled:text-white',
				blue: 'bg-big-stone ring-transparent active:text-silver hover:bg-cello focus-visible:outline focus-visible:outline-big-stone text-white disabled:text-white',
				red: 'bg-pomegranate ring-transparent hover:bg-valencia focus-visible:ring-big-stone active:bg-tall-poppy text-white disabled:text-white',
				transparent: 'bg-transparent ring-transparent ring-caribbean-green active:text-white focus-visible:ring-2 focus-visible:ring-black disabled:ring-silver active:bg-caribbean-green text-big-stone hover:bg-wild-sand focus-visible:bg-wild-sand focus-visible:ring-froly',
				dark:'bg-white hover:bg-big-stone ring-big-stone focus-visible:bg-big-stone focus-visible:text-white outline-none text-big-stone hover:text-white disabled:bg-silver active:bg-cello disabled:ring-transparent disabled:text-white',
				white:'bg-transparent ring-white hover:bg-white hover:text-black text-white focus-visible:bg-white active:bg-white disabled:bg-silver'
			}[theme ? theme : 'transparent'],
			extrabig ? 'h-[54px] px-8 py-4 leading-[22px]' : small ? 'h-10 px-8 py-2.5' : semismall ? 'h-7 text-xs px-4 py-[6px]' : 'h-11 py-3 px-5 text-sm',
			loader ? 'pointer-events-none' : ''
		]"
		:tabindex="loader ? '-1' : null"
		:disabled=disabled
	>
		<span
			:class="[
				'flex items-center relative justify-center',
			]"
		>
			<span
				:class="[
					'peer empty:hidden',
					right ? 'order-1' : 'order-3',
					loader ? 'opacity-0' : ''
				]"
			>
				<slot/>
			</span>

			<Icon
				v-if="icon"
				:class="[
					'order-2 ',
					big ? 'peer-empty:-mx-2.5' : small ? 'peer-empty:-mx-1.5' : 'peer-empty:-mx-2',
					right ? 'ml-1' : 'mr-1',
					loader ? 'opacity-0' : ''
				]"
				:name="icon"
				:size="big || small && !Boolean($slots['_']) ? 'h-6 w-6' : 'h-5 w-5'"
			/>
			<transition
				enter-active-class="animate-opacity-enter-active"
				leave-active-class="animate-opacity-leave-active"
			>
				<span
					v-if="loader"
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				>
					<Icon
						class="animate-spin-timer"
						name="reload"
						:size="big || small && !Boolean($slots['_']) ? 'h-6 w-6' : 'h-5 w-5'"
					/>
				</span>
			</transition>
		</span>
	</component>
</template>

<script setup>
	import Icon from '@ui/Icon.vue'

	defineProps({
		icon: {
			type: String,
			default: () => ''
		},
		theme: {
			type: String,
			default: () => ''
		},
		type: {
			type: String,
			default: () => ''
		},
		disabled: {
			type: Boolean,
			default: () => false
		},
		big: {
			type: Boolean,
			default: () => false
		},
		extrabig: {
			type: Boolean,
			default: () => false
		},
		semismall: {
			type: Boolean,
			default: () => false
		},
		small: {
			type: Boolean,
			default: () => false
		},
		loader: {
			type: Boolean,
			default: () => false
		},
		right: {
			type: Boolean,
			default: () => false
		},
		fullArea: {
			type: Boolean,
			default: () => false
		},
	})

</script>

<style scoped>

</style>
