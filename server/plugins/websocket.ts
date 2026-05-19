import ws from 'ws'

export default defineNitroPlugin(() => {
  if (typeof globalThis.WebSocket === 'undefined') {
    // @ts-expect-error ws is compatible enough for Supabase Realtime on Node < 22
    globalThis.WebSocket = ws
  }
})
