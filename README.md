# regular variable vs default props

## Using a Regular Variable:

- Use a regular variable when the data is specific to that instance of 
the component and doesn't need to be shared across different instances.
- Regular variables are often used for temporary calculations, local 
state within a function, or values that are specific to the 
component's logic and don't need to be passed from outside.

## Using Default Props:

- Use default props when you want to provide a default value to a prop 
that can be overridden when the component is used.
- Default props are useful when you want to set a baseline value 
that can be easily customized for different instances of the component.

### summary
- In general, you should consider using default props when you want to 
make your component more flexible and customizable for various use cases. 
If the data is specific to the component and doesn't need to be 
customized from the outside, using a regular variable within the 
component is appropriate.

# Fxs calculation vs useMemo