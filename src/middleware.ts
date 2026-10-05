import { defineMiddleware } from "astro:middleware";

// Enkel passordbeskyttelse (Basic Auth) for alt under /meny.
// Passordet settes som miljøvariabel MENY_PASSORD i Vercel og i .env lokalt.
export const onRequest = defineMiddleware((context, next) => {
  if (context.isPrerendered || !context.url.pathname.startsWith("/meny")) {
    return next();
  }

  const passord = import.meta.env.MENY_PASSORD ?? process.env.MENY_PASSORD;
  if (!passord) {
    return new Response("MENY_PASSORD er ikke satt", { status: 500 });
  }

  const header = context.request.headers.get("authorization") ?? "";
  const [type, verdi] = header.split(" ");
  if (type === "Basic" && verdi) {
    const [, oppgitt] = atob(verdi).split(":");
    if (oppgitt === passord) return next();
  }

  return new Response("Krever passord", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Pakket", charset="UTF-8"' },
  });
});
