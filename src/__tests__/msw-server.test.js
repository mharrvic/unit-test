import { server, rest } from "../test/test-server";
import { client, apiURL } from "../utils/api-client";

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
