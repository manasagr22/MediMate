import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import QuestionCard from "./QuestionCard";
import QuestionCardMCQ from "./QuestionCardMCQ";
import PrescriptionCard from "./PrescriptionCard";

const QuestionnaireCard = (props) => {

	const [QuestionAnswerList, setAnswer] = useState(props.questionsAndAnswers);
	var questionAnswer = {};
	console.log(QuestionAnswerList);


	return (
		// <>
		//   <div class="rounded-xl w-48 h-24 inset-0 shadow-lg bg-gradient-to-t from-gray-100 to-gray-300 transition-transform duration-300 ease-in-out hover:scale-105 flex items-center justify-center hover:cursor-pointer " >
		//     <p class="text-center text-xl font-mono font-semibold text-gray-800">{props.name}</p>
		//   </div>
		// </>
		<div class="rounded-xl w-48 h-24 inset-0 shadow-lg bg-gradient-to-t from-gray-100 to-gray-300 transition-transform duration-300 ease-in-out hover:scale-105 flex items-center justify-center hover:cursor-pointer ">
			<Popup trigger=
				{<button class="text-center text-xl font-mono font-semibold text-gray-800">{props.name}</button>}
				modal nested>{
					close => (
						<div className="flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 items-center w-fit mt-10 px-10 py-16 shadow-inner shadow-xl rounded-3xl">
							{/* {Object.entries(QuestionAnswerList).map(([key, value]) => (
						<QuestionCard key={key} Question={key} Answer={value} />
					))} */}
							{Object.entries(QuestionAnswerList).map(([key, question]) => (
								question['type'] ? (
									question['type'] === "mcq" ? (
										console.log(question),
										<QuestionCardMCQ
											key={question['question']}
											question={question['question']}
											optionA={question['A'] || question['optA']}
											optionB={question['B'] || question['optB']}
											optionC={question['C'] || question['optC']}
											optionD={question['D'] || question['optD']}
											answer={question['answer']}
										/>
									) : (question['type'] === 'descriptive' || question['type'] === 'range' ? (
										<QuestionCard
											key={question['question']}
											question={question['question']}
											answer={question['answer']}
										/>
									) : (
										null
									))
								) : (
									console.log("Type not found")
								)
							))}

							<button class="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 rounded-3xl mt-10 px-5 py-8" onClick=
								{() => close()}>
								Close
							</button>
						</div>
					)
				}
			</Popup>
		</div>
	);
};

export default QuestionnaireCard;
