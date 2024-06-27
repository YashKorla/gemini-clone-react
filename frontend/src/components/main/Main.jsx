import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
	const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

	const cardData = [
		{
			id: 1,
			title: "Suggest beautiful places to see on an upcoming road trip.",
			icon: assets.compass_icon,
			alt: "Compass",
		},
		{
			id: 2,
			title: "Briefly summarize this concept: urban planning",
			icon: assets.bulb_icon,
			alt: "Bulb",
		},
		{
			id: 3,
			title: "Brainstorm team bonding activities for our work retreat.",
			icon: assets.message_icon,
			alt: "Message",
		},
		{
			id: 4,
			title: "Improve the readability of the following code.",
			icon: assets.code_icon,
			alt: "Code",
		},
	];

	return (
		<>
			<div className="main">
				<div className="nav">
					<p>Gemini</p>
					<img
						src={assets.user_icon}
						alt="User"
					/>
				</div>

				<div className="main-container">
					{!showResult ? (
						<>
							<div className="greet">
								<p>
									<span>Hello, Dev.</span>
								</p>
								<p>How can I help you today?</p>
							</div>
							<div className="cards">
								{cardData.map((item) => {
									return (
										<div
											key={item.id}
											onClick={() =>
												setInput(item.title)
											}
											className="card"
										>
											<p>{item.title}</p>
											<img
												src={item.icon}
												alt={item.alt}
											/>
										</div>
									);
								})}
							</div>
						</>
					) : (
						<div className="result">
							<div className="result-title">
								<img
									src={assets.user_icon}
									alt=""
								/>
								<p>{recentPrompt}</p>
							</div>
							<div className="result-data">
								<img
									src={assets.gemini_icon}
									alt=""
								/>
								{loading ? (
									<div className="loader">
										<hr />
										<hr />
										<hr />
									</div>
								) : (
									<p
										dangerouslySetInnerHTML={{
											__html: resultData,
										}}
									></p>
								)}
							</div>
						</div>
					)}

					<div className="main-bottom">
						<div className="search-box">
							<input
								type="text"
								placeholder="Enter a prompt here..."
								onChange={(e) => setInput(e.target.value)}
								value={input}
							/>
							<div>
								<img
									src={assets.gallery_icon}
									alt="Gallery"
								/>
								<img
									src={assets.mic_icon}
									alt="Mic"
								/>
								{input && (
									<img
										src={assets.send_icon}
										alt="Send"
										onClick={() => onSent()}
									/>
								)}
							</div>
						</div>
						<p className="bottom-info">
							Gemini may display inaccurate info, including about people, so
							double-check its responses. Your privacy and Gemini Apps
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
