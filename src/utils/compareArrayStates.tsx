const compareStates = (prevState: string[], currentState: string[]) => {
    const add: string[] = [];
    const remove: string[] = [];

    currentState.forEach((item) => {
        if (!prevState.includes(item)) {
            add.push(item);
        }
    });

    prevState.forEach((item) => {
        if (!currentState.includes(item)) {
            remove.push(item);
        }
    });

    return { add, remove };
};

export default compareStates;
