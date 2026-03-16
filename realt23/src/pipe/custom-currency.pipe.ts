import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    const absoluteValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absoluteValue >= 1_000_000) {
      const millions = absoluteValue / 1_000_000;

      if (Number.isInteger(millions)) {
        return `${sign}${millions}м`;
      } else {
        const formattedMillions = millions.toFixed(1).replace(/\.0$/, '');
        return `${sign}${formattedMillions}м`;
      }
    }

    if (absoluteValue >= 1_000) {
      const thousands = absoluteValue / 1_000;
      const remainder = absoluteValue % 1_000;

      if (remainder === 0) {
        return `${sign}${thousands}т`;
      }
      else if (absoluteValue > 1_000_000) {
        const millionPart = Math.floor(absoluteValue / 1_000_000);
        const thousandPart = Math.round((absoluteValue % 1_000_000) / 1_000);

        if (thousandPart === 0) {
          return `${sign}${millionPart}м`;
        } else {
          return `${sign}${millionPart}м ${thousandPart}т`;
        }
      } else {
        if (Number.isInteger(thousands)) {
          return `${sign}${thousands}т`;
        } else {
          const formattedThousands = thousands.toFixed(1).replace(/\.0$/, '');
          return `${sign}${formattedThousands}т`;
        }
      }
    }

    return `${sign}${value}`;
  }
}
