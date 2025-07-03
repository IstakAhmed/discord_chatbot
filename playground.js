

// it insert before `i` index
const insert = (x, i, v) => {
  let y = x.slice(0, i);
  y.push(v, ...x.slice(i));
  return y;
};

class Tag {
  constructor(_syntax, _class_name) {
    this.syntax = _syntax;
    this.class_name = _class_name;
  }

  get_position(content) {
    let chars = content.split("");
    let datas = [];
    let found = false;
    let pos = {};
    for (let c = 0; c < chars.length; c++) {
      let v = chars[c];


      if (v == this.syntax[0]) {
        if (chars[c + 1] == this.syntax[1]) {
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
  }

  render(positions, content) {
    let objs = positions;

    let chars = content.split("");
    let y = [];
    for (let i = 0; i < objs.length; i++) {
      let d = objs[i];
      let dlta = chars.length - content.length;
      let cs = d.s + dlta;
      chars = insert(chars, cs, `<span class='${this.class_name}'>`);
      dlta = chars.length - content.length;
      let ce = d.e + dlta;
      chars = insert(chars, ce, `</span>`);
      // console.log(chars)
    }

    return chars.join("");
  }
}

let Bar = new Tag('||', 'hidden');
let Highlighted = new Tag('`', 'highlighted')
let smthing = new Tag('##', 'smthing')
let c = 'Hello, World! || Hidden message to you || `highlighted` ##something##';


let Bpos = Bar.get_position(c)
let Bren = Bar.render(Bpos, c);

// console.log(`Hidden ${Bren}`);

let Hpos = Highlighted.get_position(c);
let Hren = Highlighted.render(Hpos, c);

// console.log(`Highlighted ${Hren}`);

let Spos = smthing.get_position(c);
let Sren= smthing.render(Spos, c);

// console.log(`Somthing ${Sren}`);


// console.log(RegExp(/\|\|.+\|\|/, 'g'))

console.log(`THis is a || asda || asda d||asda|||`.replace(/(\|\|.+?\|\|)/g, `<span>$1</span>`))