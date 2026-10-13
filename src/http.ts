export async function httpChat() {
  return fetch('https://monitoring-fixture.invalid/v1/chat', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'Synthetic hello', model: 'fixture-model' }),
  });
}
export async function getChat() {
  return fetch('https://monitoring-fixture.invalid/v1/chat', { method: 'GET' });
}
export async function unrelatedHost() {
  return fetch('https://unrelated-fixture.invalid/v1/chat', { method: 'POST' });
}
export async function health() {
  return fetch('https://monitoring-fixture.invalid/v1/health');
}
export async function dynamicUrl(url: string) {
  return fetch(url, { method: 'POST' });
}
