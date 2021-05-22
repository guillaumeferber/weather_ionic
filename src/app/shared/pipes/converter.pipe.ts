import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert'
})

export class ConvertPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const [from, to] = args;
    return value && this.metersPerSecondTo(value, from, to);
  }

  private metersPerSecondTo(value: number, from: string, to: string): string {
    if (from === 'mps') {
      if (to === 'kmh') {
        return Math.round(value * 3.6) + ' km/h';
      }
    }
    return Math.round(value) + ' km/h';
  }
}
