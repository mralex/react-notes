import React from 'react';

const DBContext = React.createContext('DBContext');
export default DBContext;

export function DBComponent(Component) {
    return function DBEnabledComponent(props) {
        return (
            <DBContext.Consumer>
                { db => <Component {...props} db={db} /> }
            </DBContext.Consumer>
        );
    }
}
