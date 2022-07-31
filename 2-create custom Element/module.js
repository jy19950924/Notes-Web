const template = document.createElement('template')
template.innerHTML = `
<div>

    <p>Rating</p>

    <div class="rating-stars">
        <div class="rating-star star-1"></div>
        <div class="rating-star star-2"></div>
        <div class="rating-star star-3"></div>
        <div class="rating-star star-4"></div>
        <div class="rating-star star-5"></div>
    </div>
</div>
`

export class Rating extends HTMLElement {
    static get observedAttributes() {
        return ['rating', 'max-rating'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Rating added to DOM');
    }
    adoptedCallback() {
        console.log('Rating was moved into a new DOM');
    }
    disconnectedCallback() {
        console.log('Rating removed from DOM')
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
            console.log(`${name} changed from ${oldVal} to ${newVal}`)
        }
    }
}

window.customElements.define('my-rating', Rating)