import "./styles.css";
import { useState } from "react";

export default function App() {
  // list item
  const listItem = [
    {
      name: "Learn Javascript",
      checked: false,
      complete: false
    },
    {
      name: "Learn React",
      checked: false,
      complete: false
    },
    {
      name: "Build a React App",
      checked: false,
      complete: false
    }
  ];
  // click icon Add New
  const [text, setText] = useState("Add new");
  const [addedItems, setAddedItems] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [arry, setArry] = useState(listItem ?? []);

  const [all, setAll] = useState([]);
  const [active, setActive] = useState([]);
  const [complete, setComplete] = useState([]);
  const [tab, setTab] = useState("All");

  const handleAddnew = () => {
    setText("Add new");
    const input = document.querySelector(".input-text");
    const btnaddnew = document.querySelector(".btn_add_new");
    const btnsearch = document.querySelector(".btn_search");
    btnsearch.classList.remove("active");
    btnaddnew.classList.add("active");
    input.focus();
    setValue("");
  };
  // click icon Search
  const handleSearch = () => {
    setText("Search...");
    const input = document.querySelector(".input-text");
    const btnsearch = document.querySelector(".btn_search");
    const btnaddnew = document.querySelector(".btn_add_new");
    btnaddnew.classList.remove("active");
    btnsearch.classList.add("active");
    input.focus();
    setValue("");
  };

  //Checkbox
  const handlecheck = (e, index, name) => {
    const clone = JSON.parse(JSON.stringify(arry));

    if (tab === "Active") {
      clone[index].checked = !clone[index].checked;
      clone[index].complete = !clone[index].complete;
      var currentData1 = clone.filter((data) => data.name === name);
      if (currentData1.checked) {
        currentData1.complete = true;
      } else {
        currentData1.complete = false;
        var tess11 = active.filter((data) => {
          return data.name !== name;
        });
        setActive(tess11);
      }
      setArry(clone);
    } else if (tab === "Completed") {
      clone[index].checked = !clone[index].checked;
      clone[index].complete = !clone[index].complete;
      var currentData = clone.filter((data) => data.name === name);
      if (currentData.checked) {
        currentData.complete = true;
      } else {
        currentData.complete = false;
        var tess111 = complete.filter((data) => {
          return data.name !== name;
        });
        setComplete(tess111);
      }
      setArry(clone);
    } else {
      clone[index].checked = !clone[index].checked;
      if (clone[index].checked) {
        clone[index].complete = true;
      } else {
        clone[index].complete = false;
      }
      setArry(clone);
    }

    // if (e.target.checked) {
    //   e.target.closest("label").classList.add("active-click");
    // } else {
    //   e.target.closest("label").classList.remove("active-click");
    // }
  };

  // add a new
  const handleEnter = (event) => {
    if (text === "Add new") {
      if (event.key === "Enter") {
        let NewArr = [...arry];
        NewArr.push({ name: value, checked: false });
        setArry((prev) => [
          ...prev,
          { name: value, checked: false, complete: false }
        ]);
        setList(NewArr);
        setValue("");
        setAddedItems(true);
      }
    }
  };

  //HandleSearch
  const haneleSearch = (event) => {
    setValue(event.target.value);
    if (text === "Search...") {
      const searchWord = event.target.value;
      let newFilter = [];
      if (addedItems) {
        newFilter = list.filter((value) =>
          value.name.toLowerCase().includes(searchWord.toLowerCase())
        );
      } else {
        newFilter = listItem.filter((value) =>
          value.name.toLowerCase().includes(searchWord.toLowerCase())
        );
      }
      if (searchWord === "") {
        if (addedItems) {
          setArry(list);
          setEmpty(false);
        } else {
          setArry(listItem);
          setEmpty(false);
        }
      } else {
        setArry(newFilter);
        if (newFilter.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
      }
    }
  };

  //Manage element
  const dataTabs = [
    {
      name: "All"
    },
    {
      name: "Active"
    },
    {
      name: "Completed"
    }
  ];

  const hanldeManage = (item) => {
    setTab(item.name);
    if (item.name === "All") {
    } else if (item.name === "Active") {
      const clone = JSON.parse(JSON.stringify(arry));
      const active = clone.filter((data, index) => data.checked === false);
      console.log("active", active);
      setActive(active);
    } else if (item.name === "Completed") {
      const clone = JSON.parse(JSON.stringify(arry));
      const Complete = clone.filter((data, index) => data.checked === true);
      console.log("cômlete", Complete);
      setComplete(Complete);
    }
  };

  return (
    <div className="App">
      <div className="main">
        <header className="header-form">
          <h1 className="header-form-title">THINGS TO DO</h1>
          <div className="form-input">
            <input
              className="input-text"
              type="text"
              value={value}
              onChange={(e) => haneleSearch(e)}
              onKeyPress={handleEnter}
              placeholder={text}
            ></input>
            <span className={`no-item ${empty === true ? "show" : null} `}>
              There are no items.
            </span>
            <span
              className={`no-item ${
                tab === "Active" && active.length === 0
                  ? "show"
                  : tab === "Completed" && complete.length === 0
                  ? "show"
                  : null
              } `}
            >
              There are no items.
            </span>
          </div>
        </header>

        <div className="form-container ">
          {tab === "All"
            ? arry.length !== 0 && (
                <ul className="list-item">
                  {arry.map((arr3, index) => (
                    <li key={index} className={`mt-item ${index}`}>
                      <label
                        className={`item-label ${
                          arr3.complete ? "active-click" : null
                        }`}
                      >
                        <input
                          className="checkbox-item"
                          onChange={(e) => {
                            handlecheck(e, index, arr3.name);
                          }}
                          type="checkbox"
                          checked={arr3.checked}
                        ></input>
                        {arr3.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )
            : tab === "Active"
            ? active.length !== 0 && (
                <ul className="list-item">
                  {active.map((arr1, index) => (
                    <li key={index} className={`mt-item ${index}`}>
                      <label
                        className={`item-label ${
                          arr1.complete ? "active-click" : null
                        }`}
                      >
                        <input
                          className="checkbox-item"
                          onChange={(e) => {
                            handlecheck(e, index, arr1.name);
                          }}
                          type="checkbox"
                          checked={arr1.checked}
                        ></input>
                        {arr1.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )
            : complete.length !== 0 && (
                <ul className="list-item">
                  {complete.map((arr2, index) => (
                    <li key={index} className={`mt-item ${index}`}>
                      <label
                        className={`item-label ${
                          arr2.complete ? "active-click" : null
                        }`}
                      >
                        <input
                          className="checkbox-item"
                          onChange={(e) => {
                            handlecheck(e, index, arr2.name);
                          }}
                          type="checkbox"
                          checked={arr2.checked}
                        ></input>
                        {arr2.name}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
        </div>

        <footer>
          <div className="footer-container">
            <div className="btn-left-overview">
              <div>
                <a
                  onClick={handleAddnew}
                  herf=""
                  className="btn btn_add_new active 
            "
                ></a>
                <a
                  onClick={handleSearch}
                  herf=""
                  className="btn btn_search"
                ></a>
              </div>
            </div>
            <p className="total-item">{arry.length} items left</p>
          </div>
          <div className="footer-tools">
            <div>
              {dataTabs.map((item, index) => {
                return (
                  <a
                    key={index}
                    className="button-footer"
                    style={
                      item.name == tab ? { border: "1px solid #a52f2f38" } : {}
                    }
                    onClick={() => hanldeManage(item)}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
