import { listenAndServe } from "https://deno.land/std/http/server.ts"
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts'
import { chat } from './chat.ts'

listenAndServe({ port: 3000 }, async (req) => {
  if (req.method === "GET") {
    switch (req.url) {
      case '/':
        req.respond({
          status: 200,
          headers: new Headers({
            "content-type" : "text/html"
          }),
          body: await Deno.open("./index.html")
        })
        break;
      case '/ws':
        acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        }).then(chat)
        break;
      default:
        break;
    }
  }
})

console.log("Server running on localhost:3000")
