export function createButtons(htmlNode, idName, className, textContent) {
    htmlNode.type = 'button';
    htmlNode.textContent = textContent;
    htmlNode.setAttribute('id', idName);
    htmlNode.setAttribute('class', className);
    return htmlNode;
}
