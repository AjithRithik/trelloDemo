import {
        animate,
        keyframes,
        query,
        stagger,
        state,
        style,
        transition,
        trigger
      } from '@angular/animations';
    
  export const fabAnimations = [
    trigger('fabToggler', [
      transition('* <=> *', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('speedDialStagger', [
      transition('* => *', [
  
        query('button', style({ opacity: 0 }), {optional: true}),
  
        query(':enter', stagger('40ms',
          [
            animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              keyframes(
                [
                  style({opacity: 0, transform: 'translateX(10px)'}),
                  style({opacity: 1, transform: 'translateX(0)'}),
                ]
              )
            )
          ]
        ), {optional: true}),
  
        query(':leave',
          animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            keyframes([
              style({opacity: 1}),
              style({opacity: 0}),
            ])
          ), {optional: true}
        )
  
      ])
    ])
  ];

    
    