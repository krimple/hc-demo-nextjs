'use client';

import {HoneycombWebSDK} from "@honeycombio/opentelemetry-web";
import {getWebAutoInstrumentations} from "@opentelemetry/auto-instrumentations-web";
import {ZoneContextManager} from "@opentelemetry/context-zone";

// we need to only run this on the client
// otherwise when rendering the top-level
const componentType = typeof window === 'undefined' ? 'server' : 'client';

const configDefaults = {
    ignoreNetworkEvents: true,
    propagateTraceHeaderCorsUrls: [
        /.localhost:3000+/g, // Regex to match your backend URLs. Update to the domains you wish to include.
    ]
}

export function BrowserTelemetry() {
    // uncomment and run npm run build to see the build pre-rendering during compilation!
    //console.log(`I am rendering in ${typeof window === 'undefined' ? 'server' : 'window'}`)

    // only run on server, not on client. Get out if it tries to SSR this.
    if (componentType === 'server') {
       // get useful stack trace on server log
       // console.log(new Error('this is a server render, not a client render'));
       return null;
    }

    const apiKey = process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY;

    // if we have an API key we can send to Honeycomb
    if (apiKey) {
        try {
            // doesn't specify SDK endpoint, defaults to us v1/traces endpoint
            const sdk = new HoneycombWebSDK({
                apiKey: apiKey,
                contextManager: new ZoneContextManager(),
                // turn on to get additional tracing info in console log
                // debug: true, // Set to false for production environment.
                // endpoint: import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT,
                endpoint: process.env.NEXT_PUBLIC_HONEYCOMB_URL,
                // localVisualizations: true,
                // NOTE - only enable if you aren't using an OTEL collector endpoint
                // apiKey: import.meta.env.VITE_HONEYCOMB_API_KEY,
                // NOTE - turning on if I am pointing to the non-default HC endpoint
                skipOptionsValidation: true,
                serviceName: 'nextjs-client',
                instrumentations: [
                    getWebAutoInstrumentations({
                        // Loads custom configuration for xml-http-request instrumentation.
                        '@opentelemetry/instrumentation-xml-http-request': configDefaults,
                        '@opentelemetry/instrumentation-fetch': configDefaults,
                        '@opentelemetry/instrumentation-document-load': configDefaults,
                        '@opentelemetry/instrumentation-user-interaction': {enabled: true}
                    }),
                ],
            });
            sdk.start();
        } catch (e) {
            console.log(`rendering... ${new Date().toISOString()}`);
            console.error(e);
            return null;
        }
        // render nothing
        return null;
    }
}