window.onload = function () {
  crear_select();
};

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

let li = new Array();
function crear_select() {
  let div_cont_select = document.querySelectorAll(
    "[data-mate-select='active']"
  );
  let select_ = "";
  for (let e = 0; e < div_cont_select.length; e++) {
    div_cont_select[e].setAttribute("data-indx-select", e);
    div_cont_select[e].setAttribute("data-selec-open", "false");
    let ul_cont = document.querySelectorAll(
      "[data-indx-select='" + e + "'] > .cont_list_select_mate > ul"
    );
    select_ = document.querySelectorAll(
      "[data-indx-select='" + e + "'] >select"
    )[0];
    if (isMobileDevice()) {
      select_.addEventListener("change", function () {
        _select_option(select_.selectedIndex, e);
      });
    }
    let select_optiones = select_.options;
    document
      .querySelectorAll(
        "[data-indx-select='" + e + "']  > .selecionado_opcion "
      )[0]
      .setAttribute("data-n-select", e);
    document
      .querySelectorAll(
        "[data-indx-select='" + e + "']  > .icon_select_mate "
      )[0]
      .setAttribute("data-n-select", e);
    for (let i = 0; i < select_optiones.length; i++) {
      li[i] = document.createElement("li");
      if (
        select_optiones[i].selected == true ||
        select_.value == select_optiones[i].innerHTML
      ) {
        li[i].className = "active";
        document.querySelector(
          "[data-indx-select='" + e + "']  > .selecionado_opcion "
        ).innerHTML = select_optiones[i].innerHTML;
      }
      li[i].setAttribute("data-index", i);
      li[i].setAttribute("data-selec-index", e);
      // funcion click al selecionar
      li[i].addEventListener("click", function () {
        _select_option(
          this.getAttribute("data-index"),
          this.getAttribute("data-selec-index")
        );
      });

      li[i].innerHTML = select_optiones[i].innerHTML;
      ul_cont[0].appendChild(li[i]);
    } // Fin For select_optiones
  } // fin for divs_cont_select
} // Fin Function

let cont_slc = 0;
function open_select(idx) {
  let idx1 = idx.getAttribute("data-n-select");
  let ul_cont_li = document.querySelectorAll(
    "[data-indx-select='" + idx1 + "'] .cont_select_int > li"
  );
  let hg = 15;
  let slect_open = document
    .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
    .getAttribute("data-selec-open");
  let slect_element_open = document.querySelectorAll(
    "[data-indx-select='" + idx1 + "'] select"
  )[0];
  if (isMobileDevice()) {
    if (window.document.createEvent) {
      // All
      slect_element_open.dispatchEvent(evt);
    } else if (slect_element_open.fireEvent) {
      // IE
      slect_element_open.fireEvent("onmousedown");
    } else {
      slect_element_open.click();
    }
  } else {
    for (let i = 0; i < ul_cont_li.length; i++) {
      hg += ul_cont_li[i].offsetHeight;
    }
    if (slect_open == "false") {
      document
        .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
        .setAttribute("data-selec-open", "true");
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
      )[0].style.height = hg + "px";
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .icon_select_mate"
      )[0].style.transform = "rotate(180deg)";
    } else {
      document
        .querySelectorAll("[data-indx-select='" + idx1 + "']")[0]
        .setAttribute("data-selec-open", "false");
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .icon_select_mate"
      )[0].style.transform = "rotate(0deg)";
      document.querySelectorAll(
        "[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul"
      )[0].style.height = "0px";
    }
  }
} // fin function open_select

function salir_select(indx) {
  let select_ = document.querySelectorAll(
    "[data-indx-select='" + indx + "'] > select"
  )[0];
  document.querySelectorAll(
    "[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul"
  )[0].style.height = "0px";
  document.querySelector(
    "[data-indx-select='" + indx + "'] > .icon_select_mate"
  ).style.transform = "rotate(0deg)";
  document
    .querySelectorAll("[data-indx-select='" + indx + "']")[0]
    .setAttribute("data-selec-open", "false");
}

function _select_option(indx, selc) {
  if (isMobileDevice()) {
    selc = selc - 1;
  }
  let select_ = document.querySelectorAll(
    "[data-indx-select='" + selc + "'] > select"
  )[0];

  let li_s = document.querySelectorAll(
    "[data-indx-select='" + selc + "'] .cont_select_int > li"
  );
  let p_act = (document.querySelectorAll(
    "[data-indx-select='" + selc + "'] > .selecionado_opcion"
  )[0].innerHTML = li_s[indx].innerHTML);
  let select_optiones = document.querySelectorAll(
    "[data-indx-select='" + selc + "'] > select > option"
  );
  for (let i = 0; i < li_s.length; i++) {
    if (li_s[i].className == "active") {
      li_s[i].className = "";
    }
    li_s[indx].className = "active";
  }
  select_optiones[indx].selected = true;
  select_.selectedIndex = indx;
  select_.onchange();
  salir_select(selc);
}

const select_mate_1 = document.querySelector(".select-mate-1");
const select_mate_2 = document.querySelector(".select-mate-2");
const select_mate_3 = document.querySelector(".select-mate-3");
const cont_select_int_1 = document.querySelector(".cont_select_int");
const cont_select_int_2 = document.querySelector(".cont_select_int_2");
const cont_select_int_3 = document.querySelector(".cont_select_int_3");

select_mate_1.addEventListener("click", () => {
  cont_select_int_1.classList.toggle("active_select");
});

select_mate_2.addEventListener("click", () => {
  cont_select_int_2.classList.toggle("active_select");
});

select_mate_3.addEventListener("click", () => {
  cont_select_int_3.classList.toggle("active_select");
});