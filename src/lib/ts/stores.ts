import { persisted } from "svelte-local-storage-store";

export type HistoryElement = {
    Request: string,
    Response: string,
}

export const history = persisted("history", Array<HistoryElement>());