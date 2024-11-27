# Next.js project with frontend and backend OpenTelemetry

Frontend telemetry wired with the HoneycombWebSD, which 
wraps opentelemetry-js for browser use and adds core web vitals 
and other items Honeycomb uses for our Honeycomb for Frontend Observability
product.

## Assumptions:

* Using App Router
* Tested on version 15.0 and above
* Instrumenting React from the Root Layout component (/src/app/layout.tsx)
* Instrumenting Next.js from `src/instrumentation.ts`

## Configuration:

* Assumes Honeycomb, but can use other otel endpoints if wish, you'll need
  to set the endpoint property in the BrowserTelemetry component to change
  it to point to another platform and modify settings appropriately.
* Create a Honeycomb free account and get an ingest API Key
* Copy .sample.env -> .env
* Change NEXT_PUBLIC_HONEYCOMB_API_KEY and other settings to suit your environment

## Build and run:

```bash
npm install
npm run dev
```

## Demonstrates

* Wiring of frontend and backend via OTLP to Honeycomb
* Demonstration of traces that include React initiating fetch and Next.js handling routes on the server-side

## Limitations

* Does not use `async/await` pattern. Also does not set up ZoneContextManager
* See https://github.com/open-telemetry/opentelemetry-js/issues/3030#issuecomment-2058102945