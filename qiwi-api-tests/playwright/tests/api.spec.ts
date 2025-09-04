import { test, expect } from '@playwright/test';
const BASE = 'https://edge.qiwi.com';

test('Service accessibility', async ({ request }) => {
  const res = await request.get(`${BASE}/payment-history/v1/persons/12345/payments`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty('data');
});

test('Balance positive', async ({ request }) => {
  const res = await request.get(`${BASE}/funding-sources/v2/persons/12345/accounts`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.accounts[0].balance.amount).toBeGreaterThan(0);
});

test('Create payment 1 RUB', async ({ request }) => {
  const res = await request.post(`${BASE}/sinap/api/v2/terms/99/payments`, {
    data: { id: '123', sum: { amount: 1, currency: '643' }, fields: { account: '79991234567' } }
  });
  expect([200,201,202]).toContain(res.status());
});

test('Payment execution', async ({ request }) => {
  const res = await request.get(`${BASE}/payment-history/v1/transactions/123456`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(['SUCCESS','WAITING']).toContain(body.status);
});
