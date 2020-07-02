import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const projects = new Map<string, any>();
projects.set("1", {
  id: "1",
  title: "TheSkyIsTheLimit",
});

const router = new Router();
router
  // .get("/", (context) => {
  //   context.response.body = `
  //   <!DOCTYPE html>
  //     <html>
  //       <body>
  //         <a href = "/project/">
  //           <h1>Hello world!</h1>
  //         </a>
  //       </body>
  //     </html>`
  // })
  // .get("/project", (context) => {
  //   context.response.body = Array.from(projects.values());
  // })
  .get("/project/:id", (context) => {
    if (context.params && context.params.id && projects.has(context.params.id)) {
      context.response.body = projects.get(context.params.id);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}`,
    index: "index.html",
  });
});
console.log(Deno.cwd());

await app.listen({ port: 8000 });