
const font_names = ['Open Sans', 'Roboto', 'Poppins', 'Montserrat', 'Oswald', 'Raleway', 'PT Sans']

const fonts = ['Open Sans:100,200,300,400,500,600,700', 'Roboto:100,200,300,400,500,600,700', 'Poppins:100,200,300,400,500,600,700', 'Montserrat:100,200,300,400,500,600,700',
'Oswald:100,200,300,400,500,600,700', 'Raleway:100,200,300,400,500,600,700', 'PT Sans:100,200,300,400,500,600,700']

WebFont.load({
  google: {
    families: fonts
  }
});

document.addEventListener('DOMContentLoaded', 
function SetFonts() { 
  for (var i = 0; i < font_names.length; i++) {      
   $('#font-type')
       .append($("<option></option>")
       .attr("value", font_names[i])
       .text(font_names[i]));
  }    
}
)


function generate_type() {

    document.getElementById('type-scales').innerHTML = '';
  
    let base = document.getElementById('body-text').value
    let ratio = document.getElementById('ratio').value
    let levels = document.getElementById('levels').value
    let sampleText = document.getElementById('sample-text').value
  
    let exp = levels - 1;

    //Create table
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
  
    //Iterate through and generate type scale
      while (exp >= 0)
      {
      let size = base * Math.pow(ratio, exp);

      let row = document.createElement('tr')
    
      
      let cell = document.createElement('td')
      cell.innerHTML = `${Math.round(size * 100)/100} px<br>`
      cell.style.fontSize = "14px"
      cell.style.color = "darkgrey"

      //cell.append(caption);
      row.appendChild(cell)
          
      let cell2 = document.createElement('td')
      cell2.id = exp
      para = document.createTextNode(sampleText)
      cell2.style.fontSize = size + "px"
      
      cell2.append(para)
      row.appendChild(cell2)

      let cell3 = document.createElement('td')
      let btn1 = document.createElement('button')
      btn1.class = "minus"
      btn1.innerHTML = " - "
      btn1.name = exp
     
      
      let cell4 = document.createElement('td')
      let btn2 = document.createElement('button')
      btn2.class = "plus"
      btn2.innerHTML = "+"
      btn2.name = exp

      let cell5 = document.createElement('td')
      cell5.id = `cell${exp}`
      cell5.innerHTML = '<strong>400</strong>'

      cell3.append(btn1)
      cell4.append(btn2)

      row.appendChild(cell3)
      row.appendChild(cell4)
      row.appendChild(cell5)

      tblBody.appendChild(row)
  
      exp -= 1;
      }

    //finalize table after rows are created
    tbl.appendChild(tblBody)
    document.getElementById('type-scales').appendChild(tbl)

    //Change font
    document.getElementById('type-scales').style.fontFamily = document.getElementById('font-type').value
  
  }
  
  window.onload = generate_type()


  document.addEventListener('click', function(btn) {
    let id = btn.target.name
    let text = document.getElementById(id)
    let info = getComputedStyle(text)

  
    if (btn.target.class == "minus") {
      text.style.fontWeight = info.fontWeight - 100
      
    } else {
      text.style.fontWeight = parseInt(info.fontWeight) + 100
    }

    if (info.fontWeight > 100 && info.fontWeight < 700) {
      document.getElementById(`cell${id}`).innerHTML = `<strong>${text.style.fontWeight}</strong>`
    } else if (info.fontWeight == 100) {
      document.getElementById(`cell${id}`).innerHTML = "<strong>100</strong>"
    } else {
      document.getElementById(`cell${id}`).innerHTML = "<strong>700</strong>"
    }


  })