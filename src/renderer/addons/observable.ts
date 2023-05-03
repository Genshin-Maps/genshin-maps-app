const handlers = Symbol("handlers");

export const makeObservable = (target: object | object[]) => {
    target[handlers] = [];

    target["observe"] = function (handler: Function) {
        this[handlers].push(handler);
    };

    return new Proxy(target, {
        set(target, property, value, _) {
            let success = Reflect.set(...([target, property, value, _] as const));
            if (success) {
                target[handlers].forEach((handler: Function) => handler(property, value));
            }
            return success;
        },
    });
};
