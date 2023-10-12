window.onload = function () {
    document.getElementById("calc").addEventListener("submit", function (e) {
            e.preventDefault();
            let good = document.getElementById("goods");
            let count = document.getElementById("countOfGoods").value;
            let price = good.options[good.selectedIndex];
            let dataPrice = price.getAttribute("data-price");
            let result = document.getElementById("result");

            if (/^\d+$/.test(count)) {
                result.innerHTML = dataPrice * count + "₽";
            } else {
                result.innerHTML = "";
            }
    });
}