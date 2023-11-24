<script lang="ts">
  export let classname: string
</script>

<div class={`${classname} h-full overflow-scroll`}>
  <slot name="top" />
  <slot name="bottom" />
</div>
