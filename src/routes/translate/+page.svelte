<script lang="ts">
	import { history } from "$lib/ts/stores";

    let shift = false
    let innerWidth: number
    let innerHeight: number

    const go_home = () => {
        window.location.href = "/"
    }

    let value: string = ""

    const send_request = async () => {
        const res = await fetch("https://cantonese.qinbeans.net/api/v1/translate", {
            method: "POST",
            body: JSON.stringify({
                text: value
            })
        })
        const body = await res.json()

        const token = body["token"]

        const ws = new WebSocket(`wss://cantonese.qinbeans.net/api/v1/ws/${token}`)

        // listen for ping from server
        ws.addEventListener("message",(event) => {
            const data = JSON.parse(event.data)
            const status = data["status"]
            if (status == "done") {
                console.log(data)
                history.update((entries) => {
                    entries.push({
                        Request: value,
                        Response: data["result"]
                    })
                    return entries
                })
                value = ""
            } else if (status == "error") {
                alert("Error: " + data["result"])
                value = ""
            } else {
                console.log(status)
            }
        })
        
    }
</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />

<div class="fixed z-10 { shift? '' : 'sm:translate-x-[-10vw] translate-x-[-25vw]' } sm:w-[10vw] w-[25vw] h-dscreen bg-gray-600">
    <button class="sm:ml-[7vw] ml-[14vw]" on:click={() => {
        shift = !shift
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 stroke-red-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </button>
    <div class="grid place-content-center w-full">
        {#if innerWidth > innerHeight}
            <button class="bg-gray-500 hover:bg-gray-700 w-[9vw] py-1 rounded text-center" on:click={go_home}>
                Home
            </button>
        {:else}
            <button class="bg-gray-500 hover:bg-gray-700 sm:w-[9vw] w-[24vw] py-1 rounded flex place-content-center" on:click={go_home}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 stroke-black">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>                          
            </button>
        {/if}
    </div>
</div>
<div class="fixed m-3 z-0">
    <button class="hover:bg-gray-800 bg-gray-500 rounded" on:click={() => {
        shift = !shift
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>     
    </button> 
</div>
<div class="h-dscreen w-dscreen grid grid-rows-[repeat(20,_minmax(0,_1fr))] grid-cols-1 pt-14 sm:px-20">
    {#if innerHeight > innerWidth}
        <div class="sm:row-[span_19_/_span_19] row-[span_18_/_span_18] bg-gray-900 text-white rounded-t-md p-3 overflow-scroll">
            <ul class="flex flex-col gap-4 text-3xl">
                {#each $history as entry}
                    <!-- Requests are on the right side while responses are on the left -->
                    <li class="flex justify-end">
                        <span class="bg-black/30 py-2 px-3 rounded w-fit border border-green-500 ml-14">
                            User: {entry.Request}
                        </span>
                    </li>
                    <li class="bg-black/30 py-2 px-3 rounded w-fit border border-blue-500 mr-14">
                        AI: {entry.Response}
                    </li>
                {/each}
            </ul>
        </div>
        <form class="sm:row-[span_1_/_span_1] row-[span_2_/_span_1] bg-gray-900 flex"
        on:submit={send_request}>
            <textarea bind:value={value} required name="" id="" class="w-full h-full bg-gray-900 text-white border border-white rounded-md p-2 resize-none" placeholder="Enter Text Here"></textarea>
            <button class="rounded border-white border w-10 h-10 hover:bg-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 stroke-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>              
            </button>
        </form>
    {:else}
        <div class="row-[span_18_/_span_18] bg-gray-900 text-white rounded-t-md p-3">
            <ul class="flex flex-col gap-4 text-3xl">
                {#each $history as entry}
                    <!-- Requests are on the right side while responses are on the left -->
                    <li class="flex justify-end">
                        <span class="bg-black/30 py-2 px-3 rounded w-fit border border-green-500 ml-14">
                            User: {entry.Request}
                        </span>
                    </li>
                    <li class="bg-black/30 py-2 px-3 rounded w-fit border border-blue-500 mr-14">
                        AI: {entry.Response}
                    </li>
                {/each}
            </ul>
        </div>
        <form class="row-[span_2_/_span_2] bg-gray-900 flex"
        on:submit={send_request}>
            <textarea bind:value={value} required name="" id="" class="w-full h-full bg-gray-900 text-white border border-white rounded-md p-2 resize-none" placeholder="Enter Text Here"></textarea>
            <button class="rounded border-white border w-10 h-10 hover:bg-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 stroke-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>              
            </button>
        </form>
    {/if}
</div>