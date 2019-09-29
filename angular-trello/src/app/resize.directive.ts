import { MediaObserver } from '@angular/flex-layout';
import { Directive, Input, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[resize]'
})

export class ResizeDirective implements AfterViewInit {
    @Input('resize') resize: Array<Map<string, number>> | number;
    @Input('styleProperty') styleProperty: string;

    innerWindowHeight: number;

    constructor(private readonly elementRef: ElementRef,
        private readonly media: MediaObserver) {

    }

    ngAfterViewInit() {
        let timeoutId;
        clearInterval(timeoutId);
        timeoutId = setTimeout(() => {
            this.adjustHeight();
        }, 500);
    }

    /**
     * The Resize event listener for apply the height,
     * The method will call when the  browser window resized.
     * @param event from resize event
     */
    @HostListener('window:resize', ['$event']) onresize(event: any) {
        this.adjustHeight();
    }

    /**
     * The method for apply the height to the element
     *
     * The method takes the Array of map.
     *
     * FlexLayout Observable media is used to get the current resolution of the screen.
     *
     * If the map key is the active screen resolution. then value will be subtracted from the window height
     * and apply to the element that calls directive
     *
     */
    adjustHeight() {
        let heightSubtractor = 0;
        if (typeof this.resize === 'number') {
            heightSubtractor = this.resize;
        } else {
            (this.resize as Array<Map<string, number>>).forEach((heightMap: Map<string, number>) => {
                for (const key in heightMap) {
                    if (this.media.isActive(key)) {
                        heightSubtractor = heightMap[key];
                    }
                }
            });
        }
        this.innerWindowHeight = document.documentElement.clientHeight;
        if (this.styleProperty != null) {
            this.elementRef.nativeElement.style[this.styleProperty] = `${this.innerWindowHeight - heightSubtractor}px`;
        } else {
            this.elementRef.nativeElement.style.height = `${this.innerWindowHeight - heightSubtractor}px`;
        }
    }
}