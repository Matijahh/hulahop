import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function GreaterThanEqualTo(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'greaterThanEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let source = value;
          let target = relatedValue;
          if (Array.isArray(value)) {
            source = value.length;
          }
          if (Array.isArray(relatedValue)) {
            target = relatedValue.length;
          }
          if (typeof source === 'number' && typeof target === 'number') {
            return source >= target;
          } else {
            return false;
          }
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must greater than equal to ${relatedPropertyName}`;
        },
      },
    });
  };
}
