import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import Contributors from "../Contributors";

test("using msw", async () => {
  render(<Contributors />);

  const fetchButton = screen.getByText("Fetch contributors");
  fireEvent.click(fetchButton);

  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

  await waitFor(() => screen.getAllByTestId("contributor"));

  const contributors = screen.getAllByTestId("contributor");
  expect(contributors).toHaveLength(2);

  expect(contributors[0]).toHaveTextContent("bong");
  expect(contributors[0]).toHaveTextContent("59");

  expect(contributors[1]).toHaveTextContent("aj");
  expect(contributors[1]).toHaveTextContent("122");
});
