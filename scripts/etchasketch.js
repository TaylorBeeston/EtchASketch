const container = document.getElementById("container");
const settingsForm = document.getElementById("settings");

const etchasketch = (container => {
  const newSquare = () => {
    const fill = e => {
      e.target.style.backgroundColor = "black";
    };

    let square = document.createElement("div");

    square.className = "square";
    square.addEventListener("mouseover", fill);

    return square;
  };

  const initBoard = ({ rows, cols }) => {
    // set document variables
    document.documentElement.style.setProperty("--rowNum", rows);
    document.documentElement.style.setProperty("--colNum", cols);

    container.innerHTML = ""; // empty container

    // fill container with empty squares
    for (let i = 0; i < rows * cols; i++) container.appendChild(newSquare());
  };

  const touchFill = e => {
    console.log(e.touches);
    Object.values(e.touches).forEach(touch => {
      let square = document.elementFromPoint(touch.clientX, touch.clientY);

      if (square) square.dispatchEvent(new Event("mouseover"));
    });
  };

  container.addEventListener("touchmove", touchFill);

  return { initBoard };
})(container);

const updateSettings = e => {
  e.preventDefault();
  const rows = document.getElementById("rows").value;
  const cols = document.getElementById("rows").value;

  etchasketch.initBoard({ rows, cols });

  return false;
};

settingsForm.attachEvent
  ? settingsForm.attachEvent("submit", updateSettings)
  : settingsForm.addEventListener("submit", updateSettings);

etchasketch.initBoard({ rows: 16, cols: 16 });
