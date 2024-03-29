import { baseStyles, variants } from "../styles/badge";

class Badge extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const variant = this.getAttribute("variant") || "lightGray";
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.innerHTML = `
            <style>div{${baseStyles}${variants["dark"][variant]}}</style>
            <div><slot /></div>
        `;
    }
}

customElements.define("lg-badge", Badge);
