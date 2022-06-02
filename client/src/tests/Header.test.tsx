import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/children/Header";

/** Input testing */
// Check if the input element is in the document after render
test("1.1.if the input is in the document", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const inputEl = screen.getByLabelText(/search items/i);
  expect(inputEl).toBeInTheDocument();
});
// Check if the input element is empty at the beginning
test("1.2.if search input is empty at the beginning", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  // Need to cast it from HTMLElement to HTMLInputElement.
  const inputEl = screen.getByLabelText(/search items/i) as HTMLInputElement;
  expect(inputEl.value).toBe("");
});
// Check if the value gets updated -- this is because we are using react.
test("1.3.if value gets updated", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const inputEl = screen.getByLabelText(/search items/i) as HTMLInputElement;
  userEvent.type(inputEl, "some search string");
  expect(inputEl.value).toBe("some search string");
});

/** Link testing */
test("2.1.if the element is in", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const title = screen.getByRole("head-to-main-page");
  expect(title).toBeInTheDocument();
});
test("2.2.if the website goes to the / link when the icon is clicked!", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const title = screen.getByRole("head-to-main-page");
  expect(title).toHaveAttribute("href", "/");
});
