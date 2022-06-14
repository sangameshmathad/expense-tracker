import React, { useEffect, useState } from "react";
//import uuid from "react-uuid";

const gettinfLocalStorageItems = ()=>{
  let list = localStorage.getItem('expenses');
  if(list){
    return JSON.parse(localStorage.getItem('expenses'));
  } else {
    return [];
  }
}

function Todo() {
  const [inputData, setInputdata] = useState({ description: "", amount: "" });
  //   const [inputAmount, setInputAmount] = useState("");
  const [inputIntem, setInputItem] = useState(gettinfLocalStorageItems());
  const addtoList = (e) => {
    e.preventDefault();
    console.log({});

    setInputItem([...inputIntem, inputData]);
    setInputdata({ description: "", amount: "" });
  };
  const updatelist = (id) => {
    const updatedList = inputIntem.filter((item, idx) => {
      return idx != id;
    });
    setInputItem(updatedList);
  };
  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(inputIntem));
  })


  let total = 0;
  {
    inputIntem.map((element) => {
      total = total + Number(element.amount);
    });
  }
  return (
    <>
      <div className="expensesBox">
        <div className="Header">
          <h2>Expenses</h2>
        </div>

        <div className="inputfiled">
          <form onSubmit={addtoList}>
            <input
              placeholder="Description"
              value={inputData.description}
              required
              onChange={(e) =>
                setInputdata({ ...inputData, description: e.target.value })
              }
            />
            <input
              placeholder="Amount"
              type="number"
              value={inputData.amount}
              required
              onChange={(e) =>
                setInputdata({ ...inputData, amount: e.target.value })
              }
            />

            <button type="submit">+</button>
          </form>
        </div>

        {inputIntem.map((element, index) => {
          return (
            <div className="itemList" key={index}>
              <span className="insideList"> {element.description}</span> <span className="insideList">{element.amount}</span>
              <button onClick={() => updatelist(index)}>-</button>
            </div>
          );
        })}

        <div className="total">
          <h3>Total - {total}</h3>
        </div>
      </div>
    </>
  );
}

export default Todo;
