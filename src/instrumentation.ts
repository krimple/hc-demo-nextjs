import opentelemetry from "@opentelemetry/sdk-node";
import {OTLPTraceExporter} from "@opentelemetry/exporter-trace-otlp-http";
import {getNodeAutoInstrumentations} from "@opentelemetry/auto-instrumentations-node";

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.NEXT_PUBLIC_HONEYCOMB_URL,
    // only set if sending data directly to honeycomb not through an OTEL Collector
    ... (process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY) && {
      headers: {
        'X-Honeycomb-Team': process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY
      }
    }
  }),
  serviceName: 'nextjs-server',
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  console.log('Starting OpenTelemetry Node SDK');
  sdk.start();
} catch (e) {
  console.error(e);
}

if (process.env.NEXT_RUNTIME === "nodejs") {
  process.on('SIGTERM', () => {
    console.log(`Shutting down`);
    sdk
        .shutdown()
        .finally(() => process.exit(0));
  });
}
// make sure we flush last logs if terminating


