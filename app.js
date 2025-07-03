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
          p_content = e.replace(/(\|\|.+?\|\|)/g, '<span class="hidden_preview">$1</span>');
          p_content = p_content.replace(/(`.+?`)/g, '<span class="istak">$1</span>');
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

// Updating the preview screen
update();


