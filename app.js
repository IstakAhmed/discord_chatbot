const editor = document.querySelector(".editor");
const preview = document.querySelector(".preview");
let run = true;
// editor.addEventListener('keyup', (e) => {
//   preview.innerHTML = editor.value
// })

function update() {
  if (run) {
    preview.style.height = editor.style.height;
    preview.style.width = editor.style.width;
    // preview.style.maxHeight = editor.style.height;
    // preview.style.maxWidth = editor.style.width;
    preview.scroll(0, editor.scrollTop);

    const content = editor.value;
    let final_content = ``;

    final_content = content
      .split("\n")
      .map((e) => {
        let p_content = "";
        e = e.replaceAll(" ", "&nbsp;");
        if (e.length > 0) {
          p_content = mark_it(get_pos(e), e);
        } else {
          p_content = "&nbsp;";
        }

        return `<p>${p_content}</p>`;
      })
      .join("");

    preview.innerHTML = final_content;
  }

  requestAnimationFrame(update);
}

const get_pos = (content) => {
  let chars = content.split("");
  let datas = [];
  let found = false;
  let pos = {};
  for (let c = 0; c < chars.length; c++) {
    let v = chars[c];
    if (v == "|") {
      if (chars[c + 1] == "|") {
        if (found) {
          pos["e"] = c + 1 + 1;
          datas.push(pos);
          pos = {};
          found = false;
        } else {
          found = true;
          pos["s"] = c;
        }
      }
    }
  }

  return datas;
};

const mark_it = (objs, content) => {
  let chars = content.split("");
  let y = [];
  for (let i = 0; i < objs.length; i++) {
    let d = objs[i];
    let dlta = chars.length - content.length;
    let cs = d.s + dlta;
    chars = insert(chars, cs, `<span class='hidden_preview'>`);
    dlta = chars.length - content.length;
    let ce = d.e + dlta;
    chars = insert(chars, ce, `</span>`);
    // console.log(chars)
  }

  return chars.join("");
};

// it insert before `i` index
const insert = (x, i, v) => {
  let y = x.slice(0, i);
  y.push(v, ...x.slice(i));
  return y;
};

// Updating the preview screen
update();
