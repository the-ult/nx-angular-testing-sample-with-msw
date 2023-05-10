/**
 * `@Required` decorator which can be used on `@Input` properties to make sure
 * they are not empty.
 *
 * Based on:
 * - {@link [How to Handle Required Inputs in Angular](https://medium.com/@redin.gaetan/angular-for-everyone-required-inputs-ee916b2feaae)}
 * - {@link [Angular Input decorator](https://medium.com/@abdelelmedny/angular-input-decorators-5d38089070aa)}
 * - {@link [Required @Input() properties](https://timdeschryver.dev/blog/required-input-parameters)}
 **/
export function Required() {
  // TODO: make typesafe with generics
  return function (target: any, key: string): void {
    const NG_ON_INIT = 'ngOnInit';

    /** ngOnInit might not be implemented by this component */
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const original: Function | null = target[NG_ON_INIT];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    target[NG_ON_INIT] = function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (this[key] === undefined) {
        throw new TypeError(`Input property [${key}] is required`);
      }

      if (original) {
        original.apply(this);
      }
    };
  };
}
