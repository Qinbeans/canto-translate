<script lang="ts">
    /** @type {import(./$types).PageData} **/
    export let data: any
    let status = data.health.status
    let grpc = data.health.grpc
    let size = data.health.queue_size
    let conns = data.health.ws_connections
    
</script>
<div class="h-screen grid place-items-center">
    <div class="bg-white/75 sm:text-xl text-sm rounded sm:p-5 p-1 grid grid-rows-[repeat(10,_minmax(0,_1fr))] grid-cols-8 sm:w-[50vw] w-[75vw] sm:h-[50vw] h-[75vw] sm:gap-5 gap-1">
        <div class="sm:text-5xl text-xl col-span-8 row-span-2 text-center bg-black/10 sm:p-2 font-bold">
            Translate English to Cantonese
        </div>
        <div class="bg-black/10 md:text-5xl text-sm col-start-1 row-start-3 rounded col-span-3 row-span-2 text-center flex flex-col place-content-center">
            <span>
                Health:
                {#if status == "ok"}
                    <span class="text-blue-500 font-bold">
                        {status}
                    </span>
                {:else if status == "warning"}
                    <span class="text-yellow-600 font-bold">
                        {status}
                    </span>
                {:else if status == "error"}
                    <span class="text-red-600 font-bold">
                        {status}
                    </span>
                {:else}
                    <span class="text-gray-600 font-bold">
                        {status}
                    </span>
                {/if}
            </span>
        </div>
        <div class="bg-black/10 sm:text-4xl text-md rounded col-start-4 row-start-3 col-span-5 row-span-2 text-center flex flex-col place-content-center">
            <span>
                WS Connections:
                <span class="text-blue-500 font-bold">
                    {conns}
                </span>
            </span>
        </div>
        <div class="bg-black/10 sm:p-2 decoration-blue-800 underline rounded text-center sm:text-3xl text-sm col-start-5 row-start-5 col-span-4">
            API Health
        </div>
        <div class="bg-black/10 sm:text-5xl text-xl rounded col-start-5 row-start-6 col-span-4 row-span-2 text-center flex flex-col place-content-center">
            <span>
                GRPC:
                <span class="text-blue-500 font-bold">
                    {grpc}
                </span>
            </span>
        </div>
        <div class="bg-black/10 sm:text-5xl text-xl rounded col-start-1 row-start-5 col-span-4 row-span-3 text-center flex flex-col place-content-center">
            <span>
                Queue Size:
                <span class="text-blue-500 font-bold">
                    {size}
                </span>
            </span>
        </div>
        <button class="sm:text-5xl text-3xl font-bold text-purple-800 rounded-md col-span-8 row-span-3 bg-black/10 hover:bg-black/20" on:click={() => {
            window.location.href = "/translate"
        }}>
            Translate
        </button>
    </div>
</div>