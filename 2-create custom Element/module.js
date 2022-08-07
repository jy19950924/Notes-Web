

const template = document.createElement('template')
template.innerHTML = `

<div>
    <p>Rating</p>
    <div class="rating-stars">
        <div class="rating-star star-1">1</div>
        <div class="rating-star star-2">2</div>
        <div class="rating-star star-3">3</div>
        <div class="rating-star star-4">4</div>
        <div class="rating-star star-5">5</div>
    </div>
</div>
`


export class Rating extends HTMLElement {
    static get observedAttributes() {
        return ['rating', 'max-rating'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('Rating added to DOM');
        console.log('rating maxRatin:', this.rating, this.maxRating)

        if (!this.rating) {
            this.rating = 0;

        }
        if (!this.maxRating || this.maxRating < 0) {
            this.maxRating = 5;
        }
    }

    get maxRating() {
        console.log("maxRating get")
        return this.getAttribute('max-rating');
    }
    set maxRating(value) {
        console.log("maxRating set")
        this.setAttribute('max-rating', value);
    }

    get rating() {
        console.log("rating get func")
        return this.getAttribute('rating');
    }
    set rating(value) {
        console.log("rating set func")
        this.setAttribute('rating', value);
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
            switch (name) {
                case 'rating': {
                    this.rating = newVal;
                    break;
                }
                case 'max-rating': {
                    this.matRating = newVal;
                    break;
                }
            }
        }
    }
}

window.customElements.define('my-rating', Rating)