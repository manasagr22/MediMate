import React, { useState, useEffect } from "react";

const QuestionnaireCard = (props) => {
  return (
    <>
      <div class="rounded-xl w-48 h-24 inset-0 shadow-lg bg-gradient-to-t from-gray-100 to-gray-300 transition-transform duration-300 ease-in-out hover:scale-105 flex items-center justify-center hover:cursor-pointer " >
        <p class="text-center text-xl font-mono font-semibold text-gray-800">{props.name}</p>
      </div>
    </>
  );
};

export default QuestionnaireCard;
