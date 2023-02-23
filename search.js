const search = () => {
    const searchBox = document.getElementById('searchProduct').value.toUpperCase();
    const storeItems = document.getElementById('itemsBox');
    const product = document.querySelectorAll('.item');
    const productName = document.getElementsByTagName('h1');

    for (var i = 0; i < productName.length; i++) {
        let match = product[i].getElementsByTagName('h1')[0];

        if (match) {
            let textvalue = match.textContent || match.innerHTML
            if (textvalue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = "";
            }
            else {
                product[i].style.display = "none";
            }
        }
    }
}