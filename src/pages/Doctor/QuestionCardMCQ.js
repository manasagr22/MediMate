const QuestionCardMCQ = (props) => {
	return (
		<div className="flex" style={{ flexDirection: "column" }}>
			<label
				for="message"
				class="flex block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				style={{ fontWeight: "550" }}
			>
				{props.question}
			</label>
			<ul class="w-48 text-sm font-medium text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white">

					<li class="w-full dark:border-gray-600">
						<div class="flex items-center ps-3">
							<label
								for="list-radio-a"
								class={`flex w-full py-3 ms-2 text-sm font-medium text-gray-900 ${props.answer === 'A' ? 'bg-green-500 rounded-md mt-2 mr-8' : 'dark:text-gray-300'}`}
							>
								{props.optionA}
							</label>
						</div>
					</li>
				{/* {options_list[1] !== "" ? ( */}
					<li class="w-full dark:border-gray-600">
						<div class="flex items-center ps-3">
							<label
								for="list-radio-b"
								class={`flex w-full py-3 ms-2 text-sm font-medium text-gray-900 ${props.answer === 'B' ? 'bg-green-500 rounded-md mt-2 mr-8' : 'dark:text-gray-300'}`}
							>
								{props.optionB}
							</label>
						</div>
					</li>
				{/* )  */}
				{/* {options_list[2] !== "" ? ( */}
					<li class="w-full dark:border-gray-600">
						<div class="flex items-center ps-3">
							<label
								for="list-radio-c"
								class={`flex w-full py-3 ms-2 text-sm font-medium text-gray-900 ${props.answer === 'C' ? 'bg-green-500 rounded-md mt-2 mr-8' : 'dark:text-gray-300'}`}
							>
								{props.optionC}
							</label>
						</div>
					</li>
				{/* ) : undefined} */}
				{/* {options_list[3] !== "" ? ( */}
					<li class="w-full dark:border-gray-600">
						<div class="flex items-center ps-3">
							<label
								for="list-radio-d"
								class={`flex w-full py-3 ms-2 text-sm font-medium text-gray-900 ${props.answer === 'D' ? 'bg-green-500 rounded-md mt-2 mr-8' : 'dark:text-gray-300'}`}
							>
								{props.optionD}
							</label>
						</div>
					</li>
				{/* // ) : undefined} */}
			</ul>
		</div>
	)
}

export default QuestionCardMCQ;