import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };
  const trimExpression = expression.trim();

  const buttonPress = (symbol: string) => {
    if (symbol == "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol == "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(trimExpression + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      // if the number starts with zero, do not add more zeros
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if the last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last character is an operator, do nothing
    if (isOperator(trimExpression.charAt(trimExpression.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator (example: 2 * - + 2 = 4)
    const parts = trimExpression.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      // if last digit is NOT an operator, move it to newParts array (unshift)
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        // if the next digit starting from the last is an operator, decrement i by that anount (skip straight to the number)
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    // check if an exxpresion has an operator starting it; if it does then calculate the answer plus the new expression
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>JavaScript Calculator</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>

          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="light-gray"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="light-gray"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => buttonPress("%")}
            className="light-gray"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="yellow"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="dark-gray"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="dark-gray"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="dark-gray"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="yellow"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="dark-gray"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="dark-gray"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="dark-gray"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="yellow"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="dark-gray"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="dark-gray"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="dark-gray"
          >
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="yellow">
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="dark-gray"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="dark-gray"
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="dark-gray"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
