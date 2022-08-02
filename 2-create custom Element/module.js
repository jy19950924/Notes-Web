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

        if (!this.rating) {
            this.rating = 0;

        }
        if (!this.maxRating || this.maxRating < 0) {
            this.maxRating = 5;
        }
    }

    get maxRating() {
        return this.getAttribute('max-rating');
    }
    set maxRating(value) {
        this.setAttribute('max-rating', value);
    }

    get rating() {
        return this.getAttribute('rating');
    }
    set rating(value) {
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
            // switch(name){
            //     case 'rating':{
            //         this.rating = newVal;
            //         break;
            //     }
            //     case 'max-rating':{

            //     }
            // }
        }
    }
}

window.customElements.define('my-rating', Rating)