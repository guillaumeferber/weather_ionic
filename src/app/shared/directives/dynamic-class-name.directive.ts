import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[dynamicClassName]',
  host: {
    '[class]' : 'convertClassNames()'
  }
})
export class DynamicClassNameDirective {
  @Input('dynamicClassName') classNames: string;

  convertClassNames = () => this.classNames.split(' ').map((className: string) => `_${className}`).join(' ');

}
