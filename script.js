document.addEventListener("DOMContentLoaded", function() {
    let currentNode = document.body.firstElementChild;

    function navigateDOM(node, callback) {
        if (node) {
            let message = `Содержимое узла: ${node.tagName}`;
            let options;

            if (!node.previousElementSibling && node.nextElementSibling) {
                options = "Продвинуться к следующему узлу или завершить работу?(продвинуться/выйти)";
            } else if (node.previousElementSibling && node.nextElementSibling) {
                options = "Пройти дальше или вернуться? (дальше/вернуться)";
            } else if (!node.nextElementSibling && node.previousElementSibling) {
                options = "Вернуться назад или выйти? (вернуться/выйти)";
            }

            let action = prompt(`${message}\n${options}`);

            callback(node, action);
        } else {
            alert("Вы достигли конца DOM дерева.");
        }
    }

    function handleNavigation(node, action) {
        if (action.toLowerCase() === "продвинуться" || action.toLowerCase() === "дальше") {
            currentNode = node.nextElementSibling;
            navigateDOM(currentNode, handleNavigation);
        } else if (action.toLowerCase() === "вернуться") {
            currentNode = node.previousElementSibling;
            navigateDOM(currentNode, handleNavigation);
        } else {
            alert("Работа завершена.");
        }
    }

    navigateDOM(currentNode, handleNavigation);
});
