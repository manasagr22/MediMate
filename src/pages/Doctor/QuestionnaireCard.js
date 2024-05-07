import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import QuestionCard from "./QuestionCard";

const QuestionnaireCard = (props) => {

	const [QuestionAnswerList, setAnswer] = useState(props.questionsAndAnswers);
	var questionAnswer = {};
	// setAnswer(props.questionsAndAnswers);

	// const fetchAnswers = async () => {
	// 	const response = await fetch(`http://localhost:8082/doctor/seeReport?id=${props.publicId}`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${props.jwtToken}`,
	// 		},
	// 	});
	// 	response.json().then((data) => {
	// 		const questionAnswers = {}
	// 		// console.log(Object.keys(data[0].MainQuestionnaire[0])[0]);
	// 		// console.log(Object.keys(data[0].MainQuestionnaire[0]));
	// 		const questionAnswerPairs = data[0].MainQuestionnaire.map(questionObj => {
	// 			// Get the question (key) and answer (value) from each object
	// 			const question = Object.keys(questionObj)[0];
	// 			const answer = questionObj[question];
	// 			// return { question, answer };
	// 			questionAnswers[question] = answer;
	// 			console.log(question);
	// 			console.log(answer);
	// 		});
	// 		setAnswer(questionAnswers);
	// 		return questionAnswers;
	// 	}).catch((error) => {
	// 		console.error('Error:', error);
	// 	});
	// };

	// useEffect(() => {
	// 	fetchAnswers();
	// 	// questionAnswer = fetchAnswers();
	// }, [])


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
					{Object.entries(QuestionAnswerList).map(([key, value]) => (
						<QuestionCard key={key} Question={key} Answer={value} />
					))}
					<button class = "flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 rounded-3xl mt-10 px-5 py-8" onClick=
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
