import { act, render, screen } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
	it("should render Loading screen and then Create Party screen", async () => {
		render(<App />);

		const loading = screen.getByText("Loading...");
		expect(loading).toBeDefined();

		await act(() => {});
		const input = await screen.getByPlaceholderText("Enter your name");
		expect(input).toBeDefined();
	});
});
