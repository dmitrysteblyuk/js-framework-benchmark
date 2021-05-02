import {$, h, render, For} from './heliot.min';

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"],
colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"],
nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

function _random (max) { return Math.round(Math.random() * 1000) % max; };

let idCounter = 1;
function buildData(count) {
  return Array.from(Array(count)).map(() => ({
    label: $(`${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`),
    id: String(idCounter++)
  }));
}

const Button = ({ id, text, fn }) =>
  <div class='col-sm-6 smallpad'>
    <button id={ id } class='btn btn-primary btn-block' type='button' onClick={ fn }>{ text }</button>
  </div>

const App = () => {
  const data = $([]);
  const selected = $(null);

  return <div class='container'>
    <div class='jumbotron'><div class='row'>
      <div class='col-md-6'><h1>Heliot-v1 Keyed</h1></div>
      <div class='col-md-6'><div class='row'>
        <Button id='run' text='Create 1,000 rows' fn={run} />
        <Button id='runlots' text='Create 10,000 rows' fn={runLots} />
        <Button id='add' text='Append 1,000 rows' fn={add} />
        <Button id='update' text='Update every 10th row' fn={update} />
        <Button id='clear' text='Clear' fn={clear} />
        <Button id='swaprows' text='Swap Rows' fn={swapRows} />
      </div></div>
    </div></div>
    <table class='table table-hover table-striped test-data'><tbody>
      <For each={data} key={({id}) => id}>{(row, {}, rowId) => (
        <tr classes={{danger: () => selected.$ === rowId ? "danger" : ""}}>
          <td class='col-md-1'>{rowId}</td>
          <td class='col-md-4'><a onClick={() => selected.$ = rowId}>{() => row.$.label.$}</a></td>
          <td class='col-md-1'><a onClick={() => remove(rowId)}><span class='glyphicon glyphicon-remove' aria-hidden="true" /></a></td>
          <td class='col-md-6'/>
        </tr>
      )}</For>
    </tbody></table>
    <span class='preloadicon glyphicon glyphicon-remove' aria-hidden="true" />
  </div>;

  function remove(rowId) {
    const index = data.$.findIndex(({id}) => id === rowId);
    data.$ = [...data.$.slice(0, index), ...data.$.slice(index + 1)];
  }

  function run() {
    data.$ = buildData(1000);
    selected.$ = null;
  }

  function runLots() {
    data.$ = buildData(10000);
    selected.$ = null;
  }

  function add() {
    data.$ = data.$.concat(buildData(1000));
  }

  function update() {
    const items = data.$;
    let index = 0;
    while (index < items.length) {
      items[index].label.$ = items[index].label.$ + ' !!!';
      index += 10;
    }
  }

  function swapRows() {
    const items = [...data.$];
    if (items.length > 998) {
      let tmp = items[1];
      items[1] = items[998];
      items[998] = tmp;
      data.$ = items;
    }
  }

  function clear() {
    data.$ = [];
    selected.$ = null;
  }
}

render(<App />, document.getElementById("main"));
