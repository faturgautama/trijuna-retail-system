import { Component, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'trijuna-retail-system';

    isLoading = false;

    constructor(
        private _router: Router,
        private _renderer: Renderer2,
    ) {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isLoading = true;
                this.triggerAnimation();
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                setTimeout(() => {
                    this.isLoading = false;
                }, 1250);
            }
        });
    }

    triggerAnimation() {
        const element = document.querySelector('.zoom-text') as HTMLElement;
        if (element) {
            this._renderer.removeClass(element, 'zoom-text');
            // Trigger reflow/repaint
            element.offsetHeight; // This forces a reflow
            this._renderer.addClass(element, 'zoom-text');
        }
    }

}
