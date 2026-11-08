const menu = [
  ['🍑', 'Peach or plum', '1 · Bagged, halved, with pit removed'],
  ['🍐', 'Pear', '1 · Whole'],
  ['🍓', 'Strawberries', '10 max · Bagged, with greens removed'],
  ['🍎', 'Apple', '1 · Whole'],
  ['🍊', 'Orange or cutie', '1 · Whole'],
  ['🥒', 'Cucumber', '¼ · Bagged, peeled and sliced'],
  ['🍌', 'Banana', '1 · Whole'],
  ['🥕', 'Carrots', '7 max · Bagged'],
  ['🍅', 'Cherry tomatoes', '12 max'],
  ['🥑', 'Avocado', '1 · Bagged with spoon, halved with pit removed'],
  ['🥦', 'Broccoli trees', '2–6 · Bagged, dip optional'],
  ['🫑', 'Sweet bell pepper', '1 · Sliced, any color'],
  ['🥝', 'Kiwi', '1 · Peeled and sliced'],
  ['🫛', 'Sugar snap peas', '7 max'],
  ['🍖', 'Mini beef sticks', '5–7'],
  ['🍱', 'Lunchable', '1'],
  ['🌅', 'Once Upon a Farm breakfast bar', '1'],
  ['🌾', 'Kind breakfast protein bar', '1'],
  ['🥄', 'Fruit or applesauce cup', '1 · With spoon'],
  ['🧀', 'Cheese stick', '1'],
  ['🍪', 'Fig bar', '1'],
  ['🐠', 'Goldfish', '1 jar'],
  ['🥣', 'Cereal', '1 jar'],
  ['🍇', 'Raisins', '1 box'],
];

// Fisher–Yates samples without replacement and leaves the original menu intact.
function pickSnacks(items, random = Math.random) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, 7);
}

function snackContent([emoji, name, note]) {
  const icon = document.createElement('span');
  icon.className = 'emoji';
  icon.textContent = emoji;
  icon.setAttribute('aria-hidden', 'true');
  const text = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = name;
  const detail = document.createElement('p');
  detail.textContent = note;
  text.append(title, detail);
  return [icon, text];
}

function renderSelection() {
  const cards = pickSnacks(menu).map((snack, index) => {
    const li = document.createElement('li');
    const number = document.createElement('span');
    number.className = 'number';
    number.textContent = String(index + 1).padStart(2, '0');
    li.append(number, ...snackContent(snack));
    return li;
  });
  document.querySelector('#snacks').replaceChildren(...cards);
  document.querySelector('#announcement').textContent = 'Seven snacks selected: ' + cards.map(card => card.querySelector('h3').textContent).join(', ') + '.';
}

document.querySelector('#menu').replaceChildren(...menu.map(snack => {
  const li = document.createElement('li');
  li.append(...snackContent(snack));
  return li;
}));
document.querySelector('#pick').addEventListener('click', renderSelection);
renderSelection();
