<script setup lang="ts">
import {fixedStore} from "./fixedStore";
import {mdiCheck, mdiClose} from "@mdi/js";

const {toasts} = fixedStore();
</script>

<template>
	<div class="absolute w-full h-full flex flex-col items-center justify-end top-0 left-0 gap-[10px] p-[10px]">
		<div
		v-for="toast of toasts"
		class="z-40 toast min-w-[350px] flex justify-between items-center p-[8px] gap-[10px] bg-[#333] rounded-[4px]"
		>
			<span class="flex gap-[10px] items-center overflow-hidden text-ellipsis text-[white]">
				<Icon
				:icon="toast.status === 'success' ? mdiCheck : mdiClose"
				:class="{
					'text-[green]': toast.status === 'success',
					'text-[red]': toast.status === 'error',
				}"
				/>

				{{ toast.message }}
			</span>

			<VBtn
			color="pink"
			size="x-small"
			@click="toast.close"
			>
				{{ $t("btn.close") }}
			</VBtn>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.toast{
    animation: fade 7s forwards;

    @keyframes fade{
        90%{
            opacity: 1;
        }

        to{
            opacity: 0;
        }
    }
}
</style>
