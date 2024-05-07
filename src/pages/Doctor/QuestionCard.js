import { useEffect, useState } from "react"

// function NewlineText(props) {
// 	const text = props.text;
// 	const newText = text.split('\n').map(str => <p>{str}</p>);

// 	return newText;
// }


const QuestionCard = (props) => {
	console.log(props);

	return (
		<div class="flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 items-center w-fit mt-10 px-10 py-8 shadow-inner shadow-xl rounded-3xl">
			<p className="font-sans antialiased leading-tight tracking-normal mt-4 text-gray-700">
				{/* <NewlineText text = {props.Question}/> */}
				{props.question}
			</p>
			<p className="font-sans antialiased leading-tight tracking-normal mt-4 text-gray-700">
				{props.answer}
			</p>
		</div>

	)
}

export default QuestionCard;