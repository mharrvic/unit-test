import { server, rest } from "../test/test-server";
import { client, apiURL } from "../utils/api-client";

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("makes GET requests to the given endpoint", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (_, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await client(endpoint);

  expect(result).toEqual(mockResult);
});
