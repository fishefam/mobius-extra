<script lang="ts">
  export let classname: string
  let startX: number
  let startWidthLeft: number
  let startWidthRight: number
  let leftItem: HTMLElement
  let rightItem: HTMLElement

  const leftMinWidth = 375
  const rightMinWidth = 2
  const startLeftWidthPercent = 40

  const onMouseDown = (e: MouseEvent) => {
    startX = e.clientX
    startWidthLeft = leftItem.offsetWidth
    startWidthRight = rightItem.offsetWidth
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - startX
    if (startWidthLeft + dx > leftMinWidth && startWidthRight - dx > rightMinWidth) {
      leftItem.style.width = `${startWidthLeft + dx}px`
      rightItem.style.width = `${startWidthRight - dx}px`
    }
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
</script>

<div class={`${classname} w-full flex h-full p-4`} style="height: calc(100vh - 3.5rem);">
  <div
    class="flex-grow border rounded-l shadow"
    bind:this={leftItem}
    style={`width: ${startLeftWidthPercent}%;`}
  >
    <slot name="left" />
  </div>
  <div
    class="cursor-col-resize w-2 hover:bg-slate-400 transition bg-slate-200 shadow"
    on:mousedown={onMouseDown}
    role="button"
    tabindex="-1"
  ></div>
  <div
    class="flex-grow border rounded-r shadow"
    bind:this={rightItem}
    style={`width: ${100 - startLeftWidthPercent}%;`}
  >
    <slot name="right" />
  </div>
</div>
