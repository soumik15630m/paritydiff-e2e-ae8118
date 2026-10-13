import type { CohereClient } from 'cohere-ai';
export async function typedChat(client: CohereClient) {
  return client.chat({ message: 'Synthetic hello', model: 'fixture-model' });
}
export async function dynamicChat(client: CohereClient, method: 'chat') {
  return client[method]({ message: 'Synthetic dynamic', model: 'fixture-model' });
}
