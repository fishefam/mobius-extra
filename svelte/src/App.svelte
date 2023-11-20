<script lang="ts">
  let main: HTMLElement;
  let div: HTMLDivElement;
  let button: HTMLButtonElement;
  let isClick = false;

  document.body.className = 'flex justify-center items-center min-h-screen';
  const handler = (e: MouseEvent) => {
    if (button) {
      button.style.left = (e.offsetX ?? 100) + 'px';
      // div.style.width = e.offsetX + 'px';
    }
  };
  const setIsClick = () => (isClick = true);
  const unsetIsClick = () => (isClick = false);
</script>

<button bind:this={main} on:mousemove={handler} class="bg-gray-200 w-1/2 h-96 relative">
  <button bind:this={button} class="w-5 h-full bg-slate-800 absolute top-0 left-[50%] -translate-x-1/2" />
  <div bind:this={div} class="w-1/2 bg-red-500 h-full" />
</button>
