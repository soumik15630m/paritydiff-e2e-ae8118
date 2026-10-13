# ParityDiff controlled monitoring fixture

Synthetic API and source for a production monitoring acceptance test.
No real API request is sent by the tests. No credentials are required.

Use Node.js 24 or later and run `npm test`. SDK calls use a mock client;
HTTP calls use a mock fetch. The cohere-ai dependency is pinned for the
monitoring scanner to resolve published declarations.

The fixture API is unrelated to the real Cohere service. Its operation map
explicitly associates `client.chat` with the synthetic POST /v1/chat.

Specification revisions are retained under spec/. Only spec/current.json
is the actively monitored specification.
Pause and resume smoke test: documentation-only push.
