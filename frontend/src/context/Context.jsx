import { createContext, useState } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [previousPrompts, setPreviousPrompts] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");

	const delayPara = (index, nextWord) => {
		setTimeout(() => {
			setResultData((prev) => prev + nextWord);
		}, 75 * index);
	};

	const newChat = () => {
		setLoading(false);
		setShowResult(false);
	};

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResult(true);

		let response;
		if (prompt !== undefined) {
			const options = {
				method: "POST",
				body: JSON.stringify({
					message: prompt,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			};
			response = await fetch("https://gemini-clone-react-backend.vercel.app/gemini", options);
			setRecentPrompt(prompt);
		} else {
			const options = {
				method: "POST",
				body: JSON.stringify({
					message: input,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			};
			setPreviousPrompts((prev) => [...prev, input]);
			setRecentPrompt(input);
			response = await fetch("https://gemini-clone-react-backend.vercel.app/gemini", options);
		}

		const data = await response.text();
		setResultData(data);

		setLoading(false);
		setInput("");
	};

	const contextValue = {
		input,
		setInput,
		recentPrompt,
		setRecentPrompt,
		previousPrompts,
		setPreviousPrompts,
		showResult,
		setShowResult,
		loading,
		setLoading,
		resultData,
		setResultData,
		onSent,
		newChat,
	};

	return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
