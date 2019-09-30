import { MediaObserver } from '@angular/flex-layout';
import { Directive, Input, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[resize]'
})

export class ResizeDirective implements AfterViewInit {

    innerWindowHeight: number;

    constructor(private readonly elementRef: ElementRef) {

    }

    ngAfterViewInit() {
         this.adjustHeight();
    }

    /**
     * The Resize event listener for apply the height,
     * The method will call when the  browser window resized.
     * @param event from resize event
     */
    @HostListener('window:resize', ['$event']) onresize(event: any) {
        this.adjustHeight();
    }

    adjustHeight() {
        let outerHeight = document.getElementsByClassName('listConter')[0].clientHeight - 100;
        this.elementRef.nativeElement.style.maxHeight = outerHeight + 'px';
    }
}