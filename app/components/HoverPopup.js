class HoverPopup {
    constructor(x, y, contents) {
        this.x = x;
        this.y = y;
        this.contents = contents;
        this.elt;

        this.elt = document.createElement('div');
        this.elt.setAttribute('id', 'hover-popup');
        this.elt.style.display = 'none';
        this.renderIntoBody();
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        var content = store.getState().popupContent;
        this.elt.innerHTML = content;
        this.elt.style.display = 'flex';
    }

    hide() {
        this.elt.style.display = 'none';
    }

    renderIntoBody() {
        document.body.appendChild(this.elt);
    }
}

export default HoverPopup;
