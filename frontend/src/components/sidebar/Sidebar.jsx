import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/Context";

const Sidebar = () => {
	const [extended, setExtended] = useState(false);
	const { onSent, previousPrompts, setRecentPrompt, newChat } = useContext(Context);

	const loadPrompt = async (prompt) => {
		setRecentPrompt(prompt);
		await onSent(prompt);
	};

	return (
		<div className="sidebar">
			<div className="top">
				<img
					className="menu"
					src={assets.menu_icon}
					alt="Menu"
					onClick={() => setExtended((prev) => !prev)}
				/>
				<div
					onClick={() => newChat()}
					className="new-chat"
				>
					<img
						src={assets.plus_icon}
						alt="Plus"
					/>
					{extended && <p>New Chat</p>}
				</div>
				{extended && (
					<div className="recent">
						<p className="recent-title">Recent</p>
						{previousPrompts.map((prompt) => {
							console.log("hi" + prompt);
							return (
								<div
									onClick={() => loadPrompt(prompt)}
									className="recent-entry"
								>
									<img
										src={assets.message_icon}
										alt=""
									/>
									<p>{prompt.slice(0, 18)}...</p>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<div className="bottom">
				<div className="bottom-item recent-entry">
					<img
						src={assets.question_icon}
						alt="Question"
					/>
					{extended && <p>Help</p>}
				</div>
				<div className="bottom-item recent-entry">
					<img
						src={assets.history_icon}
						alt="History"
					/>
					{extended && <p>Activity</p>}
				</div>
				<div className="bottom-item recent-entry">
					<img
						src={assets.setting_icon}
						alt="Settings"
					/>
					{extended && <p>Settings</p>}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
