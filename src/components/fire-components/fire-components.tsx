import "@ionic/core";

import { Component } from '@stencil/core';


@Component({
    tag: 'fire-components',
    styleUrl: 'fire-components.css'
})
export class FireComponents {
    render() {
        return [
            <fire-social-bar />  
        ];
    }
}
